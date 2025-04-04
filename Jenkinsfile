@Library('shared_libraries@branch_teste') _

// Importa os métodos da biblioteca compartilhada, se necessário
import com.seuPacote.checkoutStage
import com.seuPacote.installDependencies
import com.seuPacote.buildStage
import com.seuPacote.pipelineUtils

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
                    checkoutStage('https://github.com/samueltanichip/express_server_for_flutter_app_testing.git', 'main', 'credentials')
                }
            }
        }
        
        stage('Instalar Dependências') {
            steps {
                script {
                    // ② CHAMADA à installDependencies
                    installDependencies()
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    // ③ CHAMADA à buildStage
                    buildStage()
                }
            }
        }
    }
    
    post {
        success {
            script {
                // ④ CHAMADA à pipelineUtils
                pipelineUtils.successPostAction()
            }
        }
        failure {
            script {
                // ⑤ CHAMADA à pipelineUtils
                pipelineUtils.failurePostAction()
            }
        }
    }
}
