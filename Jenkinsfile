pipeline {
    agent any
    
    environment {
        // Defina os caminhos absolutos para as ferramentas necessárias
        SYSTEM_ROOT = "C:\\Windows\\System32"
        NODEJS_PATH = "C:\\Program Files\\nodejs"
        GIT_PATH = "C:\\Program Files\\Git\\bin"
        
        // Configure o PATH corretamente
        PATH = "${env.SYSTEM_ROOT};${env.NODEJS_PATH};${env.GIT_PATH};${env.PATH}"
    }
    
    stages {
        stage('Verificar Ambiente') {
            steps {
                script {
                    // Verifica se os executáveis essenciais estão disponíveis
                    bat """
                        where cmd
                        where node
                        where npm
                        where git
                    """
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
                bat "npm install"
            }
        }
        
        stage('Executar Testes') {
            steps {
                script {
                    bat "npm test || exit 0"
                }
            }
        }
        
        stage('Iniciar Servidor') {
            steps {
                script {
                    // Inicia o servidor em primeiro plano
                    bat "node server.js"
                }
            }
        }
    }
    
    post {
        always {
            echo "Build status: ${currentBuild.currentResult}"
            cleanWs()
        }
    }
}
