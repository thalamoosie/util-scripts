#!/bin/bash

output=$(aws sts get-caller-identity)
account_id=$(echo "$output" | jq -r ".Account")

#AWS_DEV_ACCOUNT = # of your desired AWS account
#AWS_DEV_NAME = canonical name of your AWS account, choose something you will easily recognize
# Export these in your terminal session, or keep in shell config

# Check if AWS Profile environment variable is set
if [[ -z $AWS_PROFILE ]]; then
    echo "\$AWS_PROFILE var is unset or empty. Please set before proceeding."
else
    if [ "$account_id" == "$AWS_DEV_ACCOUNT" ]; then
        echo "You are in your AWS dev account: ($AWS_DEV_NAME) ($account_id)"
    else 
        echo "CAUTION! You are NOT currently pointing to your Dev Account!"
        echo "Actual Account: ($account_id)"
        echo "Check AWS_PROFILE env var before proceeding!"
        echo "Current \$AWS_PROFILE: $AWS_PROFILE"
    fi
fi