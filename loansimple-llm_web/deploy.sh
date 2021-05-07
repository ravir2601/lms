#!/usr/bin/env bash
#/bin/bash


#upload files

#Dev Server
DEV_DISTRIBUTION_ID=E2TP9AMQLGHEN1
DEV_BUCKET_URL=s3://devllm.loansimple.in

#Production Server
PROD_DISTRIBUTION_ID=E1F5LWSRU7N8ZR
PROD_BUCKET_URL=s3://llm.loansimple.in

if [[ "$1" == "prod" ]]
then
    DISTRIBUTION_ID=$PROD_DISTRIBUTION_ID
    BUCKET_URL=$PROD_BUCKET_URL
else
    DISTRIBUTION_ID=$DEV_DISTRIBUTION_ID
    BUCKET_URL=$DEV_BUCKET_URL
fi

#AWS Keys
AWS_ACCESS_KEY_ID=AKIAQ2T4X4GLL3GWKZMN
AWS_SECRET_ACCESS_KEY=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


echo "Initiating upload..."
AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY aws s3 cp ./dist $BUCKET_URL --recursive --acl public-read

echo "Deployment Finished, Creating Invalidation in Cloudfront on $DISTRIBUTION_ID"
AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
