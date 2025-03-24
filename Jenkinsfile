pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Test Node') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }
    }
}
