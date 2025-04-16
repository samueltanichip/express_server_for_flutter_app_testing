@Library('shared_library@main') _

pipeline {
    agent any

    triggers {
        pollSCM('* * * * *') 
    }

    environment {
        
        PATH = "C:\\Program Files\\Git\\bin;C:\\Windows\\System32;${env.PATH}"
    }

    stages {
        stage('Checkout main') {
            steps {
                script {
                    checkoutMain()  
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    installDependencies()  
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
                 postBuildReport()  // Função comentada para invalidar
            }
        }

        failure {
            script {
                echo "Build failed!"
            }
        }
    }
}
