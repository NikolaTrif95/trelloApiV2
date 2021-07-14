#!/bin/bash

docker-compose -f docker-compose.yml up

echo "\n\n --- Running containers: ---\n\n"
docker ps
