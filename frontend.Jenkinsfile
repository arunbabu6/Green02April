stage('Set Node Version') {
    steps {
        script {
            // Load NVM and use Node.js 16
            sh '''
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
            nvm use 16
            node --version
            '''
        }
    }
}
