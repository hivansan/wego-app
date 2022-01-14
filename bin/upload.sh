#!/usr/bin/env bash
yarn build
rsync -azP build/* wego-prod-1:~/app
rsync -azP build/* wego-prod-2:~/app