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
            // steps {
            //     //let us create health check loop
            //     sh '''
            //     for i in {1..10}; do
            //         curl -f http://host.docker.internal:9009/cpu  && exit 0
            //         echo "waiting"
            //         sleep 3
            //     done
            //     exit 1
            //     '''
            //     // -f makes Jenkins fails if API is broken
            // }
            steps{
                sh'''
                sleep 10
                bash backend/test.sh
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
        // always{
        //     sh 'docker rm -f myapp || true'
        // }
    }
}