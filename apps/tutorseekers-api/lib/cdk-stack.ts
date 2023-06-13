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

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps, buildConfig: BuildConfig) {
    super(scope, id, props);

    const vpcName = buildConfig.Prefix + '-' + buildConfig.Environment+'-vpc'

    // Create ECR repository
    const repository = new ecr.Repository(this, "tutorseekers-api-dev", {
      repositoryName: "tutorseekers-dev"
    });

    // defines your stack here
    const api = new apigateway.RestApi(this, 'api', {
      description: 'example api gateway',
      deployOptions: {
          stageName: 'dev',
      },
      // 👇 enable CORS
      defaultCorsPreflightOptions: {
          allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
          ],
          allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
          allowCredentials: true,
          allowOrigins: ['http://localhost:3000'],
      },
      });
  
      // 👇 create an Output for the API URL
      new cdk.CfnOutput(this, 'apiUrl', { value: api.url });
  
      // 👇 define GET todos function
      const getTodosLambda = new lambda.Function(this, 'get-todos-lambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.main',
      code: lambda.Code.fromAsset(path.join(__dirname, '/../src/get-todos')),
      });
  
      // 👇 add a /todos resource
      const todos = api.root.addResource('todos');
  
      // 👇 integrate GET /todos with getTodosLambda
      todos.addMethod(
      'GET',
      new apigateway.LambdaIntegration(getTodosLambda, { proxy: true })
      );
  }

}
