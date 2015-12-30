#!/bin/bash -e

update_distro() {
	apt-get update -y
}

install_nodejs() {
	apt-get install -y \
		curl \
		build-essential

	curl -sL https://deb.nodesource.com/setup_0.10 | bash -
	apt-get install -y nodejs

	npm install -g node-gyp
	node-gyp install
}

cleanup() {
	apt-get autoremove -y

	# clear docs
	rm -rf \
		/usr/share/doc \
		/usr/share/doc-base \
		/usr/share/man \
		/usr/share/locale \
		/usr/share/zoneinfo

	# clear package management dirs
	rm -rf \
		/var/lib/cache \
		/var/lib/log

	# clear /tmp
	rm -rf \
		/tmp/*

	# clear npm cache
	npm cache clear
}

main() {
	update_distro
	install_nodejs
	cleanup
}

main "$@"
