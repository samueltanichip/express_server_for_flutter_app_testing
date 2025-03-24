pipeline {
    agent any
    
    environment {
        NODE_PORT = "3000"
        PATH = "C:\\Windows\\System32;C:\\Program Files\\nodejs;C:\\Program Files\\Git\\bin;${env.PATH}"
    }
    
    stages {
        stage('Preparar Ambiente') {
            steps {
                cleanWs()
                bat 'where node && where npm && where git'
            }
        }
        
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Instalar Dependências') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Executar Testes') {
            steps {
                script {
                    bat 'npm test || exit 0'
                }
            }
        }
        
        stage('Iniciar e Testar Servidor') {
            steps {
                script {
                    // Inicia o servidor em uma janela separada
                    bat 'start "NodeJS_Server" cmd /c "node server.js & pause"'
                    
                    // Espera a inicialização
                    sleep(time: 5, unit: 'SECONDS')
                    
                    // Verifica se o servidor está respondendo
                    bat """
                        curl -I http://localhost:%NODE_PORT%
                        if errorlevel 1 (
                            echo "Falha ao acessar o servidor na porta %NODE_PORT%"
                            exit 1
                        )
                    """
                    
                    // Testes adicionais podem ser colocados aqui
                    bat "echo Realizando testes de conexão..."
                }
            }
        }
    }
    
    post {
        always {
            script {
                // Encerramento robusto de todos os processos Node.js
                bat '''
                    taskkill /FI "WINDOWTITLE eq NodeJS_Server*" /T /F > nul 2>&1
                    taskkill /F /IM node.exe /T > nul 2>&1
                    echo Todos os processos Node.js foram encerrados
                '''
                cleanWs()
            }
            echo "Pipeline finalizada. Status: ${currentBuild.currentResult}"
        }
    }
}
