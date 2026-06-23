pipeline {
    agent any

    stages {
        stage('Test Docker') {
            steps {
                sh 'docker version'
            }
        }

        stage('Test Build') {
            steps {
                sh 'echo "Pipeline working"'
            }
        }
    }
}