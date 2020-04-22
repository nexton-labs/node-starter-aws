[![CircleCI](https://circleci.com/gh/nexton-labs/node-starter-aws/tree/develop.svg?style=svg)](https://circleci.com/gh/nexton-labs/node-starter-aws/tree/develop)
# Node Starter


## Start application

 * start with dev database `yarn start:dev`
 * start with local database `yarn start:local dbname={dbname} dbusername={dbusername} dbpassword={dbpassword}`

# Tech Stack
* This project is a seed for building a **node.js** api. It includes the following features:
* * [tsoa](https://www.npmjs.com/package/tsoa) `typescript`
* * [inversify](https://www.npmjs.com/package/inversify) `inversion of controll / dependency injection`
* * [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
* * [typeorm](https://www.npmjs.com/package/typeorm) `SQL ORM`
* * [mocha](https://www.npmjs.com/package/mocha), [chai](https://www.npmjs.com/package/chai),[ts-mockito](https://www.npmjs.com/package/ts-mockito) [sinon](https://www.npmjs.com/package/sinon) `unit and integration testing`

## Where can I find the API Swagger documentation ?
* `<url>/api-docs`

## which is the endpoint URL?
* `<url>/service`

## Commands
* **instalation:** `yarn install`
* **dev:** `yarn start` *build tsoa routes, swagger definitions and starts the server on development mode listening to file changes (swagger definition changes will require a manual restart)*
* **test:** `yarn test` *unit and integration tests*
* **build:** `yarn build` *production build*
* **prod:** `yarn start:prod` *starts the server on production mode*
* **local:** `yarn start:local` *lets the user sets the database via arguments*
   * **required arguments:**
      * **dbname=LOCAL_DBNAME**
      * **dbusername=LOCAL_USERNAME**
      * **dbpassword=LOCAL_PASSWORD**
  * **default arguments (can be overriden):**
      * **dbhost=localhost**
      * **dbport=3306**
      * **dbdialect=postgres**

## Scaffolding
* config `express server, DB connection, Logger, etc`
  * env `.env files`
* controllers `routes configuration`
* persistance `data abstraction layers`
  * Entities `classes and interfaces representing entities.`
  * Repositories `abstraction layer being used by services to access entities`
* services `business logic to be used primary by controllers`
  * Dtos `Data transfer objects, to decouple domain from Rest resources`
* utils
* tests

## Docker 
* [Base Image](phusion/baseimage:0.10.0) `phusion/baseimage`
* [Process Manager for Nodejs](http://pm2.keymetrics.io/) `PM2`

## Deploy to AWS ECS from ECR via CircleCI 2.0
This project provides an example of how to deploy to AWS ECS from ECR on CircleCI 2.0.
It pushes the Docker image to an Amazon Elastic Container Registry (ECR), and then deploy to Amazon Elastic Container Service (ECS) using AWS Fargate.

## Prerequisites
### Set up required AWS resources
Builds of this project rely on AWS resources to be present in order to succeed. For convenience, the prerequisite AWS resources may be created using the terraform scripts provided in the `terraform_setup` directory.
1. Ensure [terraform](https://www.terraform.io/) is installed on your system.
2. Edit `terraform_setup/terraform.tfvars` to fill in the necessary variable values (an Amazon account with sufficient privileges to create resources like an IAM account, VPC, EC2 instances, Elastic Load Balancer, etc is required). (It is not advisable to commit this file to a public repository after it has been populated with your AWS credentials)
3. Use terraform to create the AWS resources
    ```
    cd terraform_setup
    terraform init
    # Review the plan
    terraform plan
    # Apply the plan to create the AWS resources
    terraform apply
    ```
4. You can run `terraform destroy` to destroy most of the created AWS resources but in case of lingering undeleted resources, it is recommended to check the [AWS Management Console](https://console.aws.amazon.com/) to see if there are any remaining undeleted resources to avoid unwanted costs. In particular, please check the ECS, CloudFormation and VPC pages.

### Configure environment variables on CircleCI
The following [environment variables](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project) must be set for the project on CircleCI via the project settings page, before the project can be built successfully.


| Variable                       | Description                                               |
| ------------------------------ | --------------------------------------------------------- |
| `AWS_ACCESS_KEY_ID`            | Used by the AWS CLI                                       |
| `AWS_SECRET_ACCESS_KEY `       | Used by the AWS CLI                                       |
| `AWS_DEFAULT_REGION`           | Used by the AWS CLI. Example value: "us-east-1" (Please make sure the specified region is supported by the Fargate launch type)                          |
| `AWS_ACCOUNT_ID`               | AWS account id. This information is required for deployment.                                   |
| `AWS_RESOURCE_NAME_PREFIX`     | Prefix that some of the required AWS resources are assumed to have in their names. The value should correspond to the `aws_resource_prefix` variable value in `terraform_setup/terraform.tfvars`.                             |    

