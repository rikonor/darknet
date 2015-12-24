# DarkNet Build process

### Building a docker image
You can use the included `Dockerfile` in each of the project folders (`microsite` and `admin`).  
```
# Assuming you are in vocativ-darknet-microsite
$ docker build -t vocativ/darknet-microsite:<tag> .

# Or in vocativ-darknet-admin
$ docker build -t vocativ/darknet-admin:<tag> .
```

### Building locally
Assuming you do not want to run the app from inside of a docker container, you can build it locally (_This is basically running the `Dockerfile` manually_). Please make sure you have `node 0.10` and the latest `meteor` installed.

```
# Assuming you are in vocativ-darknet-microsite
$ meteor build --directory . # Build the node app
$ (cd bundle/programs/server && npm install) # Install dependencies
```

# DarkNet Deployment Process

Whether you're running the app using Docker or locally - you must provide the app with several environment variables indicating the location of the MongoDB, credentials, etc.  
As of Dec 21st, 2015, the required env vars when running the built app are:
```
ROOT_URL, PORT
MONGO_URL, MONGO_OPLOG_URL
AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
KADIRA_APP_ID [Optional], KADIRA_APP_SECRET [Optional]
```

# AWS Setup

##### Deployment to AWS consists of the following services:
1. Docker Hub - Automated builds on `git push` to master branch.
2. ECS (EC2 Container Service) - to run the built images.
3. S3 - Bucket for settings. Will contain the ECS config file.
4. ELB
5. Autoscaling Group
6. AWS Lambda and SNS play a small part in the scaling flow.

##### 1. ECS Setup
1. Create `ecs.config` in a bucket. The Docker Hub credentials will allow your instances to pull the private images.
```
# ecs.config
# Auth token is generated after running `docker login`
ECS_CLUSTER=darknet-microsite
ECS_ENGINE_AUTH_TYPE=dockercfg
ECS_ENGINE_AUTH_DATA={"https://index.docker.io/v1/":{"auth":"<auth-token>","email":"<email>"}}
```
2. create an IAM role with `ReadOnly` permissions from this bucket. Your cluster instances will have this role applied to them.
3. In ECS, create a task definition for your image.
4. In ECS, reate a service for this task and set the desired number of concurrently running tasks.
5. Note: The service will try to spin up new containers, but no instances can host our container yet.

##### 2. Launch Configuration Setup

Notice: At the time of writing (12/23/2015), there's an [open issue][1] with ecs-agent which we will work around.

1. Create a launch configuration defining our cluster instance.
2. Choose the general-purpose Amazon Linux AMI (e.g. `ami-60b6c60a`)
4. The settings I used are: `t2.medium` / `30GB SSD` /
5. Select the previously created IAM role (e.g. `ecsInstanceRole`)
6. Under advanced settings set the following user-data:
```
#!/bin/bash
yum install -y aws-cli
mkdir -p /etc/ecs/
aws s3 cp s3://vocativ-darknet-settings/ecs.config /etc/ecs/ecs.config

# install docker
yum install -y docker
service docker start

# install ecs-init
yum install -y ecs-init
start ecs
```
7. If you haven't already, create a Security Group with with ports `22, 80 and 443` open.

##### 3. Autoscaling Group Setup

* **ELB**: [minor step] create an elastic load balancer. We will use it in the next step.

1. Create a new Autoscaling Group and choose to create it from the previously created Launch Configuration.
2. Under *advanced settings*, select to receive traffic from our load balancer.
3. *Health Check type* should be based on EC2.
4. Configure whichever *autoscaling policies* you need.
5. Enable notifications.

##### TODO: 4. SNS and Lambda

Written by [rikonor](mailto:rikonor@gmail.com).

[1]: https://github.com/aws/amazon-ecs-agent/issues/273
