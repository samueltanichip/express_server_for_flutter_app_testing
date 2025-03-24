pipeline {
    agent any
    
    environment {
        S3_BUCKET = "jenkins-teste"       // ← Substitua pelo seu bucket
        AWS_REGION = "us-east-1"          // ← Altere para sua região AWS
        APP_NAME = "express-server"       // ← Nome do seu projeto
    }
    
    stages {
        stage('Preparação') {
            steps {
                cleanWs()
                checkout scm
                bat 'npm install --production'  // Instala apenas dependências de produção
            }
        }
        
        stage('Empacotar') {
            steps {
                bat """
                    mkdir deploy
                    xcopy /E /I /Y package.json deploy\\
                    xcopy /E /I /Y package-lock.json deploy\\
                    xcopy /E /I /Y server.js deploy\\
                    xcopy /E /I /Y src deploy\\src\\      // Inclui sua pasta de código
                    cd deploy
                    powershell Compress-Archive -Path .\\* -DestinationPath ..\\${APP_NAME}.zip
                    cd ..
                """
            }
        }
        
        stage('Upload para S3') {
            steps {
                withAWS(credentials: 'aws-creds', region: "${AWS_REGION}") {
                    bat """
                        aws s3 cp ${APP_NAME}.zip s3://${S3_BUCKET}/${APP_NAME}/v${BUILD_NUMBER}.zip
                        aws s3 cp s3://${S3_BUCKET}/${APP_NAME}/v${BUILD_NUMBER}.zip s3://${S3_BUCKET}/${APP_NAME}/latest.zip
                    """
                }
            }
        }
    }
    
    post {
        always {
            bat 'taskkill /F /IM node.exe /T > nul 2>&1 || echo "Nenhum processo para encerrar"'
            cleanWs()
            echo "Deploy concluído. Status: ${currentBuild.currentResult}"
        }
    }
}
