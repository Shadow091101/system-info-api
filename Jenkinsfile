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

        stage('Test API') {
            steps {
                //let us create health check loop
                sh '''
                echo "Waiting for API to be ready"

                for i in {1..15}; do
                    curl -f http://host.docker.internal:9009/cpu  && break
                    echo "waiting ($i)"
                    sleep 2
                done
                echo "running tests..."
                bash backend/scripts/test.sh
                '''
                // -f makes Jenkins fails if API is broken
            }
        }
    }

    post {
        success {
            echo "✅ CI/CD pipeline successful"
        }
        failure {
            echo "❌ Pipeline failed"
        }
        // always{
        //     sh 'docker rm -f myapp || true'
        // }
    }
}