import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as path from 'path';
import {BuildConfig} from './build-config'

/**
 * NEED TO DEFINE THE props TYPESCRIPT types.
 */

export class DatabaseDeployStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps, buildConfig: BuildConfig) {
    super(scope, id, props);

    const vpcName = buildConfig.Prefix + '-' + buildConfig.Environment+'-vpc'

      // 👇 define GET todos function
      const getTodosLambda = new lambda.Function(this, 'deploy-database-changeset', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.main',
      code: lambda.Code.fromAsset(path.join(__dirname, '/../src/deploy-database-changeset')),
      });
  
  }

}
