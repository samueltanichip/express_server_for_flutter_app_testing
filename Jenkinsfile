@Library('nome-da-sua-shared-library') _  // Carrega a lib (configure no Jenkins)

pipeline {
    agent any
    
    environment {
        PATH = "C:\\Windows\\System32;${env.PATH}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkoutStage(
                    repoUrl: 'https://github.com/samueltanichip/express_server_for_flutter_app_testing.git',
                    branch: 'main'
                )
            }
        }
        
        stage('Instalar e Buildar') {
            steps {
                installDependencies()
                buildStage()
            }
        }
    }
    
    post {
        success { pipelineUtils.successPostAction() }
        failure { pipelineUtils.failurePostAction() }
    }
}
