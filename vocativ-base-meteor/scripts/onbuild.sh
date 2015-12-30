#!/bin/bash -e

COPIED_APP_PATH="/copied-app"
BUNDLE_DIR="/tmp/bundle-dir"

install_meteor() {
	curl -sL https://install.meteor.com | sed s/--progress-bar/-sL/g | /bin/sh
}

build_app() {
	cp --recursive /app "${COPIED_APP_PATH}"
	cd "${COPIED_APP_PATH}"

	meteor build --directory "${BUNDLE_DIR}"

	cd "${BUNDLE_DIR}/bundle/programs/server"
	npm install

	mv "${BUNDLE_DIR}/bundle" /build
}

cleanup () {
	rm -rf "${COPIED_APP_PATH}"
	rm -rf "${BUNDLE_DIR}"
	rm -rf ~/.meteor
	rm /usr/local/bin/meteor
}

main() {
	install_meteor
	build_app
	cleanup
}

main "$@"
