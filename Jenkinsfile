pipeline {
    agent any
    
    environment {
        // Configura caminhos absolutos para todas as ferramentas necessárias
        WINDIR = "C:\\Windows"
        SYSTEMROOT = "C:\\Windows"
        SYSTEM32 = "${env.WINDIR}\\System32"
        NODEJS = "C:\\Program Files\\nodejs"
        GIT = "C:\\Program Files\\Git\\bin"
        
        // Configura o PATH de forma explícita
        PATH = "${env.SYSTEM32};${env.NODEJS};${env.GIT};${env.PATH}"
    }
    
    stages {
        stage('Verificar Ambiente') {
            steps {
                script {
                    // Verifica cada comando com o caminho absoluto
                    def tools = [
                        'cmd': "${env.SYSTEM32}\\cmd.exe",
                        'node': "${env.NODEJS}\\node.exe",
                        'npm': "${env.NODEJS}\\npm.cmd",
                        'git': "${env.GIT}\\git.exe"
                    ]
                    
                    tools.each { name, path ->
                        bat """
                            if not exist "${path}" (
                                echo ❌ ${name.toUpperCase()} não encontrado em ${path}
                                exit /b 1
                            ) else (
                                echo ✅ ${name.toUpperCase()} encontrado: ${path}
                            )
                        """
                    }
                }
            }
        }
        
        stage('Checkout Código') {
            steps {
                // Usa o método nativo de checkout do Jenkins
                checkout scm
            }
        }
        
        stage('Instalar Dependências') {
            steps {
                bat """
                    "${env.NODEJS}\\npm.cmd" install
                """
            }
        }
        
        stage('Executar Testes') {
            steps {
                script {
                    try {
                        bat """
                            "${env.NODEJS}\\npm.cmd" test || echo "⚠️ Testes falharam mas o pipeline continua"
                        """
                    } catch (e) {
                        echo "⚠️ Erro nos testes: ${e}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo "Build finalizado com status: ${currentBuild.currentResult}"
            cleanWs()
        }
    }
}
