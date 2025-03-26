pipeline {
    agent any
    
    environment {
        // Adicione o caminho do sistema ao PATH
        PATH = "C:\\Windows\\System32;${env.PATH}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                url: 'https://github.com/samueltanichip/express_server_for_flutter_app_testing.git'
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
