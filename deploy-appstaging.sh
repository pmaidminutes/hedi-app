#!/bin/bash

function sync_files() {
    echo "synchronizing config files"
    rsync -avzP .babelrc .env.appstaging next.config.js package.json yarn.lock root@cms.projekt-hedi.de:/root/aidminutes/hedi-app/hedi-app
    echo "rename env file"
    ssh root@cms.projekt-hedi.de cp aidminutes/hedi-app/hedi-app/.env.appstaging aidminutes/hedi-app/hedi-app/.env.local
    echo "synchronizing data"
    rsync -avzP .next root@cms.projekt-hedi.de:/root/aidminutes/hedi-app/hedi-app
}

function container_restart() {
    echo "restarting remote container"
    ssh root@cms.projekt-hedi.de docker restart HEDI_APP
}

if [ "$1" != "skip-build" ]; then
    yarn build
fi

sync_files
container_restart
