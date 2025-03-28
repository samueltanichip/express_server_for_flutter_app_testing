pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    environment {
        PATH = "C:\\Windows\\System32;C:\\Windows;C:\\Windows\\System32\\Wbem;${tool 'nodejs'}\\bin;${env.APPDATA}\\npm;${env.PATH}"
        NODE_ENV = 'production'
        CI = 'true'
        npm_config_cache = "${env.WORKSPACE}\\.npm"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    extensions: [[$class: 'CleanBeforeCheckout']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/samueltanichip/express_server_for_flutter_app_testing.git',
                        credentialsId: 'credentials'
                    ]]
                ])
            }
        }

        stage('Setup Environment') {
            steps {
                script {
                    bat '''
                        @echo off
                        echo Configurando ambiente...
                        where node
                        where npm
                        npm config set cache "${WORKSPACE}\\.npm" --global
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    bat '''
                        @echo off
                        echo Limpando cache npm...
                        npm cache clean --force
                        
                        echo Instalando dependências essenciais...
                        npm install next@latest react react-dom --save-exact
                        npm install tailwindcss postcss autoprefixer --save-dev
                        
                        echo Instalando todas as dependências...
                        npm install --no-audit --legacy-peer-deps
                        
                        echo Configurando TailwindCSS...
                        npx tailwindcss init -p
                        
                        echo Verificando instalações...
                        npm list --depth=0
                    '''
                }
            }
        }

        stage('Verify Project Structure') {
            steps {
                script {
                    bat '''
                        @echo off
                        echo Verificando estrutura do projeto...
                        echo Conteúdo da pasta src/components:
                        dir src\\components || echo "Pasta não encontrada"
                        echo Conteúdo do arquivo tailwind.config.js:
                        type tailwind.config.js || echo "Arquivo não encontrado"
                    '''
                }
            }
        }

        stage('Build Application') {
            steps {
                script {
                    bat '''
                        @echo off
                        echo Executando build...
                        npx next build
                        
                        if exist .next (
                            echo Build realizado com sucesso!
                        ) else (
                            echo Falha no build
                            exit 1
                        )
                    '''
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/.next/**/*', allowEmptyArchive: true
            cleanWs()
        }
        failure {
            echo 'Build falhou. Verifique os logs completos.'
        }
    }
}
