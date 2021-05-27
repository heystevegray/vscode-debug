#!/bin/sh
# deploy migrations
npm run deploy
# seed
npm run seed
# build app
npm run build
# host build app
npm run start
