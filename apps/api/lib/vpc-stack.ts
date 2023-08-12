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

    const isProd = buildConfig.Environment === 'prod'

    // 
    // Create VPC
    // 
    // Creates a VPC called 
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

    // databaseSG.connections.allowFrom(
    //   new ec2.Connections({
    //     securityGroups: [frontEndSG, lambdaSG, databaseSG],
    //   }),
    //   ec2.Port.tcp(3306),
    //   'allow traffic on port 3306 from the front end and lambda security groups',
    // );

    databaseSG.addIngressRule(
      lambdaSG,
      ec2.Port.tcp(3306),
      // ec2.Port.tcp(5432),
      'allow inbound traffic from anywhere to the db on port 5432',
    );

    // Create password for the database
    const secret = new secretsmanager.Secret(this, 'DB Secret');
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

    // Create Aurora DB Engine
    // const dbEngine = rds.DatabaseClusterEngine.auroraMysql({ version: rds.AuroraMysqlEngineVersion.VER_3_01_0 })
    const dbEngine = rds.DatabaseClusterEngine.auroraMysql({ version: rds.AuroraMysqlEngineVersion.VER_3_03_0 })
    

    // Create Aurora secret
    const databaseCredentialsSecret = new secretsmanager.Secret(this, 'DBCredentialsSecret', {
      secretName: buildConfig.Prefix + '-' + buildConfig.Environment + '-db-credentials',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          username: 'hereitis',
        }),
        excludePunctuation: true,
        includeSpace: false,
        generateStringKey: 'password',
      },
    })

    const parameterGroupForInstance = new rds.ParameterGroup(
      this,
      buildConfig.Prefix + '-' + buildConfig.Environment + '-db-parameter-group',
      {
        engine: dbEngine,
        description: `Aurora RDS Instance Parameter Group for database ${buildConfig.Prefix + '-' + buildConfig.Environment + '-db-parameter-group'}`,
        parameters: {
          log_bin_trust_function_creators: '1',
        },
      },
    )


    const dbSubnetGroup = new rds.SubnetGroup(this, buildConfig.Prefix + '-' + buildConfig.Environment + '-db-subnet-group', {
      description: `Aurora RDS Subnet Group for database ${buildConfig.Prefix + '-' + buildConfig.Environment + '-db-subnet-group'}`,
      subnetGroupName: 'aurora-rds-subnet-group',
      vpc,
      removalPolicy: RemovalPolicy.DESTROY,
      vpcSubnets: {
        subnets: vpc.isolatedSubnets,
      },
    })

    /**
     * Create the aurora database cluster
     * 
     * Production
     *  backup every day
     *   
     * Development
     *   no backup
     * 
     */
    const dbCluster = new rds.DatabaseCluster(this, buildConfig.Prefix + '-' + buildConfig.Environment + '-db-cluster', {
      engine: dbEngine,
      instanceProps: {
        instanceType: new ec2.InstanceType('serverless'),
        vpc: vpc,
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
        autoMinorVersionUpgrade: true,
        publiclyAccessible: true,
        securityGroups: [databaseSG],
        parameterGroup: parameterGroupForInstance,
      },
      backup: {
        retention: Duration.days(RetentionDays.ONE_WEEK),
        preferredWindow: '03:00-04:00',
      },
      credentials: {
        username: 'hereitis',
        password: databaseCredentialsSecret.secretValueFromJson('password'),
      },
      instances: 1,
      cloudwatchLogsRetention: RetentionDays.ONE_WEEK,
      defaultDatabaseName: 'tutors',
      iamAuthentication: false,
      clusterIdentifier: buildConfig.Prefix + '-' + buildConfig.Environment + '-db-cluster-id',
      subnetGroup: dbSubnetGroup
    });

    /**
     * Create the scaling rules of the Aurora Serverless cluster
     */
    cdk.Aspects.of(dbCluster).add({
      visit(node) {
        if (node instanceof rds.CfnDBCluster) {
          node.serverlessV2ScalingConfiguration = {
            minCapacity: 0.5, // min capacity is 0.5 vCPU
            maxCapacity: 1, // max capacity is 1 vCPU (default)
          }
        }
      },
    })

    /**
     * Create DB Proxy
     */
    const dbProxy = dbCluster.addProxy(buildConfig.Prefix + '-' + buildConfig.Environment+'-db-proxy', {
      dbProxyName: buildConfig.Prefix + '-' + buildConfig.Environment+'-db-proxy',
      borrowTimeout: Duration.seconds(30),
      maxConnectionsPercent: 50,
      secrets: [databaseCredentialsSecret],
      vpc,
      debugLogging: true,                 // false for production
      requireTLS: true,
      securityGroups: [databaseSG]
    });

    const webserverRoleName = buildConfig.Prefix + "-" + buildConfig.Environment + '-public-role' 
    const webserverRole = new iam.Role(this, webserverRoleName, {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess'),
      ],
    });

    const databaseEC2 = buildConfig.Prefix + "-" + buildConfig.Environment + '-database-ec2' 

    /**
     * Create the EC2 instance for connecting to database as bastion host
     */
    const ec2Instance = new ec2.Instance(this, databaseEC2, {
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      role: webserverRole,
      securityGroup: frontEndSG,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE2,
        ec2.InstanceSize.MICRO,
      ),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      keyName: 'TutorSeekers-co-uk-kp',
    });

    // 👇 load user data script
    const userDataScript = readFileSync('./lib/user-data.sh', 'utf8');
    // 👇 add user data to the EC2 instance
    ec2Instance.addUserData(userDataScript);

    // 
    // Create the stacks output
    // 



    // const fn = new NodejsFunction(this, 'Lambda', {
    //   entry: './lambda/index.ts',
    //   runtime: lambda.Runtime.NODEJS_16_X,
    //   handler: 'main',
    //   bundling: {
    //     externalModules: ['aws-sdk', 'pg-native'],
    //     minify: false,
    //   },
    //   environment: {
    //     databaseSecretArn: dbCluster.secret?.secretArn ?? '', // pass the secret arn to the lambda function
    //   },
    // })
    
    // // allow the lambda function to access credentials stored in AWS Secrets Manager
    // // the lambda function will be able to access the credentials for the default database in the db cluster
    // dbCluster.secret?.grantRead(fn)

    // const api = new LambdaRestApi(this, 'Api', {
    //   handler: fn,
    // })

    // // Create the Aurora 
    // const dbCluster = new rds.DatabaseCluster(this, 'DbCluster', {
    //   engine: rds.DatabaseClusterEngine.auroraPostgres({
    //     version: rds.AuroraPostgresEngineVersion.VER_13_6,
    //   }),
    //   instances: 1,
    //   instanceProps: {
    //     vpc: vpc,
    //     instanceType: new ec2.InstanceType('serverless'),
    //     autoMinorVersionUpgrade: true,
    //     publiclyAccessible: true,
    //     securityGroups: [databaseSG],
    //     vpcSubnets: vpc.selectSubnets({
    //       subnetType: ec2.SubnetType.PUBLIC, // use the public subnet created above for the db
    //     }),
    //   },
    //   port: 5432, // use port 5432 instead of 3306
    // })

    // cdk.Aspects.of(dbCluster).add({
    //   visit(node) {
    //     if (node instanceof rds.CfnDBCluster) {
    //       node.serverlessV2ScalingConfiguration = {
    //         minCapacity: 0.5, // min capacity is 0.5 vCPU
    //         maxCapacity: 1, // max capacity is 1 vCPU (default)
    //       }
    //     }
    //   },
    // })  

    // 
    // VPC Stack outputs
    // 
    
    // VPC
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

    // // Database secret manager
    // new cdk.CfnOutput(this, 'Secret Name', { value: databaseCredentialsSecret.secretName }); 
    // new cdk.CfnOutput(this, 'Secret ARN', { value: databaseCredentialsSecret.secretArn }); 
    // new cdk.CfnOutput(this, 'Secret Full ARN', { value: databaseCredentialsSecret.secretFullArn || '' });

    // lets output a few properties to help use find the credentials 
    // new cdk.CfnOutput(this, 'Secret Name', { value: databaseCredentialsSecret.secretName }); 
    // new cdk.CfnOutput(this, 'Secret ARN', { value: databaseCredentialsSecret.secretArn }); 
    // new cdk.CfnOutput(this, 'Secret Full ARN', { value: databaseCredentialsSecret.secretFullArn || '' });
    // new cdk.CfnOutput(this, 'dbEndpoint', { value: dbCluster.instanceEndpoint.hostname, });

    // Database 
    // exportName = buildConfig.Prefix + '-' + buildConfig.Environment+'-db-arn'
    // new cdk.CfnOutput(this, exportName, { value: dbCluster.clusterEndpoint, exportName }); 

    // Database Proxy
    // exportName = buildConfig.Prefix + '-' + buildConfig.Environment+'-db-proxy-arn'
    // new cdk.CfnOutput(this, exportName, { value: dbProxy.dbProxyArn, exportName });
    // exportName = buildConfig.Prefix + '-' + buildConfig.Environment+'-db-proxy-name'
    // new cdk.CfnOutput(this, exportName, { value: dbProxy.dbProxyName, exportName });
    // exportName = buildConfig.Prefix + '-' + buildConfig.Environment+'-db-proxy-end-point'
    // new cdk.CfnOutput(this, exportName, { value: dbProxy.endpoint, exportName });

    // // Private bucket arn
    // exportName = buildConfig.Prefix + "-" + buildConfig.Environment + '-database-ec2-public-ip' 
    // new cdk.CfnOutput(this, exportName, { value: ec2Instance.instancePublicIp, exportName }); 
    

  }
}
