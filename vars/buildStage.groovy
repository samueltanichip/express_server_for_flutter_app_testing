def call() {
    stage('Build') {
        bat '"C:\\Program Files\\nodejs\\npm.cmd" run build'
    }
}
