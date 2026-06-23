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
                sh 'docker build -t myapp:latest .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh 'docker rm -f myapp || true'
            }
        }

        stage('Run New Container') {
            steps {
                sh 'docker run -d -p 9009:9009 --name myapp myapp:latest'
            }
        }

        stage('Wait') {
            steps {
                sh 'sleep 5'
            }
        }

        stage('Test App') {
            steps {
                sh 'curl http://localhost:9009/'
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