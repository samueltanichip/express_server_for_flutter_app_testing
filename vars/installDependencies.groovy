def call() {
    stage('Instalar Dependências') {
        bat 'npm install'
    }
}
