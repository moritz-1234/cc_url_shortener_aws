rm lambdaFunc.zip
zip -r lambdaFunc.zip .
aws lambda update-function-code --function-name reroute --region eu-central-1 --zip-file fileb://./lambdaFunc.zip