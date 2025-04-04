def call(String repoUrl, String branch = 'main') {
    stage('Checkout') {
        git branch: branch, url: repoUrl
    }
}
