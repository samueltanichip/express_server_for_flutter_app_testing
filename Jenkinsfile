@Library('jenkins-library@shared_library') _

pipeline {
    agent any

    triggers {
        pollSCM('* * * * *') 
    }

    environment {
        PATH = "C:\\Windows\\System32;${env.PATH}"
    }

    stages {
        stage('Pipeline') {
            steps {
                script {
                    checkoutMain()
                    installDependencies()
                    buildProject()
                }
            }
        }
    }

    post {
        always {
            script {
                postBuildReport()
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
