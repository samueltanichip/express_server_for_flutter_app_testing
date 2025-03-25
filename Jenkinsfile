pipeline {
    agent any
    
    environment {
        AWS_REGION = 'us-east-1' // Altere para sua região
        S3_BUCKET = 'jenkins-teste'
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
                bat 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                bat 'npm run build' // Se seu projeto tiver um script build
            }
        }
        
        stage('Deploy para S3') {
            steps {
                withAWS(region: env.AWS_REGION, credentials: 'AKIAR7HWXUVMH2T2PUJF') {
                    bat """
                    aws s3 sync .\\ s3://%S3_BUCKET% ^
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
