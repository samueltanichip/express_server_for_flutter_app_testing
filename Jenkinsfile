@Library('shared_libraries@branch_teste') _

pipeline {
    agent any
    environment {
        PATH = "C:\\Windows\\System32;C:\\Program Files\\nodejs;${env.PATH}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                // ① CHAMADA à checkoutStage.groovy
                checkoutStage(
                    repoUrl: 'https://github.com/samueltanichip/express_server_for_flutter_app_testing.git',
                    branch: 'main',
                    credentialsId: 'credentials'
                )
            }
        }
        
        stage('Instalar Dependências') {
            steps {
                // ② CHAMADA à installDependencies.groovy
                installDependencies()  
            }
        }
        
        stage('Build') {
            steps {
                // ③ CHAMADA à buildStage.groovy
                buildStage()  
            }
        }
    }
    
    post {
        success {
            script {
                // ④ CHAMADA à pipelineUtils.groovy
                pipelineUtils.successPostAction()  
            }
        }
        failure {
            script {
                // ⑤ CHAMADA à pipelineUtils.groovy
                pipelineUtils.failurePostAction()  
            }
        }
    }
}
