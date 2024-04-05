pipeline {
    agent any
    tools{
        nodejs 'node'
    }
    options {
        skipDefaultCheckout(true)
    }
    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Copy Environment For Django API') {
            environment {
                API_ENV = credentials('API_ENV')
            }

            steps {
            sh 'cp $API_ENV Django_Rest_Oauth2_Backend/.env'
            }
        }

        stage('Deploy Back End Application') {
            steps {
                sh 'sudo docker compose -f Django_Rest_Oauth2_Backend/docker-compose.yml --env-file=Django_Rest_Oauth2_Backend/.env up -d --build'
            }
        }

        stage('Clear Stopped Containers') {
            steps {
                sh 'sudo docker container prune -f'
            }
        }

        stage('Clear Unused Images') {
            steps {
                sh 'sudo docker rmi $(sudo docker images -f "dangling=true" -q) &>/dev/null'
            }
        }

        // DEPLOY REACT APPLICATION
        stage('Copy Environment For React Application') {
            environment {
                UI_ENV = credentials('UI_ENV')
            }

            steps {
                sh 'cp $UI_ENV React_OAuth2_Frontend/.env'
            }
        }

        stage('Install React Application') {
            steps {
                sh 'cd React_OAuth2_Frontend && npm install'
            }
        }

        stage('Build React Application') {
            steps {
                sh 'cd React_OAuth2_Frontend && npm run build'
            }
        }

        stage("Clean Front End Folder") {
            steps {
               sh 'rm -rf /var/www/oauth2.vitaliisili.com'
            }
        }

        stage('Deploy Front End Application') {
            steps {
                sh 'mkdir -p /var/www/oauth2.vitaliisili.com'
                sh 'cp -r React_OAuth2_Frontend/build/. /var/www/oauth2.vitaliisili.com'
            }
        }
    }
}