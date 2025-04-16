pipeline {
    agent any

    environment {
        // Definindo o PATH para incluir o Git e o System32 no ambiente do Windows
        PATH = "C:\\Program Files\\Git\\bin;C:\\Windows\\System32;${env.PATH}"
    }

    stages {
        stage('Pipeline') {
            steps {
                script {
                    // Etapa de checkout da branch main
                    checkoutMain()

                    // Instalação das dependências do projeto
                    installDependencies()

                    // Execução da build do projeto
                    buildProject()
                }
            }
        }
    }

    post {
        always {
            // Relatório pós-build, executado sempre
            postBuildReport()
        }
        success {
            echo "Pipeline executado com sucesso!"
        }
        failure {
            echo "Falha na execução do pipeline!"
        }
    }
}
