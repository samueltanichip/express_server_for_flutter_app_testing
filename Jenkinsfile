pipeline {
    agent any

    environment {
        PATH = "C:\\Windows\\System32;${env.PATH}"
    }

    triggers {
        pollSCM('* * * * *') // Faz polling a cada 1 minuto
    }

    stages {
        stage('Checkout main') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/samueltanichip/express_server_for_flutter_app_testing.git'
            }
        }

        stage('Instalar Dependências') {
            steps {
                bat '"C:\\Program Files\\nodejs\\npm.cmd" install'
            }
        }

        stage('Build') {
            steps {
                bat '"C:\\Program Files\\nodejs\\npm.cmd" run build'
            }
        }
    }

    post {
        success {
            echo "Pipeline executado com sucesso!"
        }
        failure {
            echo "Falha na execução do pipeline!"
        }
    }
}
