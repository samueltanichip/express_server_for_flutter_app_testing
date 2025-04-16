@Library('shared_libraries@shared_library') _  // Nome da biblioteca e branch

pipeline {
    agent any

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
