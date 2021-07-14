# Local environment for treloApi in docker containers

In order to simplify the development process and initial setup, containerization is done using Docker tool.

Requirements:

- Docker installed (How to: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04)
- Docker-compose installed (How to: https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04)

Steps:

1 create .env file in docker-build/trelloApiDockerCompose/.env and put path to workspcace, mine was
WORKSPACE=/home/ntrifunovic/workspace
2. Locate to root of the project 
3. Build Dockerfile

        docker build . -t myapp
     If you are running on mac you must use following commands before running docker build:

        export DOCKER_BUILDKIT=0
        export COMPOSE_DOCKER_CLI_BUILD=0
4. run start.sh

API was create as original trelo api, with few changes, because of mongodb model relation