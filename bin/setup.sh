#!/bin/bash -e

main() {
	brew install \
		awscli \
		git \
		docker \
		docker-machine \
		docker-compose \
		rename

	if ! which meteor > /dev/null; then
		curl https://install.meteor.com/ | sh
	fi
}

main "$@"
