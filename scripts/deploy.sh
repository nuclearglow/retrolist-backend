#!/usr/bin/env zsh

echo "Deploying..."

ssh -T $DEPLOYMENT_USERNAME@$DEPLOYMENT_HOST << EOSSH
cd $DEPLOYMENT_PATH
git pull
npm ci
cd $DEPLOYMENT_ECOSYSTEM_PATH
pm2 restart ecosystem.config.js
EOSSH
