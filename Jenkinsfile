@Library('shared_libraries@branch_teste') _

pipeline {
    agent any
    environment {
        PATH = "C:\\Windows\\System32;C:\\Program Files\\nodejs;${env.PATH}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    // ① CHAMADA corrigida para checkoutStage
                    checkoutStage(
                        repoUrl: 'https://github.com/samueltanichip/express_server_for_flutter_app_testing.git',
                        branch: 'main',
                        credentialsId: 'credentials'
                    )
                }
            }
        }
        
        stage('Instalar Dependências') {
            steps {
                script {
                    // ② CHAMADA corrigida para installDependencies
                    installDependencies()
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    // ③ CHAMADA corrigida para buildStage
                    buildStage()
                }
            }
        }
    }
    
    post {
        success {
            script {
                // ④ CHAMADA corrigida para pipelineUtils
                pipelineUtils.successPostAction()
            }
        }
        failure {
            script {
                // ⑤ CHAMADA corrigida para pipelineUtils
                pipelineUtils.failurePostAction()
            }
        }
    }
}
