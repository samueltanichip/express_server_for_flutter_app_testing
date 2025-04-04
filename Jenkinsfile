@Library('shared_libraries')

pipeline {
    agent any
    
    environment {
        // Garante que cmd.exe e npm estejam no PATH (Windows)
        PATH = "C:\\Windows\\System32;C:\\Program Files\\nodejs;${env.PATH}"
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
        
        stage('Instalar Dependências') {
            steps {
                script {
                    // Verifica se o npm está acessível antes de executar
                    if (!isNpmAvailable()) {
                        error "npm não encontrado no PATH. Verifique a instalação do Node.js."
                    }
                    installDependencies()  // Chama a lib installDependencies.groovy
                }
            }
        }
        
        stage('Build') {
            steps {
                buildStage()  // Chama a lib buildStage.groovy
            }
        }
    }
    
    post {
        always {
            echo "Pipeline finalizado - Status: ${currentBuild.currentResult}"
        }
        success {
            pipelineUtils.successPostAction()  // Chama a função da lib pipelineUtils.groovy
        }
        failure {
            pipelineUtils.failurePostAction()  // Chama a função da lib pipelineUtils.groovy
        }
    }
}

// Função utilitária para verificar se o npm está disponível
Boolean isNpmAvailable() {
    try {
        def status = bat(script: 'npm --version', returnStatus: true)
        return (status == 0)
    } catch (Exception e) {
        return false
    }
}
