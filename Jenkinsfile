pipeline {
    agent any

    environment {
        PATH = "C:\\Program Files\\Git\\bin;C:\\Windows\\System32;${env.PATH}"
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
                // Relatório pós-build, executado sempre
              //  postBuildReport()
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
