pipeline {
    agent any

    environment {
        PATH = "C:\\Program Files\\Git\\bin;C:\\Windows\\System32;${env.PATH}"
    }

    stages {
        stage('Pipeline') {
            steps {
                script {
                    // Chama a função para fazer o checkout da branch principal
                    checkoutMain()

                    // Instala as dependências do projeto
                    installDependencies()

                    // Realiza a build do projeto
                    buildProject()
                }
            }
        }
    }

    post {
        always {
            // A etapa de postBuildReport foi desativada
            // script {
            //     postBuildReport()
            // }
        }
        success {
            echo "Pipeline executado com sucesso!"
        }
        failure {
            echo "Falha na execução do pipeline!"
        }
    }
}
