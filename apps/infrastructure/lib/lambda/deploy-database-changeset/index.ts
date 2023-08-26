import * as AWS from 'aws-sdk';
import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager'
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as mysql2 from 'mysql2'
// import { Client } from 'pg'

/**
 * Used this to read file
 * 
 * https://www.cloudtechsimplified.com/aws-lambda-s3/
 * 
 * could use this https://blogs.gyanrays.com/aws/read-s3-file-image-videos-using-lambda-function
 * 
 * 
 * @param event 
 * @returns 
 */

/**
 * Database 
 * 
 * https://dev.to/aws-builders/how-to-use-secrete-manager-in-aws-lambda-node-js-3j80
 * 
 * https://deniapps.com/blog/setup-aws-lambda-to-use-amazon-rds-proxy
 * 
 * https://aws.amazon.com/blogs/compute/using-amazon-rds-proxy-with-aws-lambda/
 */

export async function main(event: APIGatewayEvent): Promise<boolean> {

  const bucketName = process.env.DEPLOY_BUCKET_NAME || "";
  const deployOrderFile = "deploy-order.txt";

  // Read the deploy order file to see which database iterms we want to deploy.
  const s3 = new AWS.S3();
  const params = { Bucket: bucketName, Key: deployOrderFile };

  const response = await s3.getObject(params).promise();

  const data = response.Body?.toString('utf-8') || '';

  console.log('file contents:', data);

  
  // // get the secret from secrets manager.
  const client = new SecretsManagerClient({})

  const aa = process.env.DATABASE_SECRET_ARN;

  console.log (aa)

  // const secret = await client.send(
  //   new GetSecretValueCommand({
  //     SecretId: process.env.databaseSecretArn,
  //   })
  // )

  // const secretValues = JSON.parse(secret.SecretString ?? '{}')

  // console.log('secretValues', secretValues)

  // // connect to the database
  // const db = new Client({
  //   host: secretValues.host, // host is the endpoint of the db cluster
  //   port: secretValues.port, // port is 5432
  //   user: secretValues.username, // username is the same as the secret name
  //   password: secretValues.password, // this is the password for the default database in the db cluster
  //   database: secretValues.dbname ?? 'postgres', // use the default database if no database is specified
  // })

  // await db.connect()

  // // execute a query
  // const res = await db.query('SELECT NOW()')

  // // disconnect from the database
  // await db.end()

  // console.log ("Hello World");

  return true;

  // return {
  //   body: JSON.stringify({
  //     message: `Successfully run lambda at ${new Date().toISOString()}`,
  //   }),
  //   statusCode: 200,
  //   isBase64Encoded: false,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // }
}