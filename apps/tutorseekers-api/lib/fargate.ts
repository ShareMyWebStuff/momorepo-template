import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
// import * as iam from 'aws-cdk-lib/aws-iam';
// import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as rds from 'aws-cdk-lib/aws-rds';
// import * as s3 from 'aws-cdk-lib/aws-s3';
import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import {BuildConfig} from './build-config'
import { DefaultInstanceTenancy } from 'aws-cdk-lib/aws-ec2';
import { StorageType } from 'aws-cdk-lib/aws-rds';

import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import {readFileSync} from 'fs';


// 
// https://awstip.com/aws-lambda-access-to-rds-mysql-architecture-pattern-4e41e4ff4331
// 

export class VPCStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: cdk.StackProps, buildConfig: BuildConfig) {
    super(scope, id, props);

    // IAM inline role - the service principal is required
    const taskRole = new iam.Role(this, "fargate-test-task-role", {
      assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com")
    });

    // Define a fargate task with the newly created execution and task roles
    const taskDefinition = new ecs.FargateTaskDefinition(
      this,
      "fargate-task-definition",
      {
        taskRole: taskRole,
        executionRole: taskRole
      }
    );

    // Import a local docker image and set up logger
    const container = taskDefinition.addContainer(
      "fargate-test-task-container",
      {
        image: ecs.ContainerImage.fromRegistry(
          "<insert-registry-link>"
        ),
        logging: new ecs.AwsLogDriver({
          streamPrefix: "fargate-test-task-log-prefix"
        })
      }
    );

    container.addPortMappings({
      containerPort: 80,
      hostPort: 80,
      protocol: ecs.Protocol.TCP
    });

    // NOTE: I've been creating a new VPC in us-east-2 (Ohio) to keep it clean, so se that at the top in stackProps
    // Create a vpc to hold everything - this creates a brand new vpc
    // Remove this if you are using us-east-1 and the existing non-prod vpc as commented out below
    const vpc = new ec2.Vpc(this, "fargate-test-task-vpc", {
      maxAzs: 2,
      natGateways: 1
    });

    // Create the cluster
    const cluster = new ecs.Cluster(this, "fargate-test-task-cluster", { vpc });

    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "MyFargateService",
      {
        cluster: cluster, // Required
        cpu: 512, // Default is 256
        desiredCount: 2, // Default is 1
        taskDefinition: taskDefinition,
        memoryLimitMiB: 2048, // Default is 512
        publicLoadBalancer: true // Default is false
      }
    );
  }
}
