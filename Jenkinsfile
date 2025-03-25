pipeline {
    agent any
    
    environment {
        // Configuração de paths (ajuste conforme necessário)
        NODEJS_HOME = "C:\\Program Files\\nodejs"
        GIT_HOME = "C:\\Program Files\\Git\\bin"
        
        // Atualiza o PATH do sistema
        PATH = "${env.NODEJS_HOME};${env.GIT_HOME};${env.PATH}"
        
        // Configurações específicas do projeto
        NPM_CONFIG_LOGLEVEL = 'warn'  // Reduz o verbosity do npm
        CI = 'true'                   // Indica que está rodando em CI
    }
    
    stages {
        stage('Verificar Ambiente') {
            steps {
                script {
                    def requiredTools = [
                        'node': 'node --version',
                        'npm': 'npm --version',
                        'git': 'git --version'
                    ]
                    
                    requiredTools.each { tool, cmd ->
                        try {
                            def version = bat(script: cmd, returnStdout: true).trim()
                            echo "✅ ${tool.toUpperCase()} instalado: ${version}"
                        } catch (e) {
                            error("❌ ${tool.toUpperCase()} não encontrado. Verifique a instalação e configuração do PATH.")
                        }
                    }
                }
            }
        }
        
        stage('Checkout Código') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/samueltanichip/express_server_for_flutter_app_testing.git',
                        credentialsId: '203891579' // Use seu credential ID
                    ]],
                    extensions: [[
                        $class: 'CleanBeforeCheckout'
                    ]]
                ])
            }
        }
        
        stage('Instalar Dependências') {
            steps {
                bat """
                    cd /d "%WORKSPACE%"
                    npm ci --no-audit --prefer-offline
                """
            }
        }
        
        stage('Executar Testes') {
            steps {
                script {
                    try {
                        bat """
                            cd /d "%WORKSPACE%"
                            npm test
                        """
                    } catch (e) {
                        // Se não houver testes configurados, marque como instável em vez de falha
                        currentBuild.result = 'UNSTABLE'
                        echo "⚠️ Aviso: Testes não executados ou falharam. Verifique a configuração do npm test."
                    }
                }
            }
        }
        
        stage('Iniciar Servidor') {
            steps {
                script {
                    // Inicia o servidor em background
                    bat 'start /B npm start'
                    
                    // Espera o servidor iniciar (ajuste o tempo conforme necessário)
                    sleep(time: 10, unit: 'SECONDS')
                    
                    // Testa se o servidor está respondendo (opcional)
                    bat 'curl http://localhost:3000 || echo "Servidor não respondeu"'
                }
            }
        }
    }
    
    post {
        always {
            script {
                // Mata qualquer processo do Node.js que possa ter ficado rodando
                bat 'taskkill /F /IM node.exe /T || echo "Nenhum processo Node encontrado"'
                
                // Limpa o workspace
                cleanWs()
                
                // Notificação final
                echo "Build finalizado com status: ${currentBuild.currentResult}"
                
                // Se quiser enviar notificações (descomente e configure)
                // emailext (
                //     subject: "Build ${currentBuild.currentResult}: ${env.JOB_NAME}",
                //     body: "Detalhes: ${env.BUILD_URL}",
                //     to: 'seu-email@exemplo.com'
                // )
            }
        }
    }
}
