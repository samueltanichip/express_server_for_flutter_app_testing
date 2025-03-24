pipeline {
    agent any
    
    environment {
        NODE_PORT = "3000"
        PATH = "C:\\Windows\\System32;C:\\Program Files\\nodejs;C:\\Program Files\\Git\\bin;${env.PATH}"
        S3_BUCKET = "seu-bucket-s3" // Substitua pelo nome do seu bucket
        AWS_REGION = "us-east-1" // Altere para sua região
        APP_NAME = "express-server"
    }
    
    stages {
        stage('Preparação') {
            steps {
                cleanWs()
                checkout scm
                bat 'npm install'
                bat 'npm run build' // Certifique-se de ter um script 'build' no package.json
            }
        }
        
        stage('Empacotamento') {
            steps {
                script {
                    // Cria um arquivo ZIP com os arquivos necessários
                    bat """
                        mkdir deploy
                        xcopy /E /I /Y .\\* deploy\\${APP_NAME}
                        powershell Compress-Archive -Path deploy\\${APP_NAME} -DestinationPath ${APP_NAME}.zip
                    """
                }
            }
        }
        
        stage('Upload para S3') {
            steps {
                script {
                    // Instala a AWS CLI se necessário
                    bat 'aws --version || pip install awscli'
                    
                    // Configura as credenciais AWS (armazene de forma segura no Jenkins)
                    withAWS(credentials: 'AKIAR7HWXUVMKEQQNE7T', region: "${us-east-1}") {
                        bat """
                            aws s3 cp ${teste}.zip s3://${jenkins-teste}/${teste}/${teste}-${env.BUILD_NUMBER}.zip
                            aws s3 cp s3://${jenkins-teste}/${teste}/${teste}-${env.BUILD_NUMBER}.zip s3://${jenkins-teste}/${teste}/latest.zip
                        """
                    }
                }
            }
        }
        
        stage('Deploy no Servidor') {
            steps {
                script {
                    // Adicione aqui os comandos para implantação no seu servidor
                    // Exemplo para EC2 (substitua pelos seus comandos reais):
                    bat """
                        aws s3 cp s3://${jenkins-teste}/${teste}/latest.zip .
                        powershell Expand-Archive -Path latest.zip -DestinationPath /opt/${APP_NAME} -Force
                        cd /opt/${teste}
                        npm install --production
                        pm2 restart ${teste} || pm2 start server.js --name ${teste}
                    """
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
            echo "Pipeline finalizada. Status: ${currentBuild.currentResult}"
        }
        success {
            echo "Aplicação ${APP_NAME} versão ${env.BUILD_NUMBER} deployada com sucesso no S3!"
        }
    }
}
