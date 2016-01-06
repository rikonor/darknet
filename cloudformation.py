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
from troposphere import Tags
from troposphere import Template
from troposphere.route53 import RecordSet
from troposphere.route53 import RecordSetGroup

LINUX_AMI_VERSION = '2015.09'
NODEJS_VERSION = '0.10.41'
NODEJS_AMI_VERSION = '2.0.5'

APPLICATION_SITE = 'Site'
APPLICATION_ADMIN = 'Admin'

ENVIRONMENT_PRODUCTION = 'Production'
ENVIRONMENT_TEST = 'Test'

APPLICATIONS = [APPLICATION_SITE, APPLICATION_ADMIN]
ENVIRONMENTS = [ENVIRONMENT_PRODUCTION, ENVIRONMENT_TEST]

LOADER_VERIFICIATION = {
    APPLICATION_SITE: {
        ENVIRONMENT_PRODUCTION: 'loaderio=8d6ffdb90b8cbe0f446700357319d686',
        ENVIRONMENT_TEST: 'loaderio=8b5ba421c0b82c5018d4149766aac4d4',
    },
    APPLICATION_ADMIN: {
        ENVIRONMENT_PRODUCTION: 'loaderio=6696d9d9a31d3a9f9a848597dc12c33e',
        ENVIRONMENT_TEST: 'loaderio=18f71dfedb2c2e7e0fe34e88a7984e02',
    },
}

t = Template()
t.add_version()
t.add_description("Vocativ Darknet")

keyname = Parameter(
    'KeyName',
    Description="Name of an existing EC2 KeyPair to enable SSH access to "
                "the AWS Elastic Beanstalk instance",
    Type='AWS::EC2::KeyPair::KeyName',
    ConstraintDescription="must be the name of an existing EC2 KeyPair.",
)
t.add_parameter(keyname)

hostedzone = Parameter(
    'HostedZone',
    Default='vocativ.com',
    Description="The DNS name of an existing Amazon Route 53 hosted zone",
    Type='String',
)
t.add_parameter(hostedzone)

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
                ]),
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
                Resource=['*'],
            )
        ]
    ),
    Roles=[Ref(serviceRole.title)],
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
    ),
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
        Value=NODEJS_VERSION
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

APPLICATION_VARIABLES = {}
APPLICATION_VARIABLES[APPLICATION_SITE] = []
APPLICATION_VARIABLES[APPLICATION_ADMIN] = []

ENVIRONMENT_VARIABLES = {}
ENVIRONMENT_VARIABLES[ENVIRONMENT_PRODUCTION] = [
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
ENVIRONMENT_VARIABLES[ENVIRONMENT_TEST] = ENVIRONMENT_VARIABLES[ENVIRONMENT_PRODUCTION]

apps = {}
appVersions = {}
appVersionParameters = {}
appConfigurationTemplates = {}
appEnvironments = {}
appEnvironmentURLs = {}
for app in APPLICATIONS:
    apps[app] = elasticbeanstalk.Application(
        '%sApplication' % app,
        Description="Darknet %s Application" % app,
    )
    t.add_resource(apps[app])

    appVersionParameters[app] = Parameter(
        '%sVersion' % app,
        Description="Darknet %s Version Number" % app,
        Type='String',
    )
    t.add_parameter(appVersionParameters[app])

    appVersions[app] = elasticbeanstalk.ApplicationVersion(
        '%sApplicationVersion' % app,
        ApplicationName=Ref(apps[app].title),
        Description="Darknet %s Application Version" % app,
        SourceBundle=elasticbeanstalk.SourceBundle(
            S3Bucket='vocativ',
            S3Key=Join('-', [
                'darknet/darknet',
                app.lower(),
                Join('', [
                    'v',
                    Ref(appVersionParameters[app].title),
                    '.zip',
                ]),
            ])
        )
    )
    t.add_resource(appVersions[app])

    appConfigurationTemplates[app] = elasticbeanstalk.ConfigurationTemplate(
        '%sConfigurationTemplate' % app,
        ApplicationName=Ref(apps[app].title),
        Description="Darknet %s Application Configuration Template" % app,
        OptionSettings=ENHANCED_MONITORING + SSH_ACCESS + HEALTH_CHECK + ELB_OPTIONS + ASG_OPTIONS + ROLLING_UPDATES_OPTIONS + NODEJS_OPTIONS,
        SolutionStackName='64bit Amazon Linux %s v%s running Node.js' % (LINUX_AMI_VERSION, NODEJS_AMI_VERSION),
    )
    t.add_resource(appConfigurationTemplates[app])

    appEnvironments[app] = {}
    appEnvironmentURLs[app] = {}
    for env in ENVIRONMENTS:
        environment_id = Join('-', [Ref('AWS::StackName'), app.lower(), env.lower()])
        url = Join('.', [environment_id, Ref(hostedzone)])

        appEnvironments[app][env] = elasticbeanstalk.Environment(
            '%s%sEnvironment' % (app, env),
            ApplicationName=Ref(apps[app].title),
            Description="Darknet %s %s Environment" % (app, env),
            TemplateName=Ref(appConfigurationTemplates[app].title),
            OptionSettings=APPLICATION_VARIABLES[app] + ENVIRONMENT_VARIABLES[env] + [
                elasticbeanstalk.OptionSettings(
                    Namespace='aws:elasticbeanstalk:customoption',
                    OptionName='HostedZoneName',
                    Value=Ref(hostedzone.title)
                ),
                elasticbeanstalk.OptionSettings(
                    Namespace='aws:elasticbeanstalk:customoption',
                    OptionName='EnvironmentHostname',
                    Value=url
                ),
                elasticbeanstalk.OptionSettings(
                    Namespace='aws:elasticbeanstalk:customoption',
                    OptionName='LoaderToken',
                    Value=LOADER_VERIFICIATION[app][env]
                ),
            ],
            VersionLabel=Ref(appVersions[app]),
            Tags=Tags(Name=environment_id),
        )
        t.add_resource(appEnvironments[app][env])

        appEnvironmentURLs[app][env] = Output(
            '%s%sURL' % (app, env),
            Description="%s %s URL" % (app, env),
            Value=Join('', ['http://', url]),
        )
        t.add_output(appEnvironmentURLs[app][env])

print(t.to_json())
