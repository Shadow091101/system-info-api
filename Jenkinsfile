// pipeline {
//     agent any

//     stages {
//         stage('Test Docker') {
//             steps {
//                 sh 'docker version'
//             }
//         }

//         stage('Test Build') {
//             steps {
//                 sh 'echo "Pipeline working"'
//             }
//         }
//     }
// }


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
                sh 'sleep 15'
                sh 'curl http://host.docker.internal:9009/cpu'
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
    }
}