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
                    credentialsId: 'seu-credential-id',
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
        always {
            emailext (
                mimeType: 'text/html',
                subject: "${currentBuild.currentResult} - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <h2>Resultado do Build: ${currentBuild.currentResult}</h2>
                    <ul>
                        <li><strong>Job:</strong> ${env.JOB_NAME}</li>
                        <li><strong>Build:</strong> #${env.BUILD_NUMBER}</li>
                        <li><strong>Status:</strong> ${currentBuild.currentResult}</li>
                        <li><strong>Veja detalhes:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></li>
                    </ul>
                """,
                to: 'samueltanifrancisco@gmail.com',
                recipientProviders: [
                    [$class: 'DevelopersRecipientProvider'],
                    [$class: 'RequesterRecipientProvider']
                ]
            )
        }
    }
}
