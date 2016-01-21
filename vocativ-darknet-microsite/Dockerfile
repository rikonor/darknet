FROM node:0.10

RUN \
  apt-get update && \
  apt-get install -y unzip

# Install PhantomJS
RUN \
  wget http://antix.daveserver.info/jessie/pool/main/libj/libjpeg8/libjpeg8_8d1-2_amd64.deb && \
  dpkg -i libjpeg8_8d1-2_amd64.deb && \
  wget https://github.com/bprodoehl/phantomjs/releases/download/v2.0.0-20150528/phantomjs-2.0.0-20150528-u1404-x86_64.zip && \
  unzip phantomjs-2.0.0-20150528-u1404-x86_64.zip && \
  mv phantomjs-2.0.0-20150528/bin/phantomjs /bin

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
