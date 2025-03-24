pipeline {
    agent any

    tools {
        nodejs 'nodejs' // Nome exato da instalação do Node no Jenkins
    }

    environment {
        PATH = "C:\\Windows\\System32;${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', 
                         branches: [[name: '*/main']],
                         userRemoteConfigs: [[url: 'https://github.com/samueltanichip/express_server_for_flutter_app_testing.git']]])
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    bat 'where node'
                    bat 'where npm'
                    bat 'npm install'
                }
            }
        }

        stage('Kill Existing Node Process') {
            steps {
                script {
                    bat '''
                        @echo off
                        for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080') do (
                            taskkill /f /pid %%a
                        )
                    '''
                }
            }
        }

        stage('Start Application') {
            steps {
                script {
                    bat 'npm install -g pm2'  // Instala PM2 globalmente
                    bat 'pm2 stop all'       // Para qualquer processo existente
                    bat 'pm2 delete all'     // Remove processos antigos
                    bat 'pm2 start server.js --name myApp'  // Inicia a aplicação com PM2
                    bat 'pm2 save'           // Salva o estado do PM2
                }
            }
        }

        stage('Verify Application') {
            steps {
                script {
                    bat 'pm2 list'  // Lista os processos ativos
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline concluída'
        }
    }
}
