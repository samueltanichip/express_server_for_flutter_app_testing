pipeline {
    agent any

    tools {
        nodejs 'nodejs' // Nome da instalação do Node no Jenkins
    }

    environment {
        // Configura o PATH corretamente para Windows
        PATH = "C:\\Windows\\System32;C:\\Program Files\\Git\\bin;${env.PATH}"
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
                    // Verifica comandos básicos primeiro
                    bat 'where cmd.exe'
                    bat 'where node.exe'
                    bat 'where npm.cmd'
                    
                    // Instala dependências
                    bat 'npm install'
                }
            }
        }

        stage('Install pm2') {
            steps {
                bat 'npm install -g pm2'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Configura variáveis necessárias para o PM2 no Windows
                    bat '''
                        SET HOMEPATH=%USERPROFILE%
                        SET PM2_HOME=%HOMEPATH%\\.pm2
                        
                        pm2 delete all || echo "Nenhum processo para deletar"
                        pm2 start server.js --name server -o server.log -e error.log
                        pm2 save
                        pm2 list
                        type server.log
                        type error.log
                    '''
                    
                    // Verifica se a porta está respondendo
                    bat 'curl -v http://localhost:3000 || echo "Servidor não respondeu"'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline concluída - Status final: ${currentBuild.currentResult}'
        }
        failure {
            echo 'Pipeline falhou - Verifique os logs para detalhes'
            bat 'pm2 list'
            bat 'netstat -ano'
        }
    }
}
