// pipeline {
//     agent any

//     stages {

//         stage('WSL Connection Test') {
//             steps {
//                 bat 'wsl node -v'
//                 }
//         }
//         stage('Checkout') {
//             steps {
//                 checkout scm   // pulls your code fresh from GitHub
//             }
//         }

//         stage('Setup (npm install)') {
//             steps {
//                 dir('backend/scripts') {
//                     bat 'wsl bash setup.sh'
//                 }
//             }
//         }

//         stage('Start Server') {
//             steps {
//                 dir('backend/scripts') {
//                     // start.sh runs "node ../index.js" which blocks forever,
//                     // so we launch it in the background and move on
//                     bat 'wsl bash -c "nohup bash start.sh > server.log 2>&1 &"'
//                 }
//                 // give the server a couple seconds to actually boot
//                 bat 'ping -n 4 127.0.0.1 > nul'
//             }
//         }

//         stage('Smoke Test (curl)') {
//             steps {
//                 dir('backend/scripts') {
//                     bat 'wsl bash test-api.sh'
//                 }
//             }
//         }

//         stage('API Test (test.js)') {
//             steps {
//                 dir('backend/scripts') {
//                     bat 'wsl bash test.sh'
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             // ALWAYS stop the server, whether tests passed or failed,
//             // so the port is free for the next build
//             bat 'wsl pkill -f "node ../index.js" || exit 0'
//         }
//         success {
//             echo '✅ All checks passed. Safe to deploy.'
//         }
//         failure {
//             echo '❌ Something failed. Check the stage logs above. NOT deployed.'
//         }
//     }
// }

pipeline {
    agent any

    stages {
        stage('WSL Connection Test') {
            steps {
                bat 'wsl node -v'
            }
        }
    }
}