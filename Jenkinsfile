pipeline {
    agent any

    environment {
        PATH = "C:\\Windows\\System32;${env.PATH}"
    }

    triggers {
        pollSCM('* * * * *')
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
            emailext (
                mimeType: 'text/html',
                subject: "SUCESSO - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <h2>Build Finalizado com Sucesso!</h2>
                    <ul>
                        <li><strong>Job:</strong> ${env.JOB_NAME}</li>
                        <li><strong>Build:</strong> #${env.BUILD_NUMBER}</li>
                        <li><strong>Status:</strong> SUCESSO</li>
                        <li><strong>Veja detalhes:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></li>
                    </ul>
                """,
                to: 'samueltani@chiptronic.com.br'
            )
        }

        failure {
            emailext (
                mimeType: 'text/html',
                subject: "FALHA - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <h2>Build Falhou!</h2>
                    <ul>
                        <li><strong>Job:</strong> ${env.JOB_NAME}</li>
                        <li><strong>Build:</strong> #${env.BUILD_NUMBER}</li>
                        <li><strong>Status:</strong> FALHA</li>
                        <li><strong>Veja detalhes:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></li>
                    </ul>
                """,
                to: 'samueltani@chiptronic.com.br'
            )
        }
    }
}
