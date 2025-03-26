pipeline {
    agent any
    
    environment {
        // Adicione o caminho do sistema ao PATH
        PATH = "C:\\Windows\\System32;${env.PATH}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                withCredentials([string(credentialsId: 'pat', variable: 'GITHUB_TOKEN')]) {
                    // URL modificada para incluir autenticação via PAT
                    git branch: 'main', 
                    url: "https://${env.GITHUB_TOKEN}@github.com/samueltanichip/express_server_for_flutter_app_testing.git"
                }
            }
        }
        
        stage('Instalar Dependências') {
            steps {
                // Use o caminho completo para o npm
                bat '"C:\\Program Files\\nodejs\\npm.cmd" install'
            }
        }
        
        stage('Build') {
            steps {
                bat '"C:\\Program Files\\nodejs\\npm.cmd" run build'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline executado com sucesso!'
        }
        failure {
            echo 'Falha na execução do pipeline'
        }
    }
}
