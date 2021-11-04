#!/usr/bin/env bash
yarn build && rsync -azP build/* wego-api:/home/ec2-user/app/public && ssh -t wego-api "sudo systemctl daemon-reload; sudo systemctl restart wego"

# touch front.zip &&
# rm front.zip && 
# rm -fr build && 
# npm run build && 
# zip -r -9 front.zip build && 

# scp -r front.zip wego-api:/home/ubuntu && 

# ssh -t wego-api "cd /home/ubuntu && rm -fr front/* && unzip front.zip && mv build/* front/ && rm -fr build"