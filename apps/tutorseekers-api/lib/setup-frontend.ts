import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cm from 'aws-cdk-lib/aws-certificatemanager';
import {BuildConfig} from './build-config'
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
// import * as cloudfront from "@aws-cdk-lib/aws-cloudfront";
import { ApiGatewayDomain } from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';


/**
 * Should already have a deploy bucket available
 *   deployBucketArn
 *   certificateArn
 *   
 * 
 */
export class SetupFrontendStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: cdk.StackProps, buildConfig: BuildConfig) {
    super(scope, id, props);

    // This probably will not be used in the general stack
    // const isProd = buildConfig.Environment === 'prod'

    // Get the hosted zone
    const hostedZone = HostedZone.fromLookup(this, "HostedZone", {
      domainName: buildConfig.DomainName
    })


    const importCert = cdk.Fn.importValue(buildConfig.Prefix + "-cert-arn");
    const importBkt = cdk.Fn.importValue(buildConfig.Prefix + "-deploy-arn");

    const deployBucket = s3.Bucket.fromBucketArn(this, "DeployBucket", importBkt);
    const cert = cm.Certificate.fromCertificateArn(this, "Certificate", importCert);


    console.log ('###############################################')
    console.log ('###############################################')
    console.log ('###############################################')
    console.log ('###############################################')
    console.log('importCert 👉', importCert.toString());
    console.log ('###############################################')
    console.log ('###############################################')
    console.log ('###############################################')
    console.log ('###############################################')
    console.log('importBkt 👉', importBkt.toString());
    console.log ('###############################################')
    console.log ('###############################################')
    console.log ('###############################################')
    console.log ('###############################################')

    // 👇 define GET todos function
    // const htmlMapperFn = new lambda.Function(this, 'html-mapper-dev', {
    //   // functionName: 'html-mapper-dev', 
    //   runtime: lambda.Runtime.NODEJS_16_X,
    //   handler: 'index.handler',
    //   code: lambda.Code.fromAsset(path.join(__dirname, '/src/html-mapper-fn')),
    // });

    // const poo = cdk.aws_cloudfront.FunctionDefinitionVersion.fromFunctionArn(this, 'html-mapper-dev', htmlMapperFn.functionArn);
    const wee = new cdk.aws_cloudfront.Function(
      this,
      'html-mapper-dev-wee',
      {
        functionName: 'html-mapper-dev-wee',
        code: cdk.aws_cloudfront.FunctionCode.fromFile({
          filePath: path.join(__dirname, '/src/html-mapper-fn/index.js'),
        }),
        // code: cdk.aws_cloudfront.FunctionCode.fromInline(
        //   `function handler(event) {
        //     var request = event.request;
        //     var uri = request.uri;
        //     console.log("URI: " + uri);
        //     if (uri.endsWith('/')) {
        //       request.uri += 'index.html';
        //     } else if (!uri.includes('.')) {
        //       request.uri += '/index.html';
        //     }    
        //     return request;
        //   }`)
      }
    )
    const sf = new cdk.aws_cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new cdk.aws_cloudfront_origins.S3Origin(deployBucket),
        viewerProtocolPolicy: cdk.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [
          {
            function: wee,
            eventType: cdk.aws_cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
      domainNames: [`www.${buildConfig.DomainName}`],
      certificate: cert,
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
        },
      ],
    });

    const cfRecord = new cdk.aws_route53.ARecord(this, 'AliasRecord', {
      zone: hostedZone,
      recordName: buildConfig.DomainName,
      target: cdk.aws_route53.RecordTarget.fromAlias(
        new cdk.aws_route53_targets.CloudFrontTarget(sf)
      ),
    });

    // 👇 create a new A record in Route53 to point to the CloudFront distribution
    // new cdk.aws_route53.ARecord(this, 'AliasRecord', {
    //   zone: hostedZone,
    //   recordName: buildConfig.DomainName,
    //   target: cdk.aws_route53.RecordTarget.fromAlias(
    //     new ApiGatewayDomain(sf)
    //   ),
    // });

    // // Retrieve the bucket to deploy to
    // const deployBucket = new s3.Bucket(this, "DeployBucket")
    // const cfnDeplyBucket = deployBucket.node.defaultChild as s3.CfnBucket;
    // const deployBucketArn = cfnDeplyBucket.attrArn;

    // // Retrieve the certificate
    // const hostCert = cm.Certificate (this, "Certificate" );

    // Retrieve the certificate
    // const certificate = cm.Certificate.fromLookup(this, "Certificate", buildConfig.CertificateArn)

    // const cf = new cloudfront.Distribution(this, "Distribution", {



    // // Create lambda edge function



    // export interface CreateFunctionProps {
    //   scope: Stack;
    //   functionName: string;
    //   filePath: string;
    // }
    
    // export const createFunction = (props: CreateFunctionProps): IFunction => {
    //   const { scope, functionName, filePath } = props
    
    //   return new Function(scope, 'mappingFunction', {
    //     functionName,
    //     code: FunctionCode.fromFile({
    //       filePath
    //     })
    //   })
    // }

    // // With those few components now created we can now create our CloudFront
    // // distribution
    // // This allows for our static website content to be propogated across a CDN
    // // geographically closer to our users
    // const distribution = createDistribution({
    //   scope: this,
    //   bucket,
    //   certificate,
    //   url,
    //   functionAssociation
    // })

    // export interface CreateDistributionProps {
    //   scope: Stack;
    //   bucket: IBucket;
    //   certificate: ICertificate;
    //   url: string;
    //   functionAssociation: IFunction;
    // }
    
    // export const createDistribution = (props: CreateDistributionProps): IDistribution => {
    //   const { scope, bucket, certificate, url, functionAssociation } = props
    
    //   return new Distribution(scope, 'distribution', {
    //     domainNames: [url],
    //     defaultBehavior: {
    //       origin: new S3Origin(bucket),
    //       functionAssociations: [
    //         {
    //           function: functionAssociation,
    //           eventType: FunctionEventType.VIEWER_REQUEST
    //         }
    //       ]
    //     },
    //     certificate,
    //     defaultRootObject: '/index.html',
    //     errorResponses: [
    //       {
    //         httpStatus: 404,
    //         responseHttpStatus: 404,
    //         responsePagePath: '/404.html'
    //       }
    //     ]
    //   })

    // // Create an A record entry in Route53 that points to our CloudFront distribution
    // // E.g. nextjs-serverless-static-site.tylangesmith.com ==> xyz.cloudfront.net
    // createARecordForDistribution({
    //   scope: this,
    //   hostedZone,
    //   subDomainName,
    //   distribution
    // })

    // export interface CreateARecordForDistributionProps {
    //   scope: Stack;
    //   hostedZone: IHostedZone;
    //   subDomainName: string;
    //   distribution: IDistribution;
    // }
    
    // export const createARecordForDistribution = (props: CreateARecordForDistributionProps): ARecord => {
    //   const { scope, hostedZone, subDomainName, distribution } = props
    
    //   return new ARecord(scope, 'aRecord', {
    //     target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    //     zone: hostedZone,
    //     recordName: subDomainName
    //   })
    // }

    // // Finally let's deploy our static content to our S3 bucket
    // createBucketDeployment({
    //   scope: this,
    //   bucket,
    //   distribution,
    //   filePath: './out'
    // })

    // export interface CreateBucketDeploymentProps {
    //   scope: Stack;
    //   bucket: IBucket;
    //   distribution: IDistribution;
    //   filePath: string;
    // }
    
    // export const createBucketDeployment = (props: CreateBucketDeploymentProps): BucketDeployment => {
    //   const { scope, bucket, distribution, filePath } = props
    
    //   return new BucketDeployment(scope, 'bucketDeployment', {
    //     destinationBucket: bucket,
    //     sources: [Source.asset(filePath)],
    //     distribution
    //   })
    // }






    // Stack outputs
    // - Certificate ARN
    // let exportName = buildConfig.Prefix + '-' + buildConfig.Environment+'-cert-arn'
    // new cdk.CfnOutput(this, exportName, { value: certificate.certificateArn, exportName }); 

    // // // - Api Dev Domain
    // exportName = buildConfig.Prefix + '-dev-api-domain'
    // new cdk.CfnOutput(this, exportName, { value: devApiDomain.domainNameAliasDomainName, exportName });
    // exportName = buildConfig.Prefix + '-stg-api-domain'
    // new cdk.CfnOutput(this, exportName, { value: stgApiDomain.domainNameAliasDomainName, exportName });
    // exportName = buildConfig.Prefix + '-prod-api-domain'
    // new cdk.CfnOutput(this, exportName, { value: prodApiDomain.domainNameAliasDomainName, exportName });

    // // // - Api Dev Domain Route 53 Recordset
    // exportName = buildConfig.Prefix + '-api-dev-domain-rs'
    // new cdk.CfnOutput(this, exportName, { value: devApiDomainRS.domainName, exportName });
    // exportName = buildConfig.Prefix + '-api-stg-domain-rs'
    // new cdk.CfnOutput(this, exportName, { value: stgApiDomainRS.domainName, exportName });
    // exportName = buildConfig.Prefix + '-api-prod-domain-rs'
    // new cdk.CfnOutput(this, exportName, { value: prodApiDomainRS.domainName, exportName });

    // // // Buckets
    // exportName = buildConfig.Prefix + "-dev-upload-private-name"
    // new cdk.CfnOutput(this, exportName, { value: devPrivateUploadBucket.bucketName, exportName }); 
    // exportName = buildConfig.Prefix + "-dev-upload-private-arn"
    // new cdk.CfnOutput(this, exportName, { value: devPrivateUploadBucket.bucketArn, exportName }); 

    // exportName = buildConfig.Prefix + "-dev-upload-name" 
    // new cdk.CfnOutput(this, exportName, { value: devPublicUploadBucket.bucketName, exportName }); 
    // exportName = buildConfig.Prefix + "-dev-upload-arn" 
    // new cdk.CfnOutput(this, exportName, { value: devPublicUploadBucket.bucketArn, exportName }); 

    // exportName = buildConfig.Prefix + "-stg-upload-private-name"
    // new cdk.CfnOutput(this, exportName, { value: stgPrivateUploadBucket.bucketName, exportName }); 
    // exportName = buildConfig.Prefix + "-stg-upload-private-arn"
    // new cdk.CfnOutput(this, exportName, { value: stgPrivateUploadBucket.bucketArn, exportName }); 

    // exportName = buildConfig.Prefix + "-stg-upload-name" 
    // new cdk.CfnOutput(this, exportName, { value: stgPublicUploadBucket.bucketName, exportName }); 
    // exportName = buildConfig.Prefix + "-stg-upload-arn" 
    // new cdk.CfnOutput(this, exportName, { value: stgPublicUploadBucket.bucketArn, exportName }); 

    // exportName = buildConfig.Prefix + "-prod-upload-private-name"
    // new cdk.CfnOutput(this, exportName, { value: prodPrivateUploadBucket.bucketName, exportName }); 
    // exportName = buildConfig.Prefix + "-prod-upload-private-arn"
    // new cdk.CfnOutput(this, exportName, { value: prodPrivateUploadBucket.bucketArn, exportName }); 

    // exportName = buildConfig.Prefix + "-prod-upload-name" 
    // new cdk.CfnOutput(this, exportName, { value: prodPublicUploadBucket.bucketName, exportName }); 
    // exportName = buildConfig.Prefix + "-prod-upload-arn" 
    // new cdk.CfnOutput(this, exportName, { value: prodPublicUploadBucket.bucketArn, exportName }); 
  }
}
