pipeline {
    agent any

    triggers {
        pollSCM('* * * * *') 
    }
    
    environment {
        PATH = "C:\\Windows\\System32;${env.PATH}"
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
        always {
            script {
                def buildTime = new Date().format("dd/MM/yyyy HH:mm:ss", TimeZone.getTimeZone('America/Sao_Paulo'))
                emailext(
                    mimeType: 'text/html',
                    subject: "${currentBuild.currentResult} - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    body: """
                        <h2>Resultado do Build: ${currentBuild.currentResult}</h2>
                        <ul>
                            <li><strong>Job:</strong> ${env.JOB_NAME}</li>
                            <li><strong>Build:</strong> #${env.BUILD_NUMBER}</li>
                            <li><strong>Status:</strong> ${currentBuild.currentResult}</li>
                            <li><strong>Data e Hora:</strong> ${buildTime}</li>
                            <li><strong>Duração:</strong> ${currentBuild.durationString}</li>
                            <li><strong>Branch:</strong> ${env.BRANCH_NAME}</li>
                            <li><strong>Commit:</strong> ${env.GIT_COMMIT}</li>
                            <li><strong>Autor:</strong> ${env.GIT_AUTHOR_NAME}</li>
                            <li><strong>Mensagem do Commit:</strong> ${env.GIT_COMMIT_MESSAGE}</li>
                            <li><strong>Veja detalhes:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></li>
                        </ul>
                    """,
                    to: 'samueltani@chiptronic.com.br',
                    replyTo: 'samueltanifrancisco@gmail.com',
                    from: 'jenkins teste'
                )
            }
        }
        success {
            echo "Pipeline executado com sucesso!"
        }
        failure {
            echo "Falha na execução do pipeline!"
        }
    }
}
