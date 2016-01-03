#!/bin/bash -e

main() {
	brew install \
		awscli \
		git \
		docker \
		docker-machine \
		docker-compose \
		jq \
		python3 \
		tomologic/tap/wrench

	pyvenv .venv
	source .venv/bin/activate

	pip install --upgrade -r requirements.txt

	if ! which meteor > /dev/null; then
		curl https://install.meteor.com/ | sh
	fi
}

main "$@"
