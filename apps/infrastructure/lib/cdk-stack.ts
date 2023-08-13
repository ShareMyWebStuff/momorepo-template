import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as path from 'path';
import {BuildConfig} from './build-config'

/**
 * NEED TO DEFINE THE props TYPESCRIPT types.
 */

export class DatabaseDeployStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps, buildConfig: BuildConfig) {
    super(scope, id, props);

    const deploymentBucketName = buildConfig.Prefix + "-deployment"
    const deploymentBucket = new s3.Bucket(this, deploymentBucketName, {
      bucketName: deploymentBucketName,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      versioned: false,
      publicReadAccess: false,
      encryption: s3.BucketEncryption.S3_MANAGED,
      cors: [
        {
          allowedMethods: [
            s3.HttpMethods.GET,
            s3.HttpMethods.POST,
            s3.HttpMethods.PUT,
            s3.HttpMethods.DELETE,
          ],
          allowedOrigins: [buildConfig.CorsServer, `https://${buildConfig.DomainName}`],
          // allowedOrigins: ['http://localhost:3000'],
          allowedHeaders: ['*'],
        },
      ],
    });

    let exportName = buildConfig.Prefix + "-database-deployment-bucket-name" 
    new cdk.CfnOutput(this, exportName, { value: deploymentBucket.bucketName, exportName }); 

    // const vpcName = buildConfig.Prefix + '-' + buildConfig.Environment+'-vpc'

    // 👇 define deploy database changeset
    const deployDatabaseChangesetLambda = new lambda.Function(this, buildConfig.Prefix + '-' + buildConfig.Environment + '-deploy-database-changeset', {
    runtime: lambda.Runtime.NODEJS_16_X,
    handler: 'index.main',
    functionName: buildConfig.Prefix + '-' + buildConfig.Environment + '-deploy-database-changeset',
    code: lambda.Code.fromAsset(path.join(__dirname, '/lambda/deploy-database-changeset')),
    });
  
  }

}
