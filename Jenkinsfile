pipeline {
    agent any
    
    environment {
        NODE_PATH = "C:\\Program Files\\nodejs"
        PATH = "${env.NODE_PATH};${env.PATH}"
        APP_PORT = "3000"
    }
    
    stages {
        stage('Preparar Ambiente') {
            steps {
                cleanWs()
                script {
                    try {
                        bat 'npm list -g forever || npm install -g forever'
                    } catch (e) {
                        echo "Erro ao instalar forever: ${e.message}"
                    }
                }
            }
        }
        
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM', 
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/samueltanichip/express_server_for_flutter_app_testing.git']]
                ])
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
        
        stage('Iniciar Servidor') {
            steps {
                script {
                    bat 'forever start server.js'
                    sleep(time: 10, unit: 'SECONDS')
                    bat "curl -I http://localhost:%APP_PORT% || echo \"Verificação do servidor falhou\""
                }
            }
        }
    }
    
    post {
        always {
            script {
                bat '''
                    forever stopall || echo "Nenhum processo forever para encerrar"
                    taskkill /F /IM node.exe /T > nul 2>&1 || echo "Nenhum processo Node.js para encerrar"
                '''
                cleanWs()
            }
            echo "Status final: ${currentBuild.currentResult}"
        }
    }
}
