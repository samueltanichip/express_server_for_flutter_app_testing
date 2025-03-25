pipeline {
    agent any
    
    environment {
        AWS_REGION = 'us-east-1'
        S3_BUCKET = 'jenkins-teste'
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
        
        stage('Deploy para S3') {
            steps {
                withAWS(region: env.AWS_REGION, credentials: '203891579') {
                    bat """
                    "C:\\Program Files\\Amazon\\AWSCLIV2\\aws.exe" s3 sync .\\ s3://%S3_BUCKET% ^
                    --exclude "node_modules\\*" ^
                    --exclude ".git\\*" ^
                    --delete
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deploy para S3 concluído com sucesso!'
        }
        failure {
            echo 'Falha no deploy para S3'
        }
    }
}
