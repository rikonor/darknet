FROM node:0.10

# Install Meteor
RUN curl https://install.meteor.com/ | sh

# Build node app
ADD . /src
WORKDIR /src

RUN \
  meteor build --directory . && \
  (cd bundle/programs/server && npm install)

# Remove Meteor
RUN \
  rm -rf ~/.meteor && \
  rm /usr/local/bin/meteor

WORKDIR /src/bundle
ENTRYPOINT node main.js
