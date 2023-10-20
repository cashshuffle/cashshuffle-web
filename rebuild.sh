#!/bin/bash
############################################################
# 
# A simple script that makes debugging dockerfiles easier.
# 
############################################################

set -x

# Name for this container and image
name="cashshuffle-web"

# Check for a -p flag
while [[ "$#" > 0 ]]; do case $1 in
  -p|--production) production=true; shift;;
  *) echo "Unknown parameter passed: $1"; exit 1;;
esac; shift; done

# Choose flag for detached or interactive terminal
if [ "$production" = true ]
then
  img_name="zquestz/"$name
  container_name=$name
  run_mode="-d"
  port="-p 5005:8090"
  restart="--restart always"
else
  img_name="zquestz/"$name"-dev"
  container_name=$name"-dev"
  run_mode="-it"
  port="-p 5005:8090"
  restart=""
  mount='type=bind,source='"$(pwd)"'/.build,target=/usr/share/nginx/html/'
fi

# Stop any running containers with this name
docker stop $container_name
docker rm $container_name

# Build the new image
docker build . -t $img_name || exit

# Run the new image
if [ "$production" = true ]
then
  docker run $run_mode $port --name $container_name $img_name || exit
else
  docker run $run_mode $port --name $container_name --mount "$mount" $img_name || exit
fi
