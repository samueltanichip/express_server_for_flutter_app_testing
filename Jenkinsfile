pipeline {
    agent any
    
    options {
        gitHubTokenProperty('github-pat') // Força uso do PAT
        disableConcurrentBuilds()
    }

    environment {
        PATH = "C:\\Windows\\System32;C:\\Program Files\\Git\\bin;${env.PATH}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                withCredentials([string(credentialsId: 'samuelTani210220001', variable: 'GITHUB_TOKEN']) {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: 'main']],
                        extensions: [],
                        userRemoteConfigs: [[
                            url: "https://${env.GITHUB_TOKEN}@github.com/samueltanichip/express_server_for_flutter_app_testing.git",
                            credentialsId: 'github-pat'
                        ]]
                    ])
                }
            }
        }
        
        stage('Instalar Dependências') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline finalizado'
        }
    }
}
