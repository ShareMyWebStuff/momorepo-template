import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {BuildConfig} from './build-config'
import * as cm from 'aws-cdk-lib/aws-certificatemanager';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { ApiGatewayDomain } from 'aws-cdk-lib/aws-route53-targets';
import { BucketType, createBucket } from '../helper/s3';
import { createCloudfront } from '../helper/cloudfront';

export class BaseInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, buildConfig: BuildConfig, props?: cdk.StackProps) {
    super(scope, id, props);

    // Get the hosted zone
    buildConfig.hostedZone = HostedZone.fromLookup(this, "HostedZone lookup", {
      domainName: buildConfig.DomainName
    })

    // The us-east-1 certificate
    buildConfig.cloudfrontCert = cm.Certificate.fromCertificateArn(
      this,
      "Cloudfront Certificate",
      buildConfig.CertificateARN
    );

    // Create the certificate
    const certificate = new cm.Certificate (this, "Certificate", {
      certificateName: buildConfig.Prefix + '-certificate',
      domainName: buildConfig.DomainName,
      subjectAlternativeNames: [`*.${buildConfig.DomainName}`],
      validation: cm.CertificateValidation.fromDns(buildConfig.hostedZone),
    })


    // Create the subdomains
    const devApiDomain = new cdk.aws_apigateway.DomainName(this, buildConfig.Prefix  + '-domain-api-dev', {
      domainName: 'api-dev.' + buildConfig.DomainName,
      certificate,
      endpointType: cdk.aws_apigateway.EndpointType.REGIONAL,
      securityPolicy: cdk.aws_apigateway.SecurityPolicy.TLS_1_2,
    })
    
    const stgApiDomain = new cdk.aws_apigateway.DomainName(this, buildConfig.Prefix + '-domain-api-stg', {
      domainName: 'api-stg.' + buildConfig.DomainName,
      certificate,
      endpointType: cdk.aws_apigateway.EndpointType.REGIONAL,
      securityPolicy: cdk.aws_apigateway.SecurityPolicy.TLS_1_2,
    })
    
    const prdApiDomain = new cdk.aws_apigateway.DomainName(this, buildConfig.Prefix + '-domain-api-prd', {
      domainName: 'api.' + buildConfig.DomainName,
      certificate,
      endpointType: cdk.aws_apigateway.EndpointType.REGIONAL,
      securityPolicy: cdk.aws_apigateway.SecurityPolicy.TLS_1_2,
    })
    
    const devApiDomainRS = new cdk.aws_route53.ARecord(this, buildConfig.Prefix + '-api-dev-route53', {
      zone: buildConfig.hostedZone,
      recordName: 'api-dev.' + buildConfig.DomainName, // devApiDomain.domainName,
      target: cdk.aws_route53.RecordTarget.fromAlias(new ApiGatewayDomain(devApiDomain))
    })
    
    const stgApiDomainRS = new cdk.aws_route53.ARecord(this, buildConfig.Prefix + '-api-stg-route53', {
      zone: buildConfig.hostedZone,
      recordName: 'api-stg.' + buildConfig.DomainName, // stgApiDomain.domainName,
      target: cdk.aws_route53.RecordTarget.fromAlias(new ApiGatewayDomain(stgApiDomain))
    })
    
    const prdApiDomainRS = new cdk.aws_route53.ARecord(this, buildConfig.Prefix + '-api-prd-route53', {
      zone: buildConfig.hostedZone,
      recordName: 'api.' + buildConfig.DomainName, // prdApiDomain.domainName,
      target: cdk.aws_route53.RecordTarget.fromAlias(new ApiGatewayDomain(prdApiDomain))
    })
    
    //  Create buckets
    const devPublicUploadBucket = createBucket (this, BucketType.CLOUDFRONT_HOSTING, buildConfig.Prefix + "-dev-upload", buildConfig )
    const devPrivateUploadBucket = createBucket (this, BucketType.CLOUDFRONT_HOSTING, buildConfig.Prefix + "-dev-upload-private", buildConfig )

    const stgPublicUploadBucket = createBucket (this, BucketType.CLOUDFRONT_HOSTING, buildConfig.Prefix + "-stg-upload", buildConfig )
    const stgPrivateUploadBucket = createBucket (this, BucketType.CLOUDFRONT_HOSTING, buildConfig.Prefix + "-stg-upload-private", buildConfig )


    const prdPublicUploadBucket = createBucket (this, BucketType.CLOUDFRONT_HOSTING, buildConfig.Prefix + "-upload", buildConfig )
    const prdPrivateUploadBucket = createBucket (this, BucketType.CLOUDFRONT_HOSTING, buildConfig.Prefix + "-upload-private", buildConfig )

    // Deployment bucket
    buildConfig.cfDevBucket = createBucket (this, BucketType.CLOUDFRONT_HOSTING, buildConfig.Prefix + "-cf-dev", buildConfig )
    buildConfig.cfStgBucket = createBucket (this, BucketType.CLOUDFRONT_HOSTING, buildConfig.Prefix + "-cf-stg", buildConfig )
    buildConfig.cfPrdBucket = createBucket (this, BucketType.CLOUDFRONT_HOSTING, buildConfig.Prefix + "-cf-prd", buildConfig )

    const cfDevDist = createCloudfront (this, buildConfig, 'dev')
    const cfStgDist = createCloudfront (this, buildConfig, 'stg')
    const cfPrdDist = createCloudfront (this, buildConfig, 'prd')

    // Stack outputs
    // - Certificate ARN
    let exportName = buildConfig.Prefix + '-cert-arn'
    new cdk.CfnOutput(this, exportName, { value: certificate.certificateArn, exportName }); 

    // Cloudfront distributuion
    exportName = buildConfig.Prefix + '-cf-dev-dist-id'
    new cdk.CfnOutput(this, exportName, { value: cfDevDist.distributionId, exportName });
    exportName = buildConfig.Prefix + '-cf-dev-dist-domain-name'
    new cdk.CfnOutput(this, exportName, { value: cfDevDist.distributionDomainName, exportName });

    exportName = buildConfig.Prefix + '-cf-stg-dist-id'
    new cdk.CfnOutput(this, exportName, { value: cfStgDist.distributionId, exportName });
    exportName = buildConfig.Prefix + '-cf-stg-dist-domain-name'
    new cdk.CfnOutput(this, exportName, { value: cfStgDist.distributionDomainName, exportName });

    exportName = buildConfig.Prefix + '-cf-prd-dist-id'
    new cdk.CfnOutput(this, exportName, { value: cfPrdDist.distributionId, exportName });
    exportName = buildConfig.Prefix + '-cf-prd-dist-domain-name'
    new cdk.CfnOutput(this, exportName, { value: cfPrdDist.distributionDomainName, exportName });

    exportName = buildConfig.Prefix + "-cf-bucket-dev-name" 
    new cdk.CfnOutput(this, exportName, { value: buildConfig.cfDevBucket.bucketName, exportName }); 
    exportName = buildConfig.Prefix + "-cf-bucket-dev-arn" 
    new cdk.CfnOutput(this, exportName, { value: buildConfig.cfDevBucket.bucketArn, exportName }); 

    exportName = buildConfig.Prefix + "-cf-bucket-stg-name" 
    new cdk.CfnOutput(this, exportName, { value: buildConfig.cfStgBucket.bucketName, exportName }); 
    exportName = buildConfig.Prefix + "-cf-bucket-stg-arn" 
    new cdk.CfnOutput(this, exportName, { value: buildConfig.cfStgBucket.bucketArn, exportName }); 

    exportName = buildConfig.Prefix + "-cf-bucket-prd-name" 
    new cdk.CfnOutput(this, exportName, { value: buildConfig.cfPrdBucket.bucketName, exportName }); 
    exportName = buildConfig.Prefix + "-cf-bucket-prd-arn" 
    new cdk.CfnOutput(this, exportName, { value: buildConfig.cfPrdBucket.bucketArn, exportName }); 

  }
}
