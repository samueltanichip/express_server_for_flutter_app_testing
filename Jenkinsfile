pipeline {
    agent any
    tools { nodejs "nodejs" }
    
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/samueltanichip/express_server_for_flutter_app_testing.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'powershell -Command "npm install"'
            }
        }

        stage('Install pm2') {
            steps {
                bat 'powershell -Command "npm install pm2 -g"'
            }
        }

        stage('Deploy') {
            steps {
                bat 'powershell -Command "pm2 startOrRestart pm2.config.json"'
            }
        }
    }
}
