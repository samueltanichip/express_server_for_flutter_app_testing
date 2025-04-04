pipeline {
    agent any
    
    environment {
        SYSTEMROOT = "${env.SYSTEMROOT}"  // Garante acesso às variáveis do sistema
    }
    
    stages {
        stage('Testes Essenciais') {
            steps {
                bat """
                    @echo off
                    echo Verificando sistema...
                    where cmd || echo [ERRO] cmd.exe não encontrado && exit /b 1
                    echo Sistema operacional: %OS%
                    echo Diretório atual: %CD%
                    echo Teste básico concluído com sucesso!
                """
            }
        }
    }
    
    post {
        always {
            echo 'Fim da execução'
        }
    }
}
