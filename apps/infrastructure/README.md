# Infrastructure

This creates the base infrastructure for the tutorseekers project.

1. Create a bucket for the database stuff
2. Copy the database stuff to the bucket
3. Create a lambda function that reads the database stuff from the bucket and creates the database
4. Check lambda can be executed from a GHA


CREATE LAMBDA FUNCTION - console.log ("HELLO")

RUN FUNCTION FROM GHA




# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


npx ts-jest config:init

turbo test --filter tutorseeker-api

