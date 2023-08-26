#!/usr/bin/env node
// import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as yaml from 'js-yaml'
import {BuildConfig, Stage} from '../lib/build-config'
import * as fs from 'fs'
import * as path from 'path'
import * as s3 from 'aws-cdk-lib/aws-s3';

// import { CdkStack } from '../lib/cdk-stack';
import { SetupStack } from '../lib/setup-stack';
import { DatabaseDeployStack } from '../lib/database-stack';
// import { VPCStack } from '../lib/create-vpc';



// https://www.rehanvdm.com/blog/4-methods-to-configure-multiple-environments-in-the-aws-cdk
// import {BuildConfig } from '../lib/build-config';

const app = new cdk.App();

console.log ('App')
console.log (app)
console.log ('Config get context')
console.log (app.node.tryGetContext('setup'))
console.log ('Dev get context')
console.log (app.node.tryGetContext('env'))

const ensureString: (object: { [name: string]: any }, propName: string)=>string = (object, propName) => {
  if (!object[propName] || object[propName].trim().length === 0){
    throw new Error(propName + ' does not exist or is empty')
  }
  return object[propName]
}


/**
 * Sets up the build config
 * 
 * @returns 
 */
const getConfig = () => {
  let environmentId: number;

  // Check the config parameter is set
  // let setup = app.node.tryGetContext('setup')
  let env = app.node.tryGetContext('env')
  console.log ('Env')
  console.log (env)

  // Only allow the env to be set
  if (!env || ( ['dev', 'stg', 'prd'].includes(env))){
    throw new Error("Need to pass in `-c env=dev|stg|prd`")
    process.exit(1)
  } 

  // 
  // if (( !setup && !env ) || (setup && ['dev', 'stg', 'prd'].includes(env))){
  //   throw new Error("Need to pass in either `-c setup=true` or `-c env=dev|stg|prd`")
  //   process.exit(1)
  // } 

  switch (env){
    case'dev': 
      environmentId = Stage.Dev;
      break;
    case'stg': 
      environmentId = Stage.Stage;
      break;
    case'prd': 
      environmentId = Stage.Production;
      break;
    default:
      // Should never be reached
      environmentId = Stage.Dev;
  }

  let unparsedEnv = yaml.load(fs.readFileSync(path.resolve("./config/"+(!env?'setup':env)+'.yaml'), "utf8"))
  console.log (JSON.stringify(unparsedEnv))

  let buildConfig: BuildConfig = {
    hostedZone: null,
    cloudfrontCert: null,
    cfDevBucket: null,
    cfStgBucket: null,
    cfPrdBucket: null,
    databaseSG: [],
    lambdaSG: [],
    frontendSG: [],
    deployBucket: [],

    vpc: null,
    CertificateARN: ensureString(unparsedEnv as object, 'CertificateARN'),
    // RunSetup: (!setup ? false: true),
    Environment: env,
    EnvironmentId: environmentId,

    AWSAccountID: ensureString(unparsedEnv as object, 'AWSAccountID'),
    AWSProfileName: ensureString(unparsedEnv as object, 'AWSProfileName'),
    AWSProfileRegion: ensureString(unparsedEnv as object, 'AWSProfileRegion'),

    App: ensureString(unparsedEnv as object, 'App'),
    Prefix: ensureString(unparsedEnv as object, 'Prefix'),

    CorsServer: ensureString(unparsedEnv as object, 'CorsServer'),
    ApiDomainName: ensureString(unparsedEnv as object, 'ApiDomainName'),
    DomainName: ensureString(unparsedEnv as object, 'DomainName')
  }

  console.log ('buildConfig')
  console.log (buildConfig)

  return buildConfig
}

const main = async () => {
  let buildConfig: BuildConfig = getConfig();

  cdk.Tags.of(app).add('App', buildConfig.App)

  const stackProps: cdk.StackProps = {
    env: {
      region: buildConfig.AWSProfileRegion,
      account: buildConfig.AWSAccountID,
    },
  };

  // Check is setup has been run if environment is set
  // const a =  s3.Bucket.fromBucketName(app, buildConfig.Prefix + '-dev-upload-private', buildConfig.Prefix + '-dev-upload-private)

  // Create initial stack of items we need for all environments
  // if ( buildConfig.RunSetup){
  let initialStackName = buildConfig.Prefix + '-setup'
  const mainStack = new SetupStack( app, initialStackName, buildConfig, stackProps)
  // }

  if ( ['dev', 'stg', 'prd'].includes(buildConfig.Environment) ){
    let initialStackName = buildConfig.Prefix + "-" + buildConfig.Environment + '-database-deployment'
    const mainStack = new DatabaseDeployStack( app, initialStackName, stackProps, buildConfig)
  }



  // // Create VPC
  // let vpcStackName = buildConfig.Prefix + '-' + buildConfig.Environment + '-vpc'
  // const mainStack = new CdkStack( app, vpcStackName, stackProps, buildConfig)


  // Create initial stack of items we need for all environments
  // if ( buildConfig.RunSetup){
  //   let initialStackName = buildConfig.Prefix + '-' + '-setup'
  //   const mainStack = new SetupStack( {...app }, initialStackName, stackProps, buildConfig)
  // }

  // // Create VPC
  // if ( [ 'dev', 'stg', 'prd' ].includes(buildConfig.Environment) ){
  //   let vpcStackName = buildConfig.Prefix + '-' + buildConfig.Environment + '-vpc'
  //   const vpcStack = new VPCStack( app, vpcStackName, stackProps, buildConfig)
  // }
  

  // // Run Database stack
  // let databaseStackName = buildConfig.Prefix + '-' + buildConfig.Environment + '-database'
  // const databaseStack = new DatabaseStack( app, databaseStackName, stackProps, buildConfig)

  // // Run Create Upload Bucket stack
  // let uploadBucketStackName = buildConfig.Prefix + '-' + buildConfig.Environment + '-upload-bucket'
  // const uploadBucketStack = new UploadBucketStack( app, uploadBucketStackName, stackProps, buildConfig)

  // // Creates the database and database pool
  // let databaseEC2StackName = buildConfig.Prefix + '-' + buildConfig.Environment + '-database-ec2'
  // const databaseEC2Stack = new DatabaseEC2Stack( app, databaseEC2StackName, stackProps, buildConfig)

  // // Creates the roles for the assets 
  // // let rolesPermStackName = buildConfig.Prefix + '-' + buildConfig.Environment + '-roles-perms'
  // // const rolesPerm = new RolesPermStack( app, rolesPermStackName, stackProps, buildConfig)

  

  // // Creates the lambda layers and functions
  // let lambdaStackName = buildConfig.Prefix + '-' + buildConfig.Environment + '-lambda'
  // const lambdaStack = new LambdaStack( app, lambdaStackName, stackProps, buildConfig)

  // // Creates the http api gateway
  // let apiStackName = buildConfig.Prefix + '-' + buildConfig.Environment + '-api'
  // const apiStack = new ApiStack( app, apiStackName, { ...stackProps, lambdaFunctions: lambdaStack.lambdaFunctions }, buildConfig)



}

main()

// new VPCStack(app, 'VPCStack', {
//   /* If you don't specify 'env', this stack will be environment-agnostic.
//    * Account/Region-dependent features and context lookups will not work,
//    * but a single synthesized template can be deployed anywhere. */

//   /* Uncomment the next line to specialize this stack for the AWS Account
//    * and Region that are implied by the current CLI configuration. */
//   // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
//   // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

//   /* Uncomment the next line if you know exactly what Account and Region you
//    * want to deploy the stack to. */
//   // env: { account: '123456789012', region: 'us-east-1' },
//   env: { account: '659420670185', region: process.env.CDK_DEFAULT_REGION },
  
//   /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// });

// // new LambdaStack(app, 'LambdaStack', {
// //   /* If you don't specify 'env', this stack will be environment-agnostic.
// //    * Account/Region-dependent features and context lookups will not work,
// //    * but a single synthesized template can be deployed anywhere. */

// //   /* Uncomment the next line to specialize this stack for the AWS Account
// //    * and Region that are implied by the current CLI configuration. */
// //   // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
// //   // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

// //   /* Uncomment the next line if you know exactly what Account and Region you
// //    * want to deploy the stack to. */
// //   // env: { account: '123456789012', region: 'us-east-1' },
// //   env: { account: '659420670185', region: process.env.CDK_DEFAULT_REGION },
  
// //   /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// // });