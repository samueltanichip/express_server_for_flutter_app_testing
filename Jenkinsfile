pipeline {
    agent any
    stages {
        stage('Testes Rápidos') {
            steps {
                bat """
                    echo Executando testes básicos...
                    echo OK > testfile.txt && type testfile.txt || exit /b 1
                    ping -n 1 127.0.0.1 > nul || exit /b 1
                    del testfile.txt
                    echo Sucesso!
                """
            }
        }
    }
    post {
        always {
            bat 'echo Fim: %time%'
        }
    }
}
