@Library('shared_library@main') _

pipeline {
    agent any

    environment {
        PATH = "C:\\Program Files\\Git\\bin;C:\\Windows\\System32;${env.PATH}"
    }

    stages {
        stage('Checkout main') {
            steps {
                script {
                    checkout scm  // Substituindo checkoutMain() por checkout scm
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    installDependencies()  // Continuando a usar a função da biblioteca para instalar dependências
                }
            }
        }

        stage('Build Project') {
            steps {
                script {
                    buildProject()  // Continuando a usar a função da biblioteca para build do projeto
                }
            }
        }
    }

    post {
        success {
            script {
                echo "Build was successful!"
                postBuildReport()  // Chamada para função da biblioteca
            }
        }

        failure {
            script {
                echo "Build failed!"
            }
        }
    }
}
