pipeline {
    agent any
    
    environment {
        NODE_PATH = "C:\\Program Files\\nodejs"
        CI = 'true' // Variável de ambiente para modo CI
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', 
                          branches: [[name: '*/main']],
                          userRemoteConfigs: [[url: 'https://github.com/samueltanichip/express_server_for_flutter_app_testing.git']],
                          extensions: [[$class: 'CleanBeforeCheckout']] // Limpa o workspace antes
                        ])
            }
        }
        
        stage('Instalar Dependências') {
            steps {
                bat """
                    cd /d "%WORKSPACE%"
                    npm install
                """
            }
        }
        
        stage('Executar Testes') {
            steps {
                bat """
                    cd /d "%WORKSPACE%"
                    npm test
                """
            }
            
            post {
                always {
                    junit 'junit.xml' // Se você configurar relatórios JUnit
                }
            }
        }
        
        stage('Iniciar Servidor') {
            steps {
                bat """
                    cd /d "%WORKSPACE%"
                    npm start &
                """
            }
        }
    }
    
    post {
        always {
            echo "Build status: ${currentBuild.currentResult}"
            script {
                if(currentBuild.currentResult == 'FAILURE') {
                    emailext body: "Build ${currentBuild.fullDisplayName} falhou. Consulte: ${env.BUILD_URL}",
                            subject: "ERRO: Build ${env.JOB_NAME} falhou",
                            to: 'seu-email@exemplo.com'
                }
            }
        }
        cleanup {
            cleanWs() // Limpa o workspace
        }
    }
}
