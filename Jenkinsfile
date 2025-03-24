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
                    // Para qualquer instância existente
                    bat 'pm2 delete server || echo "Nenhum processo para deletar"'
                    
                    // Inicia o servidor
                    bat 'pm2 start server.js --name server'
                    
                    // Mostra logs
                    bat 'pm2 logs server --lines 10'
                    
                    // Verifica se está rodando
                    bat 'pm2 list'
                    bat 'netstat -ano | findstr :3000'
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
