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
            // Configuração robusta para Windows
            bat '''
                @echo off
                SET PM2_HOME=%WORKSPACE%\\.pm2
                
                echo 1. Matando processos existentes...
                taskkill /F /IM node.exe /T > nul 2>&1 || echo "Nenhum processo Node para matar"
                
                echo 2. Limpando instâncias PM2 anteriores...
                pm2 delete all || echo "Nenhum processo PM2 para deletar"
                
                echo 3. Iniciando servidor...
                pm2 start server.js --name server -o server-out.log -e server-err.log
                
                echo 4. Salvando configuração...
                pm2 save || echo "PM2 save falhou"
                
                echo 5. Status atual:
                pm2 list
                
                echo 6. Verificando porta 3000:
                netstat -ano | findstr :3000 || echo "Porta 3000 não está em uso"
                
                echo 7. Últimos logs:
                type server-out.log || echo "Sem logs de saída"
                type server-err.log || echo "Sem logs de erro"
                
                echo 8. Testando endpoint...
                curl -v http://localhost:3000 || echo "Falha ao acessar servidor"
            '''
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
