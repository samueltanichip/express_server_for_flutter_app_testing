def call(Map params) {
    String repoUrl = params.repoUrl
    String branch = params.get('branch', 'main')

    stage('Checkout') {
        git branch: branch, url: repoUrl
    }
}
