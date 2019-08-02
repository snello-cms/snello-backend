#!/usr/bin/env bash

ng build --prod --base-href /snello-admin --deploy-url /snello-admin/
docker build --no-cache -t snellocms/snello-admin -f Dockerfile-local .
docker tag snellocms/snello-admin snellocms/snello-admin:local
docker tag snellocms/snello-admin snellocms/snello-admin:latest
docker push snellocms/snello-admin:latest
docker push snellocms/snello-admin:local
