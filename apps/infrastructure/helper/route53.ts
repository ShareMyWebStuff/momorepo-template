import { Stack } from 'aws-cdk-lib';
import { ARecord, RecordTarget, IHostedZone } from 'aws-cdk-lib/aws-route53';
import { ApiGatewayDomain, CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { EndpointType, SecurityPolicy, DomainName } from 'aws-cdk-lib/aws-apigateway';

/**
 * Creates the sub domain name for the api gateway
 * 
 * @param scope 
 * @param certificate 
 * @param subDomainId 
 * @param subDomainName 
 * @returns 
 */
export const addSubDomain = ( scope: Stack, certificate: Certificate, subDomainId: string, subDomainName: string ) => {
    return new DomainName(scope, subDomainId, {
        domainName: subDomainName,
        certificate,
        endpointType: EndpointType.REGIONAL,
        securityPolicy: SecurityPolicy.TLS_1_2,
    })
}

/**
 * Crates the alias routes. Points a subdomain to apigateway or cloudfront
 * 
 * @param scope 
 * @param buildConfig 
 * @param subDomain 
 * @param aliasRec 
 * @returns 
 */
export const setRoute53Alias = (scope: Stack, hostedZone: IHostedZone, route53SubDomainId: string, recordName: string, subDomain: DomainName ) => {

    return new ARecord(scope, route53SubDomainId, {
        zone: hostedZone,
        recordName: recordName,
        target: RecordTarget.fromAlias(new ApiGatewayDomain(subDomain))
    });
}

export const setCloudfrontRoute53Alias = (scope: Stack, hostedZone: IHostedZone, route53SubDomainId: string, recordName: string, cfTarget: CloudFrontTarget ) => {

    return new ARecord(scope, route53SubDomainId, {
        zone: hostedZone,
        recordName: recordName,
        target: RecordTarget.fromAlias( cfTarget )
    });
}
