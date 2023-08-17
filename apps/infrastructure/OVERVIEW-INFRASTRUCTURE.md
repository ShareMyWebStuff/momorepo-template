This creates the infrastructure for this project.

Assumptions made:
- Hosting Zone has already been created
- Cloudfront certificate has already been created on us-east-1 (stored in config/setup.yaml)


Base Infrastructure

Create Hosting Zone (TODO)

Create Cloudfront certificate (us-east-1)

Create Domain Names and Route53 entries
- api-dev.<domain name>
- api-stg.<domain name>
- api.<domain name>

Create Buckets per environment              DONE (setup)
- <domain prefix>-dev-upload
- <domain prefix>-dev-upload-private
- <domain prefix>-stg-upload
- <domain prefix>-stg-upload-private
- <domain prefix>-upload
- <domain prefix>-upload-private

Cloudfront Buckets                          DONE (setup)
- <domain prefix>-cf-dev
- <domain prefix>-cf-stg
- <domain prefix>-cf

Deployment Buckets                          DONE (setup)
- <domain prefix>-database-deploy-dev
- <domain prefix>-database-deploy-stg
- <domain prefix>-database-deploy

Cloudfront Distributions
- dev
- stg
- prd

Create API Gateway certificate (TODO)

**We need to be able to create NextJS EC2 instance, NGINX. Static IP address**

Create Hosting Zone

Need  subnets for dev / stg / prd
Need frontend / backend / lambda security groups for dev / stg / prd
Need route tables for dev / stg / prd

# VPC                       - tutorseekers-vpc
# Internet Gateway          - tutorseekers-igw
# Public Subnet             - tutorseekers-public-subnet-a
# Private Subnet A          - tutorseekers-private-subnet-a
# Private Subnet B          - tutorseekers-private-subnet-b
# Public Route Table        - tutorseekers-public-route-a
# Private Route Table A     - tutorseekers-private-route-a
# Private Route Table B     - tutorseekers-private-route-b
# Front End Security Group  - tutorseekers-FE-sg
# Back End Security Group   - tutorseekers-BE-sg
# Lambda Security Group     - tutorseekers-LAMBDA-sg

Create Database serverless MySQL store details in SSM

Create NextJS EC2 instance with static IP address and NGINX 

Populate the database with the data from the bucket

Create an apigateway for each environment
