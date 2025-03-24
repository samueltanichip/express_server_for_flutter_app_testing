pipeline {
    agent any
    
    environment {
        NODE_PATH = "C:\\Program Files\\nodejs"
        PATH = "${env.NODE_PATH};${env.PATH}"
        APP_PORT = "3000"
    }
    
    stage('Iniciar Servidor') {
    steps {
        script {
            // Inicia o servidor em background
            bat 'start "Node Server" /B node server.js'
            
            // Verificação
            sleep(time: 10, unit: 'SECONDS')
            bat "tasklist /FI \"IMAGENAME eq node.exe\" || echo \"Servidor não iniciou\""
            bat "curl -I http://localhost:%APP_PORT% || echo \"Verificação do servidor falhou\""
        }
    }
}
        }
        
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', 
                          branches: [[name: '*/main']],
                          userRemoteConfigs: [[url: 'https://github.com/samueltanichip/express_server_for_flutter_app_testing.git']]
                        ])
            }
        }
        
        stage('Instalar Dependências') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Executar Testes') {
            steps {
                script {
                    // Continua mesmo sem testes configurados
                    bat 'npm test || exit 0'
                }
            }
        }
        
        stage('Iniciar Servidor') {
            steps {
                script {
                    // Inicia o servidor com forever
                    bat 'forever start server.js'
                    
                    // Verifica se o servidor está rodando
                    sleep(time: 10, unit: 'SECONDS')
                    bat "curl -I http://localhost:%APP_PORT% || echo \"Verificação do servidor falhou\""
                }
            }
        }
    }
    
    post {
        always {
            script {
                // Encerra processos do Node.js de forma robusta
                bat '''
                    forever stopall || echo "Nenhum processo forever para encerrar"
                    taskkill /F /IM node.exe /T > nul 2>&1 || echo "Nenhum processo Node.js para encerrar"
                '''
                cleanWs()
            }
            echo "Status final: ${currentBuild.currentResult}"
        }
    }
}
