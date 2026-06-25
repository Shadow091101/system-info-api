pipeline {
    agent any

    environment {
        IMAGE_NAME = "myapp"
        NETWORK = "cicd-net"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                echo "Building Docker image..."

                docker build -t $IMAGE_NAME:${BUILD_NUMBER} .
                docker tag $IMAGE_NAME:${BUILD_NUMBER} $IMAGE_NAME:latest

                echo "Build completed"
                '''
            }
        }

        stage('Cleanup Old Containers') {
            steps {
                sh '''
                echo "Removing old containers..."

                docker rm -f app1 app2 app3 || true

                echo "Cleanup done"
                '''
            }
        }

        stage('Deploy 3 Replicas') {
            steps {
                sh '''
                echo "Starting 3 backend instances..."

                docker run -d --name app1 --network $NETWORK -p 9001:9009 $IMAGE_NAME:latest
                docker run -d --name app2 --network $NETWORK -p 9002:9009 $IMAGE_NAME:latest
                docker run -d --name app3 --network $NETWORK -p 9003:9009 $IMAGE_NAME:latest

                echo "Containers started:"
                docker ps
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                echo "Waiting for API to be ready..."

                for i in {1..30}; do
                    STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://host.docker.internal:80/cpu)

                    if [ "$STATUS" = "200" ]; then
                        echo "API is READY"
                        exit 0
                    fi

                    echo "Not ready yet... attempt $i"
                    sleep 2
                done

                echo "API failed to start"
                exit 1
                '''
    }
}

        stage('Run Unit Tests') {
            steps {
                sh '''
                echo "Running backend tests..."

                bash backend/scripts/test.sh > test-results.txt 2>&1
                cat test-results.txt
                '''
            }
        }

        stage('Load Test (k6)') {
            steps {
                sh '''
                echo "Starting k6 load test..."

                k6 run backend/load-test.js \
                --env BASE_URL=http://host.docker.internal:80 \
                --summary-export=backend/k6-summary.json \
                | tee test-results.txt

                EXIT_CODE=$?

                echo "k6 exit code: $EXIT_CODE"

                if [ $EXIT_CODE -ne 0 ]; then
                    echo "k6 load test FAILED"
                    exit $EXIT_CODE
                fi

                echo "k6 load test PASSED"
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline SUCCESS"
        }

        failure {
            echo "❌ Pipeline FAILED"
            echo "PIPELINE FAILED"
        }

        always {
            archiveArtifacts artifacts: 'test-results.txt, backend/k6-summary.json', fingerprint: true
        }
    }
}