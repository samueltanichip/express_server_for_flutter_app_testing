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
                // Instalação do Node.js no Windows
                bat 'nvm install ${NODE_VERSION}'
                bat 'nvm use ${NODE_VERSION}'
                // Ou use o Node.js instalado globalmente se já estiver configurado
                // bat 'node --version'
                // bat 'npm --version'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Linting') {
            steps {
                bat 'npm run lint' // Certifique-se de ter um script lint no package.json
            }
        }
        
        stage('Running Tests') {
            steps {
                bat 'npm test'
            }
        }
        
        stage('Build') {
            steps {
                bat 'npm run build' // Apenas se seu projeto precisar de build
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                // Adicione aqui seus comandos de deploy para Windows
                bat 'echo "Deploy realizado com sucesso!"'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline concluída - Status: ${currentBuild.result}'
        }
        success {
            echo 'Pipeline executada com sucesso!'
        }
        failure {
            echo 'Pipeline falhou!'
        }
    }
}
