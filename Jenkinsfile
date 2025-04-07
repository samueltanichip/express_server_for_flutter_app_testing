pipeline {
    agent any

    environment {
        PATH = "C:\\Windows\\System32;${env.PATH}"
    }

    triggers {
        // Faz polling a cada 1 minuto
        pollSCM('* * * * *')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
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
            echo "Pipeline executado com sucesso na branch ${env.BRANCH_NAME}!"
        }
        failure {
            echo "Falha na execução do pipeline na branch ${env.BRANCH_NAME}"
        }
    }
}
