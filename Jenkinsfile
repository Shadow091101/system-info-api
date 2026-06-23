pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t myapp:latest .'
            }
        }

        stage('Stop Old Container') {
            steps {
                bat 'docker rm -f myapp || exit 0'
            }
        }

        stage('Run New Container') {
            steps {
                bat 'docker run -d -p 9009:9009 --name myapp myapp:latest'
            }
        }

        stage('Wait') {
            steps {
                bat 'timeout /t 5'
            }
        }

        stage('Test App') {
            steps {
                bat 'curl http://localhost:9009/'
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful"
        }
        failure {
            echo "❌ Build failed"
        }
    }
}