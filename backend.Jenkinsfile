pipeline {
    agent any

    environment {
        DOCKER_IMAGEE = 'arunthopil/pro-green-v2' // Corrected variable name
        SONARQUBE_TOKEN = credentials('sonar-aws')
        DOCKERHUB_CREDENTIALS = credentials('dockerhub1')
        MONGO_URI = credentials('MONGO_URI')
        // SSH credentials for each environment
        PROJECT_DIR = '/opt/docker-green'
    }

    stages {
        stage('Setup') {
            agent any
            steps {
                script {
                    env.ENVIRONMENT = BRANCH_NAME == 'main' ? 'Production' :
                                  BRANCH_NAME == 'development' ? 'Testing' :
                                  BRANCH_NAME == 'staging' ? 'Staging' :
                                  BRANCH_NAME == 'devops' ? 'Demo' : 'Unknown'
                    echo "Environment set to ${env.ENVIRONMENT}"
                }
            }
        }

        stage('Checkout Code') {
            agent any
            steps {
                checkout scm
            }
        }

        stage('Clean Workspace') {
            agent any
            steps {
                 script {
                    if (fileExists('.')) {
                        deleteDir()
                    } else {
                        echo "Workspace directory does not exist, no need to delete."
                    }
                 }
             }
        }

        stage('Use Artifacts') {
            agent any
            steps {
                script {
                    if (currentBuild.previousBuild != null && currentBuild.previousBuild.result == 'SUCCESS') {
                        try { 
                            copyArtifacts(projectName: "For-Green2/main", selector: lastSuccessful(), filter: 'lint-results.txt');
                        } catch (Exception e) {
                            echo "Warning: Failed to copy artifacts. Proceeding without them."
                        }
                    } else {
                        echo "No previous successful build found. Skipping artifact copy."
                    }
                }
            }
        }

        stage('Stash Backend') {
            agent any
            steps {
                dir('backend') {
                    stash includes: '**', name: 'backend-src'
                }
            }
        }

        stage('Prepare and Build') {
            agent any
            steps {
                script {
                    unstash 'backend-src'
                    dir('backend') {
                        // Assuming the build commands are here [ @Chandan verify this]
                    //    sh 'cp ${WORKSPACE}/.env .'
                        sh 'npm install'
                        // Stash the build artifacts, excluding the node_modules directory
                        stash excludes: 'node_modules/**', includes: '**', name: 'build-artifactsb'
                    }
                }
            }
        }

        stage('Generate Documentation') {
            agent any
            steps {
                script {
                    // Create a temporary directory in the Jenkins workspace to hold the unstashed files
                    sh "mkdir -p temp_backend"
                    // Unstash the backend source code into this temporary directory
                    dir('temp_backend') {
                        unstash 'backend-src'
                    }
                    // Copy the source code specifically to the 'backenddocs' directory on the Docker host
                    sshagent(['sshtoaws']) {
                        sh "ssh ubuntu@ip-10-3-1-91 'rm -rf ${PROJECT_DIR}/backenddocs/*'"
                        sh "ssh ubuntu@ip-10-3-1-91 'mkdir ${PROJECT_DIR}/backenddocs/docs'"
                        sh "scp -rp temp_backend/* ubuntu@ip-10-3-1-91:${PROJECT_DIR}/backenddocs"
                        // Generate the documentation on the Docker host, specifying the output within the same 'backenddocs' directory or a subdirectory of it for the generated docs
                        sh "ssh ubuntu@ip-10-3-1-91.us-east-2.compute.internal 'cd ${PROJECT_DIR}/backenddocs && jsdoc -c jsdoc.conf.json -r . -d ./docs'"
                        // Optionally archieving the generated documentation in Jenkins, copy it back from the Docker host
                        sh "scp -rp ubuntu@ip-10-3-1-91.us-east-2.compute.internal:${PROJECT_DIR}/backenddocs/docs ./docs-backend"
                    }
                    // Archiving the documentation if copied back
                    archiveArtifacts artifacts: 'docs-backend/**', allowEmptyArchive: true
                }
        }
    }



        // SonarQube Analysis and Snyk Security Scan 
        stage('SonarQube Analysis') {
            agent any
            steps {
                withSonarQubeEnv('Sonarqube') { // 'Sonarcube-cred' from |should match the SonarQube configuration in Jenkins
                    sh """
                      sonar-scanner \
                      -Dsonar.projectKey=ProjectGreenBackend-Production \
                      -Dsonar.sources=. \
                      -Dsonar.host.url=http://172.19.0.4:9000/ \
                      -Dsonar.login=$SONARQUBE_TOKEN
                    """
                }
            }
        }

        stage('Snyk Security Scan') {
            agent any
            steps {
                dir('client') {
        //        snykSecurity failOnError: false, failOnIssues: false, organisation: 'arunbabu6', projectName: 'For-Green2', snykInstallation: 'Snyk', snykTokenId: 'snyk-token', targetFile: 'package.json'
                snykSecurity failOnError: false, failOnIssues: false, organisation: 'arunbabu6', projectName: 'For-Green2-Backend', snykInstallation: 'Snyk', snykTokenId: 'snyk-token'
                }

            }
        }

        stage('Lint') {
            agent any
            steps {
                dir('client') { 
                                // Execute the lint script and allow the build not to fail on lint errors
                  script {
                     // Run lint script and capture the exit code
                     def lintExitCode = sh(script: 'npm run lint:ci || true', returnStatus: true)

                     // Check if the lint report exists
                      if (fileExists('eslint-report.xml')) {
                     // Archive the eslint report
                          archiveArtifacts artifacts: 'eslint-report.json', onlyIfSuccessful: true
                    } else {
                          echo "No eslint-report.xml found"
                    }

                // If the lint script exited with an error (non-zero exit code), fail the build
                      if (lintExitCode != 0) {
                           error("Linting failed with exit code: ${lintExitCode}")
                     }
                   }
               }
           }
        }
 
        stage('Build and Push Docker Image') {
            agent any
            steps {
                script {
                    // Create a directory 'artifacts' in the Jenkins workspace to hold the unstashed files
                    sh "mkdir -p artifactsb"
                    dir('artifactsb') {
                        // Unstash the build artifacts into this 'artifacts' directory
                        unstash 'build-artifactsb'
                        }
                        sshagent(['jenkinaccess']) {
                            // Clear the 'artifacts' directory on the Docker host
                            sh "ssh ubuntu@ip-10-3-1-91.us-east-2.compute.internal 'rm -rf ${PROJECT_DIR}/artifactsb/*'"
                            sh "scp -rp artifactsb/* ubuntu@ip-10-3-1-91.us-east-2.compute.internal:${PROJECT_DIR}/artifactsb/"
                            sh "ssh ubuntu@ip-10-3-1-91.us-east-2.compute.internal 'ls -la ${PROJECT_DIR}/artifactsb/'"

                            // Build the Docker image on the Docker host
                            sh "ssh ubuntu@ip-10-3-1-91.us-east-2.compute.internal 'cd ${PROJECT_DIR} && docker build -f backend.Dockerfile -t ${env.DOCKER_IMAGEE}:${env.ENVIRONMENT.toLowerCase()}-backend-${env.BUILD_NUMBER} .'"

                        }
                        // Log in to DockerHub and push the image
                        withCredentials([usernamePassword(credentialsId: 'dockerhub1', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                            sh """
                                echo '${DOCKER_PASSWORD}' | ssh ubuntu@ip-10-3-1-91.us-east-2.compute.internal 'docker login -u ${DOCKER_USERNAME} --password-stdin' > /dev/null 2>&1
                                ssh ubuntu@ip-10-3-1-91.us-east-2.compute.internal 'docker push ${env.DOCKER_IMAGEE}:${env.ENVIRONMENT.toLowerCase()}-backend-${env.BUILD_NUMBER}'
                            """
                        }

                    }
            }
        }

        stage('Trivy Vulnerability Scan') {
            agent any
            steps {
                script {
                    // Wrapping the SSH commands in a single SSH session
                    sshagent(['jenkinaccess']) {
                        // Execute Trivy scan and echo the scanning process
                        sh "ssh ubuntu@ip-10-3-1-91.us-east-2.compute.internal 'trivy image --download-db-only && \
                        echo \"Scanning ${env.DOCKER_IMAGEE}:${env.ENVIRONMENT.toLowerCase()}-backend-${env.BUILD_NUMBER} with Trivy...\" && \
                        trivy image --format json --output \"/opt/docker-green/Trivy/trivy-report--${env.BUILD_NUMBER}.json\" ${env.DOCKER_IMAGEE}:${env.ENVIRONMENT.toLowerCase()}-backend-${env.BUILD_NUMBER}'"
                        // Correctly execute scp within a sh command block
                        sh "scp ubuntu@ip-10-3-1-91.us-east-2.compute.internal:/opt/docker-green/Trivy/trivy-report--${env.BUILD_NUMBER}.json ."

                        // Use double quotes for string interpolation
                        archiveArtifacts artifacts: "trivy-report--${env.BUILD_NUMBER}.json", onlyIfSuccessful: true
                    }
                }
            }
        }

        stage('Deploy') {      
            agent any  
            steps {
                script {
                    switch (ENVIRONMENT) {
                        case 'Demo':
                        withCredentials([string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI_SECRET')]) {
                            sshagent(['jenkinaccess']) {
                                sh """
                                    ssh -o StrictHostKeyChecking=no ab@host.docker.internal '
                                    docker pull ${env.DOCKER_IMAGEE}:${env.ENVIRONMENT.toLowerCase()}-backend-${env.BUILD_NUMBER} &&
                                    docker stop projectname-backend-v2 || true &&
                                    docker rm projectname-backend-v2 || true &&
                                    docker run -d --name projectname-backend-v2 -p 6969:6969 -e MONGO_URI="${MONGO_URI}" ${env.DOCKER_IMAGEE}:${env.ENVIRONMENT.toLowerCase()}-backend-${env.BUILD_NUMBER}
                                    '
                                """
                            }
                        }
                        break
              
                        case 'Testing':
                        withCredentials([string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI_SECRET')]) {
                            sshagent(['jenkinaccess']) {
                                sh """
                                    ssh -o StrictHostKeyChecking=no ab@host.docker.internal '
                                    docker pull ${env.DOCKER_IMAGEE}:${env.ENVIRONMENT.toLowerCase()}-backend-${env.BUILD_NUMBER} &&
                                    docker stop projectname-backend-v2 || true &&
                                    docker rm projectname-backend-v2 || true &&
                                    docker run -d --name projectname-backend-v2 -p 6969:6969 -e MONGO_URI="${MONGO_URI}" ${env.DOCKER_IMAGEE}:${env.ENVIRONMENT.toLowerCase()}-backend-${env.BUILD_NUMBER}
                                    '
                                """
                            }
                        }
                        break
                           
                        case 'Production':
                        withCredentials([string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI_SECRET')]) {
                            sshagent(['jenkinaccess']) {
                                sh """
                                    ssh -o StrictHostKeyChecking=no ubuntu@ip-10-2-1-235.us-east-2.compute.internal '
                                    docker pull ${env.DOCKER_IMAGEE}:${env.ENVIRONMENT.toLowerCase()}-backend-${env.BUILD_NUMBER} &&
                                    docker stop projectname-backend-v2 || true &&
                                    docker rm projectname-backend-v2 || true &&
                                    docker run -d --name projectname-backend-v2 -p 6969:6969 -e MONGO_URI=MONGO_URI="${MONGO_URI}" ${env.DOCKER_IMAGEE}:${env.ENVIRONMENT.toLowerCase()}-backend-${env.BUILD_NUMBER}
                                    '
                                """
                            }
                        }
                        break
                            
                        case 'Staging':
                        withCredentials([string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI_SECRET')]) {
                            sshagent(['jenkinaccess']) {
                                sh """
                                    ssh -o StrictHostKeyChecking=no ab@Staging-host.docker.internal '
                                    docker pull ${env.DOCKER_IMAGEE}:${env.ENVIRONMENT.toLowerCase()}-backend-${env.BUILD_NUMBER} &&
                                    docker stop projectname-backend-v2 || true &&
                                    docker rm projectname-backend-v2 || true &&
                                    docker run -d --name projectname-backend-v2 -p 6969:6969 -e MONGO_URI="${MONGO_URI}" ${env.DOCKER_IMAGEE}:${env.ENVIRONMENT.toLowerCase()}-backend-${env.BUILD_NUMBER}
                                    '
                                """
                            }
                        }
                        break
                            
                        default:
                            echo "Environment configuration not found"
                            return

                    }

                }
            }
        }
    }

    post {
        always {
            script{
                   
                if (env.ENVIRONMENT) {
                    echo "Pipeline execution completed for ${env.ENVIRONMENT}"
                } else {
                    echo "Pipeline execution completed, but ENVIRONMENT was not set."
                }
            }
        }
    }
}

