import { IHostedZone } from 'aws-cdk-lib/aws-route53';
import * as S3 from 'aws-cdk-lib/aws-s3';
import { Vpc, SecurityGroup } from 'aws-cdk-lib/aws-ec2'
import * as cm from 'aws-cdk-lib/aws-certificatemanager';

export enum Stage {
    Dev = 0,
    Stage = 1,
    Production = 2
}

export interface BuildConfig {
    hostedZone: IHostedZone  | null,
    cloudfrontCert: cm.ICertificate  | null
    cfDevBucket: S3.IBucket | null,
    cfStgBucket: S3.IBucket | null,
    cfPrdBucket: S3.IBucket | null,
    deployBucket: S3.IBucket[],
    vpc: Vpc | null;
    databaseSG: SecurityGroup[];
    lambdaSG: SecurityGroup[];
    frontendSG: SecurityGroup[];

    readonly CertificateARN : string
    // readonly RunSetup : boolean
    readonly Environment : string
    readonly EnvironmentId : number

    readonly AWSAccountID : string
    readonly AWSProfileName: string
    readonly AWSProfileRegion: string

    readonly App: string
    readonly Prefix: string

    readonly CorsServer: string
    readonly ApiDomainName: string
    readonly DomainName: string
}

