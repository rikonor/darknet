#!/bin/bash -e

main() {
	brew install \
		awscli \
		aws-elasticbeanstalk \
		git \
		docker \
		docker-machine \
		docker-compose

	if ! which meteor > /dev/null; then
		curl https://install.meteor.com/ | sh
	fi
}

main "$@"