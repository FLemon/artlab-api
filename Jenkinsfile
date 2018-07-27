pipeline {
  agent any
  environment {
    REG_URL = 'eu.gcr.io/teapot-210819'
    REG_CRED = 'gcr:teaport'
    APP = "artlab-api"
    BRANCH = sh(returnStdout: true, script: 'echo $BRANCH_NAME | tr "/" "-"').trim()
    REG_REPO = "$REG_URL/$APP"
    IMAGE_TAG = "$REG_REPO:$BRANCH-$BUILD_ID"
  }
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t ${IMAGE_TAG} .'
      }
    }
    stage('Test') {
      steps {
        sh 'echo "no test"'
      }
    }
    stage('Publish Image') {
      steps {
        script {
          docker.withRegistry("https://$REG_URL", REG_CRED) {
            docker.image("$IMAGE_TAG").push()
          }
        }
      }
    }
  }
}
