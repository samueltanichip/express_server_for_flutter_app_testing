pipeline {
    agent any
    
    environment {
        NODE_PORT = "3000"
        PATH = "C:\\Windows\\System32;C:\\Program Files\\nodejs;C:\\Program Files\\Git\\bin;${env.PATH}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                cleanWs()
                checkout scm
            }
        }
        
        stage('Instalar Dependências') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Iniciar Servidor') {
            steps {
                script {
                    // Inicia o servidor em background usando start
                    bat 'start "NodeServer" /B node server.js'
                    
                    // Espera o servidor iniciar
                    sleep(time: 5, unit: 'SECONDS')
                    
                    // Verifica se o servidor está rodando
                    bat "tasklist /FI \"IMAGENAME eq node.exe\" | find \"node.exe\""
                    bat "curl -I http://localhost:%NODE_PORT% || echo \"Verificação falhou\""
                }
            }
        }
        
        stage('Testar Servidor') {
            steps {
                script {
                    // Mantém o servidor rodando por tempo limitado para testes
                    timeout(time: 1, unit: 'MINUTES') {
                        bat "echo Testando servidor na porta %NODE_PORT%..."
                        // Adicione aqui seus testes de integração se necessário
                    }
                }
            }
        }
    }
    
    post {
        always {
            script {
                // Encerra todos os processos Node.js de forma robusta
                bat '''
                    taskkill /FI "WINDOWTITLE eq NodeServer*" /T /F > nul 2>&1
                    taskkill /F /IM node.exe /T > nul 2>&1
                    echo Processos Node.js encerrados
                '''
                cleanWs()
            }
            echo "Pipeline finalizada. Status: ${currentBuild.currentResult}"
        }
    }
}
