pipeline {
    agent any
    
    environment {
        NODE_VERSION = 'nodejs'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/samueltanichip/express_server_for_flutter_app_testing.git'
            }
        }
        
        stage('Setup Node.js') {
            steps {
                script {
                    // Instala a versão específica do Node.js usando nvm
                    sh '''
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                        nvm install ${NODE_VERSION}
                        nvm use ${NODE_VERSION}
                    '''
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Linting') {
            steps {
                sh 'npm run lint' // Certifique-se de ter um script lint no package.json
            }
        }
        
        stage('Running Tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build' // Apenas se seu projeto precisar de build
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                // Adicione aqui seus comandos de deploy
                // Exemplo para deploy em um servidor:
                // sh 'scp -r build/ user@server:/path/to/deploy'
                echo 'Deploy realizado com sucesso!'
            }
        }
    }
    
    post {
        always {
            // Limpeza ou notificações podem ser adicionadas aqui
            echo 'Pipeline concluída - Status: ${currentBuild.result}'
        }
        success {
            // Notificação de sucesso (Slack, Email, etc.)
            echo 'Pipeline executada com sucesso!'
        }
        failure {
            // Notificação de falha
            echo 'Pipeline falhou!'
        }
    }
}
