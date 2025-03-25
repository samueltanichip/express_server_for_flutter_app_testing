pipeline {
    agent any
    
    environment {
        // Ajuste esses caminhos conforme sua instalação
        NODE_PATH = "C:\\Program Files\\nodejs"
        GIT_PATH = "C:\\Program Files\\Git\\bin"
        SYSTEM_ROOT = "C:\\Windows\\System32"
        
        // Combine todos os paths necessários
        PATH = "${env.SYSTEM_ROOT};${env.NODE_PATH};${env.GIT_PATH};${env.PATH}"
    }
    
    stages {
        stage('Verificar Ambiente') {
            steps {
                script {
                    // Lista todos os comandos que precisam funcionar
                    def commands = ['cmd', 'node', 'npm', 'git']
                    
                    commands.each { cmd ->
                        try {
                            bat "where ${cmd}"
                        } catch (Exception e) {
                            error("FALHA CRÍTICA: ${cmd} não encontrado no PATH. Configure corretamente o ambiente.")
                        }
                    }
                }
            }
        }
        
        stage('Checkout') {
            steps {
                bat """
                    git --version
                    git config --global --add safe.directory *
                    git clone https://github.com/samueltanichip/express_server_for_flutter_app_testing.git .
                    git checkout main
                """
            }
        }
        
        stage('Instalar Dependências') {
            steps {
                bat """
                    cd /d "%WORKSPACE%"
                    npm install
                """
            }
        }
        
        stage('Executar Testes') {
            steps {
                bat """
                    cd /d "%WORKSPACE%"
                    npm test
                """
            }
        }
    }
    
    post {
        always {
            echo "Status final: ${currentBuild.currentResult}"
            cleanWs() // Limpa o workspace
        }
    }
}

