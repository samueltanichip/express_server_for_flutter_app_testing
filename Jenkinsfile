pipeline {
    agent any

    environment {
        NODE_VERSION = '20.11.1'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Instalar NodeJS') {
            steps {
                script {
                    def nodeHome = tool name: "NodeJS_${NODE_VERSION}", type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }
            }
        }

        stage('Instalar Dependências') {
            steps {
                sh 'npm install'
            }
        }

        stage('Rodar Testes') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        always {
            emailext (
                mimeType: 'text/html',
                subject: "${currentBuild.currentResult} - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <h2>Resultado do Build: ${currentBuild.currentResult}</h2>
                    <ul>
                        <li><strong>Job:</strong> ${env.JOB_NAME}</li>
                        <li><strong>Build:</strong> #${env.BUILD_NUMBER}</li>
                        <li><strong>Status:</strong> ${currentBuild.currentResult}</li>
                        <li><strong>Veja detalhes:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></li>
                    </ul>
                """,
                to: 'samueltanifrancisco@gmail.com'
            )
        }
    }
}
