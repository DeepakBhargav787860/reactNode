pipeline{
  agent any
  stages {
    stage('checkout'){
      steps{
        echo "checkout the code for ${env.BRANCH_NAME}"
        //git branch :'${env.BRANCH_NAME}' ,url:'https://github.com/DeepakBhargav787860/socketApplication.git'
        echo "checkout finished"
      }
    }
    stage('build') {
      steps{
        script{
          echo "build the code"
          if(env.BRANCH_NAME=='dev') {
            echo "track the dev branch"
            sh """
             npm install
             npm run build
               """
          }else if(env.BRANCH_NAME=='main'){
            echo "track the main branch"
              sh """
             npm install
             npm run build
             sudo cp -rf /dist /var/www/html/
             sudo systemctl reload nginx
             sudo nginx -t
               """
          }
        }
      }
    }
  }
  post {
    success {
      echo "hurry! pipeline work is successfully done"
    }
    failure {
      echo "oops! pipeline work is failed"
    }
  }
}
