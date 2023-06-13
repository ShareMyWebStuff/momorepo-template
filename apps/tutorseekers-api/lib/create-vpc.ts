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

    const isProd = buildConfig.Environment === 'prd'

    // 
    // Create VPC
    // 

    // Create a VPC
    // Need atleast  2 AZs - the database will need 2
    // Should have the same number of NATS as AZ - but can use one to keep the costs down

    // May need a different cidr per project and environment - 10.1.0.0/16
    // maxAzs 2
    const vpcName = buildConfig.Prefix + '-' + buildConfig.Environment + '-vpc'
    const vpc = new ec2.Vpc(this, vpcName, {
      vpcName,
      // cidr: '10.1.0.0/16',
      ipAddresses: ec2.IpAddresses.cidr('10.1.0.0/16'),
      defaultInstanceTenancy: DefaultInstanceTenancy.DEFAULT,
      maxAzs: 2,
      // natGateways: 1,
      subnetConfiguration: [
        {
          name: buildConfig.Prefix + '-' + buildConfig.Environment + '-public',
          cidrMask: 24,
          subnetType: ec2.SubnetType.PUBLIC
        },
        {
          name: buildConfig.Prefix + '-' + buildConfig.Environment + '-lambda',
          cidrMask: 24,
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED
        },
        {
          name: buildConfig.Prefix + '-' + buildConfig.Environment + '-database',
          cidrMask: 24,
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED
        },
      ],
      natGateways: 0,// May ned to put this to 1 later
      // natGateways: 1,
      // maxAzs: 3,
      // subnetConfiguration: [
      //   {
      //     name: 'private-subnet-1',
      //     subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      //     cidrMask: 24,
      //   },
      //   {
      //     name: 'public-subnet-1',
      //     subnetType: ec2.SubnetType.PUBLIC,
      //     cidrMask: 24,
      //   },
      //   {
      //     name: 'isolated-subnet-1',
      //     subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      //     cidrMask: 28,
      //   },
      // ],
    });


    // 
    // Create the Security Groups
    // 


    // Create the public security group
    const frontEndSG = new ec2.SecurityGroup(this, buildConfig.Prefix + '-' + buildConfig.Environment + '-front-end-sg', {
      securityGroupName: buildConfig.Prefix + '-' + buildConfig.Environment + '-front-end-sg',
      vpc,
      allowAllOutbound: true,
      description: 'security group for a web server',
    });
    cdk.Tags.of(frontEndSG).add('Name', buildConfig.Prefix + '-' + buildConfig.Environment + '-front-end-sg');
    cdk.Tags.of(frontEndSG).add('Site', buildConfig.Prefix);
    cdk.Tags.of(frontEndSG).add('Environment', buildConfig.Environment);

    frontEndSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'allow HTTP access from anywhere',
    );

    frontEndSG.addIngressRule(
      ec2.Peer.anyIpv6(),
      ec2.Port.tcp(80),
      'allow HTTP access from anywhere',
    );

    frontEndSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'allow SSH access from anywhere',
    );

    // Create the lambda security group
    const lambdaSG = new ec2.SecurityGroup(this, buildConfig.Prefix + '-' + buildConfig.Environment + '-lambda-sg', {
      securityGroupName: buildConfig.Prefix + '-' + buildConfig.Environment + '-lambda-sg',
      vpc,
      allowAllOutbound: true,
      description: 'security group for lambda functions',
    });
    cdk.Tags.of(lambdaSG).add('Name', buildConfig.Prefix + '-' + buildConfig.Environment + '-lambda-sg');
    cdk.Tags.of(lambdaSG).add('Site', buildConfig.Prefix);
    cdk.Tags.of(lambdaSG).add('Environment', buildConfig.Environment);

    // Create the database security group
    const databaseSG = new ec2.SecurityGroup(this, buildConfig.Prefix + '-' + buildConfig.Environment + '-database-sg', {
      securityGroupName: buildConfig.Prefix + '-' + buildConfig.Environment + '-database-sg',
      vpc,
      allowAllOutbound: true,
      description: 'security group for the database',
    });
    cdk.Tags.of(databaseSG).add('Name', buildConfig.Prefix + '-' + buildConfig.Environment + '-database-sg');
    cdk.Tags.of(databaseSG).add('Site', buildConfig.Prefix);
    cdk.Tags.of(databaseSG).add('Environment', buildConfig.Environment);


    databaseSG.addIngressRule(
      lambdaSG,
      ec2.Port.tcp(3306),
      // ec2.Port.tcp(5432),
      'allow inbound traffic from anywhere to the db on port 5432',
    );

    // Create password for the database
    databaseSG.addIngressRule(
      frontEndSG,
      ec2.Port.tcp(3306),
      'allow HTTP access from anywhere',
    );

    databaseSG.addIngressRule(
      databaseSG,
      ec2.Port.tcp(3306),
      'allow HTTP access from anywhere',
    );

    databaseSG.addIngressRule(
      lambdaSG,
      ec2.Port.tcp(3306),
      'allow HTTP access from anywhere',
    );

    // // VPC
    let exportName = buildConfig.Prefix + '-' + buildConfig.Environment+'-vpc-arn'
    new cdk.CfnOutput(this, exportName, { value: vpc.vpcArn, exportName }); 
    exportName = buildConfig.Prefix + '-' + buildConfig.Environment+'-vpc-id'
    new cdk.CfnOutput(this, exportName, { value: vpc.vpcId, exportName });

    // Security Groups
    exportName = buildConfig.Prefix + '-' + buildConfig.Environment+'-public-sg-id'
    new cdk.CfnOutput(this, exportName, { value: frontEndSG.securityGroupId, exportName });
    exportName = buildConfig.Prefix + '-' + buildConfig.Environment+'-lambda-sg-id'
    new cdk.CfnOutput(this, exportName, { value: lambdaSG.securityGroupId, exportName });
    exportName = buildConfig.Prefix + '-' + buildConfig.Environment+'-database-sg-id'
    new cdk.CfnOutput(this, exportName, { value: databaseSG.securityGroupId, exportName });

  }
}
