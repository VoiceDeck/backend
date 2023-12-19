#!/bin/sh

set -e

NAME=voicedeck_backend_mongo

docker kill $NAME || true
docker run --name $NAME --rm -d -p 27017:27017 mongo:5.0
