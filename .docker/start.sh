#!/bin/bash

npm install
npm run migrate

tail -f /dev/null