pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Nome exato da instalação do Node no Jenkins
    }

    environment {
        // Garante que o sistema encontrará os comandos básicos
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
                    // Verifica se os comandos básicos funcionam
                    bat 'where cmd'
                    bat 'where node'
                    bat 'where npm'
                    
                    // Instala dependências
                    bat 'npm install'
                }
            }
        }

        stage('Start Application') {
            steps {
                script {
                    // Inicia a aplicação
                    bat 'node server.js'
                    
                    // Alternativa com PM2 se necessário
                    // bat 'npm install -g pm2'
                    // bat 'pm2 start server.js'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline concluído'
            // Opcional: matar processos node se necessário
            // bat 'taskkill /F /IM node.exe /T'
        }
    }
}
