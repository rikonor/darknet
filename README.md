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

Written by [rikonor](mailto:rikonor@gmail.com).
