import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cm from 'aws-cdk-lib/aws-certificatemanager';
import {BuildConfig} from './build-config'
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { ApiGatewayDomain } from 'aws-cdk-lib/aws-route53-targets';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Peer, Port } from 'aws-cdk-lib/aws-ec2';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';

import { addSubDomain, setRoute53Alias } from '../helper/route53';
import { BucketType, createBucket } from '../helper/s3';
import { createVPC, createSecurityGroup, TSecGrpProps } from '../helper/vpc';
// import { createCloudfront } from '../helper/cloudfront';

/**
 * Creates all infrastructure that is required for the project and not for one particular environment
 */
export class SetupStack extends cdk.Stack {

  constructor(scope: Construct, id: string, buildConfig: BuildConfig, props?: cdk.StackProps) {
    super(scope, id, props);

    // Get the hosted zone
    buildConfig.hostedZone = HostedZone.fromLookup(this, "HostedZone lookup", {
      domainName: buildConfig.DomainName
    })

    // Retrieve the cloudfront certificate that was manually created
    buildConfig.cloudfrontCert = cm.Certificate.fromCertificateArn(
      this,
      "Cloudfront Certificate",
      buildConfig.CertificateARN
    );

    // Create the VPC
    // Need atleast  2 AZs - the database will need 2
    // Should have the same number of NATS as AZ - but can use one to keep the costs down
    // May need a different cidr per project and environment - 10.1.0.0/16
    // maxAzs 2
    const vpc = createVPC (this, buildConfig);

    // Create the dev security groups
    let sgEnv = 'dev';
    const devFrontendGS = createSecurityGroup(this, vpc, sgEnv, buildConfig.Prefix, {    
        secGrpName: buildConfig.Prefix + `-${sgEnv}-frontend-sg`,
        secGrpDesc: `${sgEnv} frontend security group`,
        ingress: [
          { peer: Peer.anyIpv4(), port: Port.tcp(80), description: `${sgEnv} frontend allows http access from anywhere` },
          { peer: Peer.anyIpv6(), port: Port.tcp(80), description: `${sgEnv} frontend allowsI http access from anywhere` },
          { peer: Peer.anyIpv4(), port: Port.tcp(22), description: `${sgEnv} frontend allows SSH access from anywhere` },
        ]
      } )

    const devLambdaGS = createSecurityGroup(this, vpc, sgEnv, buildConfig.Prefix, {    
      secGrpName: buildConfig.Prefix + `-${sgEnv}-lambda-sg`,
      secGrpDesc: `${sgEnv} lambda security group`,
      ingress: [ ]
    } )

    const devDatabaseGS = createSecurityGroup(this, vpc, sgEnv, buildConfig.Prefix, {    
      secGrpName: buildConfig.Prefix + `${sgEnv}-database-sg`,
      secGrpDesc: `${sgEnv} database security group`,
      ingress: [
        { peer: devLambdaGS, port: Port.tcp(3306), description: `${sgEnv} lambda access to the database group` },
        { peer: devFrontendGS, port: Port.tcp(3306), description: `${sgEnv} frontend access to the database group` },
        { peer: null, port: Port.tcp(3306), description: `${sgEnv} loop back for database group` },
      ]
    } )

    // Create the stg security groups
    sgEnv = 'stg';
    const stgFrontendGS = createSecurityGroup(this, vpc, sgEnv, buildConfig.Prefix, {    
        secGrpName: buildConfig.Prefix + `-${sgEnv}-frontend-sg`,
        secGrpDesc: `${sgEnv} frontend security group`,
        ingress: [
          { peer: Peer.anyIpv4(), port: Port.tcp(80), description: `${sgEnv} frontend allows http access from anywhere` },
          { peer: Peer.anyIpv6(), port: Port.tcp(80), description: `${sgEnv} frontend allowsI http access from anywhere` },
          { peer: Peer.anyIpv4(), port: Port.tcp(22), description: `${sgEnv} frontend allows SSH access from anywhere` },
        ]
      } )

    const stgLambdaGS = createSecurityGroup(this, vpc, sgEnv, buildConfig.Prefix, {    
      secGrpName: buildConfig.Prefix + `-${sgEnv}-lambda-sg`,
      secGrpDesc: `${sgEnv} lambda security group`,
      ingress: [ ]
    } )

    const stgDatabaseGS = createSecurityGroup(this, vpc, sgEnv, buildConfig.Prefix, {    
      secGrpName: buildConfig.Prefix + `${sgEnv}-database-sg`,
      secGrpDesc: `${sgEnv} database security group`,
      ingress: [
        { peer: devLambdaGS, port: Port.tcp(3306), description: `${sgEnv} lambda access to the database group` },
        { peer: devFrontendGS, port: Port.tcp(3306), description: `${sgEnv} frontend access to the database group` },
        { peer: null, port: Port.tcp(3306), description: `${sgEnv} loop back for database group` },
      ]
    } )

    // Create the prd security groups
    sgEnv = 'prd';
    const prdFrontendGS = createSecurityGroup(this, vpc, sgEnv, buildConfig.Prefix, {    
        secGrpName: buildConfig.Prefix + `-${sgEnv}-frontend-sg`,
        secGrpDesc: `${sgEnv} frontend security group`,
        ingress: [
          { peer: Peer.anyIpv4(), port: Port.tcp(80), description: `${sgEnv} frontend allows http access from anywhere` },
          { peer: Peer.anyIpv6(), port: Port.tcp(80), description: `${sgEnv} frontend allowsI http access from anywhere` },
          { peer: Peer.anyIpv4(), port: Port.tcp(22), description: `${sgEnv} frontend allows SSH access from anywhere` },
        ]
      } )

    const prdLambdaGS = createSecurityGroup(this, vpc, sgEnv, buildConfig.Prefix, {    
      secGrpName: buildConfig.Prefix + `-${sgEnv}-lambda-sg`,
      secGrpDesc: `${sgEnv} lambda security group`,
      ingress: [ ]
    } )

    const prdDatabaseGS = createSecurityGroup(this, vpc, sgEnv, buildConfig.Prefix, {    
      secGrpName: buildConfig.Prefix + `${sgEnv}-database-sg`,
      secGrpDesc: `${sgEnv} database security group`,
      ingress: [
        { peer: devLambdaGS, port: Port.tcp(3306), description: `${sgEnv} lambda access to the database group` },
        { peer: devFrontendGS, port: Port.tcp(3306), description: `${sgEnv} frontend access to the database group` },
        { peer: null, port: Port.tcp(3306), description: `${sgEnv} loop back for database group` },
      ]
    } )

    // Create the certificate for the api subdomains
    const certificate = new cm.Certificate (this, "Certificate", {
      certificateName: buildConfig.Prefix + '-certificate',
      domainName: buildConfig.DomainName,
      subjectAlternativeNames: [`*.${buildConfig.DomainName}`],
      validation: cm.CertificateValidation.fromDns(buildConfig.hostedZone),
    })

    // Create the subdomains
    const devApiDomain = addSubDomain ( this, certificate, buildConfig.Prefix  + '-domain-api-dev', 'api-dev.' + buildConfig.DomainName);
    const stgApiDomain = addSubDomain ( this, certificate, buildConfig.Prefix  + '-domain-api-stg', 'api-stg.' + buildConfig.DomainName);
    const prdApiDomain = addSubDomain ( this, certificate, buildConfig.Prefix  + '-domain-api-prd', 'api.' + buildConfig.DomainName);

    // Create the subdomain route 53 records
    const devApiDomainRS = setRoute53Alias(this, buildConfig.hostedZone, buildConfig.Prefix + '-api-dev-route53', 'api-dev.' + buildConfig.DomainName, devApiDomain);
    const stgApiDomainRS = setRoute53Alias(this, buildConfig.hostedZone, buildConfig.Prefix + '-api-stg-route53', 'api-stg.' + buildConfig.DomainName, stgApiDomain);
    const prdApiDomainRS = setRoute53Alias(this, buildConfig.hostedZone, buildConfig.Prefix + '-api-prd-route53', 'api.' + buildConfig.DomainName, prdApiDomain);

    /**
     * Create buckets for project
     * 
     * - photo / video upload bucket per environment
     * - identity upload bucket per environment
     * - database deployment bucket per environment 
     * - cloudfront hosting bucket per environment
     */
    createBucket (this, BucketType.PUBLIC, buildConfig.Prefix + "-dev-upload", buildConfig )
    createBucket (this, BucketType.PRIVATE, buildConfig.Prefix + "-dev-upload-private", buildConfig )

    createBucket (this, BucketType.PUBLIC, buildConfig.Prefix + "-stg-upload", buildConfig )
    createBucket (this, BucketType.PUBLIC, buildConfig.Prefix + "-stg-upload-private", buildConfig )

    createBucket (this, BucketType.PRIVATE, buildConfig.Prefix + "-upload", buildConfig )
    createBucket (this, BucketType.PUBLIC, buildConfig.Prefix + "-upload-private", buildConfig )

    const devPrivateDatabaseDeploymentBucket = createBucket (this, BucketType.PRIVATE, buildConfig.Prefix + "-database-deploy-dev", buildConfig )
    const stgPrivateDatabaseDeploymentBucket = createBucket (this, BucketType.PRIVATE, buildConfig.Prefix + "-database-deploy-stg", buildConfig )
    const prdPrivateDatabaseDeploymentBucket = createBucket (this, BucketType.PRIVATE, buildConfig.Prefix + "-database-deploy", buildConfig )

    buildConfig.cfDevBucket = createBucket (this, BucketType.CLOUDFRONT_HOSTING, buildConfig.Prefix + "-cf-dev", buildConfig )
    buildConfig.cfStgBucket = createBucket (this, BucketType.CLOUDFRONT_HOSTING, buildConfig.Prefix + "-cf-stg", buildConfig )
    buildConfig.cfPrdBucket = createBucket (this, BucketType.CLOUDFRONT_HOSTING, buildConfig.Prefix + "-cf-prd", buildConfig )

    /**
     * Create the cloudfront distributions for each of the environments
     */
    // const cfDevDist = createCloudfront (this, buildConfig, 'dev')
    // const cfStgDist = createCloudfront (this, buildConfig, 'stg')
    // const cfPrdDist = createCloudfront (this, buildConfig, 'prd')

    // Stack outputs
    let exportName: string;

    exportName = buildConfig.Prefix + '-cert-arn'
    new cdk.CfnOutput(this, exportName, { value: certificate.certificateArn, exportName }); 

    // - Api Dev Domain
    exportName = buildConfig.Prefix + '-dev-api-domain'
    new cdk.CfnOutput(this, exportName, { value: devApiDomain.domainNameAliasDomainName, exportName });
    exportName = buildConfig.Prefix + '-stg-api-domain'
    new cdk.CfnOutput(this, exportName, { value: stgApiDomain.domainNameAliasDomainName, exportName });
    exportName = buildConfig.Prefix + '-prd-api-domain'
    new cdk.CfnOutput(this, exportName, { value: prdApiDomain.domainNameAliasDomainName, exportName });

    // - Api Dev Domain Route 53 Recordset
    exportName = buildConfig.Prefix + '-api-dev-domain-rs'
    new cdk.CfnOutput(this, exportName, { value: devApiDomainRS.domainName, exportName });
    exportName = buildConfig.Prefix + '-api-stg-domain-rs'
    new cdk.CfnOutput(this, exportName, { value: stgApiDomainRS.domainName, exportName });
    exportName = buildConfig.Prefix + '-api-prod-domain-rs'
    new cdk.CfnOutput(this, exportName, { value: prdApiDomainRS.domainName, exportName });

    // VPC
    exportName = buildConfig.Prefix + '-' + '-vpc-arn'
    new cdk.CfnOutput(this, exportName, { value: vpc.vpcArn, exportName }); 
    exportName = buildConfig.Prefix + '-' + '-vpc-id'
    new cdk.CfnOutput(this, exportName, { value: vpc.vpcId, exportName });

    // Security Groups
    exportName = buildConfig.Prefix + '-dev-public-sg-id'
    new cdk.CfnOutput(this, exportName, { value: devFrontendGS.securityGroupId, exportName });
    exportName = buildConfig.Prefix + '-dev-lambda-sg-id'
    new cdk.CfnOutput(this, exportName, { value: devLambdaGS.securityGroupId, exportName });
    exportName = buildConfig.Prefix + '-dev-database-sg-id'
    new cdk.CfnOutput(this, exportName, { value: devDatabaseGS.securityGroupId, exportName });

    exportName = buildConfig.Prefix + '-stg-public-sg-id'
    new cdk.CfnOutput(this, exportName, { value: stgFrontendGS.securityGroupId, exportName });
    exportName = buildConfig.Prefix + '-stg-lambda-sg-id'
    new cdk.CfnOutput(this, exportName, { value: stgLambdaGS.securityGroupId, exportName });
    exportName = buildConfig.Prefix + '-stg-database-sg-id'
    new cdk.CfnOutput(this, exportName, { value: stgDatabaseGS.securityGroupId, exportName });

    exportName = buildConfig.Prefix + '-prd-public-sg-id'
    new cdk.CfnOutput(this, exportName, { value: prdFrontendGS.securityGroupId, exportName });
    exportName = buildConfig.Prefix + '-prd-lambda-sg-id'
    new cdk.CfnOutput(this, exportName, { value: prdLambdaGS.securityGroupId, exportName });
    exportName = buildConfig.Prefix + '-prd-database-sg-id'
    new cdk.CfnOutput(this, exportName, { value: prdDatabaseGS.securityGroupId, exportName });


    // Cloudfront distributuion
    // exportName = buildConfig.Prefix + '-cf-dev-dist-id'
    // new cdk.CfnOutput(this, exportName, { value: cfDevDist.distributionId, exportName });
    // exportName = buildConfig.Prefix + '-cf-dev-dist-domain-name'
    // new cdk.CfnOutput(this, exportName, { value: cfDevDist.distributionDomainName, exportName });

    // exportName = buildConfig.Prefix + '-cf-stg-dist-id'
    // new cdk.CfnOutput(this, exportName, { value: cfStgDist.distributionId, exportName });
    // exportName = buildConfig.Prefix + '-cf-stg-dist-domain-name'
    // new cdk.CfnOutput(this, exportName, { value: cfStgDist.distributionDomainName, exportName });

    // exportName = buildConfig.Prefix + '-cf-prd-dist-id'
    // new cdk.CfnOutput(this, exportName, { value: cfPrdDist.distributionId, exportName });
    // exportName = buildConfig.Prefix + '-cf-prd-dist-domain-name'
    // new cdk.CfnOutput(this, exportName, { value: cfPrdDist.distributionDomainName, exportName });

    // Bucket exports
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

    exportName = buildConfig.Prefix + "-db-deploy-bucket-dev-name" 
    new cdk.CfnOutput(this, exportName, { value: devPrivateDatabaseDeploymentBucket.bucketName, exportName }); 
    exportName = buildConfig.Prefix + "-db-deploy-bucket-dev-arn" 
    new cdk.CfnOutput(this, exportName, { value: devPrivateDatabaseDeploymentBucket.bucketArn, exportName }); 

    exportName = buildConfig.Prefix + "-db-deploy-bucket-stg-name" 
    new cdk.CfnOutput(this, exportName, { value: stgPrivateDatabaseDeploymentBucket.bucketName, exportName }); 
    exportName = buildConfig.Prefix + "-db-deploy-bucket-stg-arn" 
    new cdk.CfnOutput(this, exportName, { value: stgPrivateDatabaseDeploymentBucket.bucketArn, exportName }); 

    exportName = buildConfig.Prefix + "-db-deploy-bucket-prd-name" 
    new cdk.CfnOutput(this, exportName, { value: prdPrivateDatabaseDeploymentBucket.bucketName, exportName }); 
    exportName = buildConfig.Prefix + "-db-deploy-bucket-prd-arn" 
    new cdk.CfnOutput(this, exportName, { value: prdPrivateDatabaseDeploymentBucket.bucketArn, exportName }); 

  }
}
