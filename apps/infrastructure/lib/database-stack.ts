import * as cdk from 'aws-cdk-lib';
import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { SubnetType, Peer, Port, SecurityGroup, InstanceType } from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';


import * as path from 'path';
import {BuildConfig, Stage} from './build-config'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';

/**
 * NEED TO DEFINE THE props TYPESCRIPT types.
 */

export class DatabaseDeployStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps, buildConfig: BuildConfig) {
    super(scope, id, props);

    // const vpc = Vpc.fromLookup(this, buildConfig.Prefix + '-' + buildConfig.Environment + '-vpc-lookup', {
    //   vpcName: buildConfig.Prefix + '-' + buildConfig.Environment + '-vpc',
    // })


    // Check if this is a prod environment
    const isProd = buildConfig.Environment === 'prd'

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
      vpc: buildConfig.vpc!,
      removalPolicy: RemovalPolicy.DESTROY,
      vpcSubnets: {
        // subnets: buildConfig.vpc!.isolatedSubnets,
        // subnets: buildConfig.vpc!.selectSubnets({,
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
        instanceType: new InstanceType('serverless'),
        vpc: buildConfig.vpc!,
        vpcSubnets: {
          subnetType: SubnetType.PRIVATE_ISOLATED,
        },
        autoMinorVersionUpgrade: true,
        publiclyAccessible: false,
        securityGroups: [buildConfig.databaseSG[buildConfig.EnvironmentId]],
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
      subnetGroup: dbSubnetGroup,
      port: 3306
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
      vpc: buildConfig.vpc!,
      debugLogging: true,                 // false for production
      requireTLS: true,
      securityGroups: [buildConfig.databaseSG[buildConfig.EnvironmentId]]
    });

  
    const deployDatabaseChangesetLambda = new NodejsFunction ( this, buildConfig.Prefix + '-' + buildConfig.Environment + '-deploy-database-changeset', {
      entry: './lambda/deploy-database-changeset/index.ts',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'main',
      bundling: {
        externalModules: [ 'aws-sdk', 'mysql2' ],
        minify: false
      },
      environment: {
        DATABASE_SECRET_ARN: databaseCredentialsSecret.secretArn,
        DEPLOY_BUCKET_NAME: buildConfig.deployBucket[buildConfig.EnvironmentId].bucketName
      }
    } );

    dbCluster.secret?.grantRead(deployDatabaseChangesetLambda);

  }

}
