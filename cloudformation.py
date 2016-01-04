#!/usr/bin/env python

import awacs.autoscaling as autoscaling
import awacs.ec2 as ec2
import awacs.elasticloadbalancing as elasticloadbalancing
import awacs.sqs as sqs
import awacs.sts as sts
from awacs.aws import Allow
from awacs.aws import Condition
from awacs.aws import Policy
from awacs.aws import Principal
from awacs.aws import Statement
from awacs.aws import StringEquals
import troposphere.elasticbeanstalk as elasticbeanstalk
import troposphere.iam as iam
from troposphere import GetAtt
from troposphere import Join
from troposphere import Output
from troposphere import Parameter
from troposphere import Ref
from troposphere import Template

APPLICATIONS = ['Microsite', 'Admin']
ENVIRONMENTS = ['Production', 'Test']

t = Template()
t.add_version()
t.add_description("Vocativ Darknet")

keyname = Parameter(
    'KeyName',
    Description="Name of an existing EC2 KeyPair to enable SSH access to "
                "the AWS Elastic Beanstalk instance",
    Type='AWS::EC2::KeyPair::KeyName',
    ConstraintDescription="must be the name of an existing EC2 KeyPair."
)
keyname = t.add_parameter(keyname)

serviceRole = iam.Role(
    'ServiceRole',
    AssumeRolePolicyDocument=Policy(
        Statement=[
            Statement(
                Effect=Allow,
                Principal=Principal(
                    'Service', 'elasticbeanstalk.amazonaws.com'),
                Action=[sts.AssumeRole],
                Condition=Condition([
                    StringEquals('sts:ExternalId', 'elasticbeanstalk'),
                ])
            )
        ]
    ),
    Path='/',
)
t.add_resource(serviceRole)

serviceRolePolicies = iam.PolicyType(
    'ServiceRolePolicies',
    PolicyName='Service',
    PolicyDocument=Policy(
        Statement=[
            Statement(
                Effect=Allow,
                Action=[
                    elasticloadbalancing.DescribeInstanceHealth,
                    ec2.DescribeInstances,
                    ec2.DescribeInstanceStatus,
                    ec2.GetConsoleOutput,
                    ec2.AssociateAddress,
                    ec2.DescribeAddresses,
                    ec2.DescribeSecurityGroups,
                    sqs.GetQueueAttributes,
                    sqs.GetQueueUrl,
                    autoscaling.DescribeAutoScalingGroups,
                    autoscaling.DescribeAutoScalingInstances,
                    autoscaling.DescribeScalingActivities,
                    autoscaling.DescribeNotificationConfigurations,
                ],
                Resource=['*']
            )
        ]
    ),
    Roles=[Ref(serviceRole.title)]
)
t.add_resource(serviceRolePolicies)

ENHANCED_MONITORING = [
    elasticbeanstalk.OptionSettings(
        Namespace='aws:elasticbeanstalk:healthreporting:system',
        OptionName='SystemType',
        Value='enhanced'
    ),
    elasticbeanstalk.OptionSettings(
        Namespace='aws:elasticbeanstalk:environment',
        OptionName='ServiceRole',
        Value=Ref(serviceRole)
    ),
    elasticbeanstalk.OptionSettings(
        Namespace='aws:autoscaling:launchconfiguration',
        OptionName='MonitoringInterval',
        Value='1 minute'
    ),
]

HEALTH_CHECK = [
    elasticbeanstalk.OptionSettings(
        Namespace='aws:elasticbeanstalk:application',
        OptionName='Application Healthcheck URL',
        Value='/health'
    ),
    elasticbeanstalk.OptionSettings(
        Namespace='aws:elb:healthcheck',
        OptionName='Interval',
        Value='10'
    ),
    elasticbeanstalk.OptionSettings(
        Namespace='aws:elb:healthcheck',
        OptionName='Timeout',
        Value='5'
    ),
    elasticbeanstalk.OptionSettings(
        Namespace='aws:elb:healthcheck',
        OptionName='HealthyThreshold',
        Value='3'
    ),
    elasticbeanstalk.OptionSettings(
        Namespace='aws:elb:healthcheck',
        OptionName='UnhealthyThreshold',
        Value='5'
    ),
]

ELB_OPTIONS = [
    elasticbeanstalk.OptionSettings(
        Namespace='aws:elb:policies',
        OptionName='ConnectionDrainingEnabled',
        Value='true'
    ),
    elasticbeanstalk.OptionSettings(
        Namespace='aws:elb:policies',
        OptionName='ConnectionDrainingTimeout',
        Value='20'
    ),
    elasticbeanstalk.OptionSettings(
        Namespace='aws:elb:policies',
        OptionName='ConnectionSettingIdleTimeout',
        Value='30'
    ),
    elasticbeanstalk.OptionSettings(
        Namespace='aws:elb:loadbalancer',
        OptionName='CrossZone',
        Value='true'
    )
]

ASG_OPTIONS = [
    elasticbeanstalk.OptionSettings(
        Namespace='aws:autoscaling:launchconfiguration',
        OptionName='InstanceType',
        Value='m2.xlarge'
    ),
    elasticbeanstalk.OptionSettings(
        Namespace='aws:autoscaling:asg',
        OptionName='Cooldown',
        Value='300'
    ),
    elasticbeanstalk.OptionSettings(
        Namespace='aws:autoscaling:asg',
        OptionName='MinSize',
        Value='2'
    ),
    elasticbeanstalk.OptionSettings(
        Namespace='aws:autoscaling:asg',
        OptionName='MinSize',
        Value='6'
    ),
]

ROLLING_UPDATES_OPTIONS = [
    elasticbeanstalk.OptionSettings(
        Namespace='aws:autoscaling:updatepolicy:rollingupdate',
        OptionName='RollingUpdateEnabled',
        Value='true'
    ),
    elasticbeanstalk.OptionSettings(
        Namespace='aws:autoscaling:updatepolicy:rollingupdate',
        OptionName='RollingUpdateType',
        Value='Health'
    ),
    elasticbeanstalk.OptionSettings(
        Namespace='aws:autoscaling:updatepolicy:rollingupdate',
        OptionName='Timeout',
        Value='PT5M'
    ),
]

NODEJS_OPTIONS = [
    elasticbeanstalk.OptionSettings(
        Namespace='aws:elasticbeanstalk:container:nodejs',
        OptionName='NodeVersion',
        Value='0.10.41'
    ),
    elasticbeanstalk.OptionSettings(
        Namespace='aws:elasticbeanstalk:container:nodejs',
        OptionName='NodeCommand',
        Value='node main.js'
    ),
]

SSH_ACCESS = [
    elasticbeanstalk.OptionSettings(
        Namespace='aws:autoscaling:launchconfiguration',
        OptionName='EC2KeyName',
        Value=Ref('KeyName')
    ),
]

ENVIRONMENT_VARIABLES = {}
ENVIRONMENT_VARIABLES['Production'] = [
    elasticbeanstalk.OptionSettings(
        Namespace='aws:elasticbeanstalk:application:environment',
        OptionName='ROOT_URL',
        Value='http://www.vocativ.com'
    ),

    elasticbeanstalk.OptionSettings(
        Namespace='aws:elasticbeanstalk:application:environment',
        OptionName='AWS_ACCESS_KEY_ID',
        Value='AKIAJKXPTBGJTTBF7SNA'
    ),
    elasticbeanstalk.OptionSettings(
        Namespace='aws:elasticbeanstalk:application:environment',
        OptionName='AWS_SECRET_ACCESS_KEY',
        Value='9D216FHT54foJgL5UFbI0uQp7pRvVF9WY+XWu+eY'
    ),
    elasticbeanstalk.OptionSettings(
        Namespace='aws:elasticbeanstalk:application:environment',
        OptionName='S3_IMAGES_BUCKET',
        Value='vocativ-darknet-images-bucket'
    ),

    elasticbeanstalk.OptionSettings(
        Namespace='aws:elasticbeanstalk:application:environment',
        OptionName='MONGO_URL',
        Value='mongodb://darknet:darknet@candidate.57.mongolayer.com:10638,candidate.60.mongolayer.com:10516/darknet?replicaSet=set-566701aefd6b56ed9e0018e6'
    ),
    elasticbeanstalk.OptionSettings(
        Namespace='aws:elasticbeanstalk:application:environment',
        OptionName='MONGO_OPLOG_URL',
        Value='mongodb://darknet:darknet@candidate.57.mongolayer.com:10638,candidate.60.mongolayer.com:10516/local?authSource=darknet'
    ),

    elasticbeanstalk.OptionSettings(
        Namespace='aws:elasticbeanstalk:application:environment',
        OptionName='KADIRA_APP_ID',
        Value='o5DsxrpnCK43wbpzn'
    ),
    elasticbeanstalk.OptionSettings(
        Namespace='aws:elasticbeanstalk:application:environment',
        OptionName='KADIRA_APP_SECRET',
        Value='8be42b29-0043-4c01-9b7e-e6108d317736'
    ),
]
ENVIRONMENT_VARIABLES['Test'] = ENVIRONMENT_VARIABLES['Production']

apps = {}
appVersions = {}
appConfigurationTemplates = {}
appEnvironments = {}
appEnvironmentURLs = {}
for app in APPLICATIONS:
    apps[app] = elasticbeanstalk.Application(
        '%sApplication' % app,
        Description='Darknet %s Application' % app,
    )
    t.add_resource(apps[app])

    appVersions[app] = elasticbeanstalk.ApplicationVersion(
        '%sApplicationVersion' % app,
        ApplicationName=Ref(apps[app].title),
        Description='Darknet %s Application Version' % app,
        SourceBundle=elasticbeanstalk.SourceBundle(
            S3Bucket='vocativ',
            S3Key='darknet/darknet-%s-v0.1.0.zip' % app.lower(),
        )
    )
    t.add_resource(appVersions[app])

    appConfigurationTemplates[app] = elasticbeanstalk.ConfigurationTemplate(
        '%sConfigurationTemplate' % app,
        ApplicationName=Ref(apps[app].title),
        Description='Darknet %s Application Configuration Template' % app,
        OptionSettings=ENHANCED_MONITORING + SSH_ACCESS + HEALTH_CHECK + ELB_OPTIONS + ASG_OPTIONS + ROLLING_UPDATES_OPTIONS + NODEJS_OPTIONS,
        SolutionStackName='64bit Amazon Linux 2015.09 v2.0.5 running Node.js',
    )
    t.add_resource(appConfigurationTemplates[app])

    appEnvironments[app] = {}
    appEnvironmentURLs[app] = {}
    for env in ENVIRONMENTS:
        appEnvironments[app][env] = elasticbeanstalk.Environment(
            '%s%sEnvironment' % (app, env),
            ApplicationName=Ref(apps[app].title),
            Description='Darknet %s %s Environment' % (app, env),
            TemplateName=Ref(appConfigurationTemplates[app].title),
            OptionSettings=ENVIRONMENT_VARIABLES[env],
            VersionLabel=Ref(appVersions[app]),
        )
        t.add_resource(appEnvironments[app][env])

        appEnvironmentURLs[app][env] = Output(
            '%s%sURL' % (app, env),
            Description="%s %s URL" % (app, env),
            Value=Join('', ['http://', GetAtt(appEnvironments[app][env], 'EndpointURL')])
        )
        t.add_output(appEnvironmentURLs[app][env])

print(t.to_json())
