node {
    def appDir = '/var/www/reactjs-app'

    stage('Clean Workspace') {
        deleteDir()
    }

    stage('Clone Repo') {
        git(
            branch: 'main',
            url: 'https://github.com/priyanshu-kumar01/File-distributer'
        )
    }

    stage('Deploy to EC2') {
        sh """
    sudo mkdir -p ${appDir}
    sudo chown -R jenkins:jenkins ${appDir}

    rsync -av --delete \
        --exclude='.git' \
        --exclude='node_modules' \
        ./ ${appDir}/

    cd ${appDir}/client

    npm install
    npm run build

    sudo fuser -k 4173/tcp || true

    nohup npm run preview -- --host 0.0.0.0 --port 4173 > preview.log 2>&1 &
    """
    }
}