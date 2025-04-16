@Library('shared_library@main') _

pipeline {
    agent any

    triggers {
        pollSCM('* * * * *') // Verifica o SCM a cada 1 minuto
    }

    environment {
        // Adicionando diretórios necessários ao PATH
        PATH = "C:\\Program Files\\Git\\bin;C:\\Windows\\System32;${env.PATH}"
    }

    stages {
        stage('Checkout main') {
            steps {
                script {
                    checkoutMain()  // Chama a função definida no checkoutMain.groovy da biblioteca
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    installDependencies()  // Chama a função definida no installDependencies.groovy da biblioteca
                }
            }
        }

        stage('Build Project') {
            steps {
                script {
                    buildProject()  // Chama a função definida no buildProject.groovy da biblioteca
                }
            }
        }
    }

    post {
        success {
            script {
                echo "Build was successful!"
                // postBuildReport()  // Função comentada para invalidar
            }
        }

        failure {
            script {
                echo "Build failed!"
            }
        }
    }
}
