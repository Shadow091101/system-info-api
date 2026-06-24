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
                sh '''
                echo "Building Image with versioning..."

                docker build -t myapp:${BUILD_NUMBER} .
                docker tag myapp:${BUILD_NUMBER} myapp:latest
                '''
            }
        }

        stage('Stop and Remove Old Container') {
            steps {
                sh '''
                echo="Stopping old container if exists..."

                docker stop myapp || true
                docker rm -f myapp || true

                echo "Old container cleaned"
                '''
            }
        }

        stage('Run New Container') {
            steps {
                sh '''

                echo "Starting a new container..."

                docker run -d -p 9009:9009 --name myapp myapp:latest

                echo "Waiting for container to stabilize"
                sleep 5

                docker ps | grep myapp
                '''
            }
        }

        // checking if the new container is healthy or not
        stage('Container Health Check'){
            steps{
                script{
                    sh '''
                    echo "Checking container status..."

                    
                    STATUS=$(docker inspect -f '{{.State.Running}}' myapp)
                    echo "Container Running Status: $STATUS"


                    if [ "$STATUS" != "true" ]; then
                        echo "Container is not running!"
                        exit 1
                    fi

                    echo "Container is running properly."
                    '''
                }
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
                bash backend/scripts/test.sh > test-results.txt 2>&1
                RESULT=$?
                cat test-results.txt
                exit $RESULT
                '''
                // -f makes Jenkins fails if API is broken
            }
        }
        stage('Load Test(k6)'){
            steps{
                sh '''

                echo "Running Load Test..."

                k6 run backend/load-test.js \
                --summary-export=backend/k6-summary.json
                '''
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
        always{
            archiveArtifacts artifacts: 'test-results.txt', fingerprint:true
        }
    }
}