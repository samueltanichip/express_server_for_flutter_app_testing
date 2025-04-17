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
                    buildProject()  
                }
            }
        }
    }

    post {
        success {
            script {
                echo "Build was successful!"
                 postBuildReport()  
            }
        }

        failure {
            script {
                echo "Build failed!"
            }
        }
    }
}
