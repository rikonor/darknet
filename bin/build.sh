#!/bin/bash -e

main() {
	local -r app="$1"
	local -r version="$2"

	rm -rf .build/${app}
	mkdir -p .build/${app}

	pushd vocativ-darknet-${app}
	meteor build \
		--directory ../.build/${app} \
		--architecture os.linux.x86_64
	popd

	pushd .build/${app}/bundle
	ln -s programs/server/package.json .
	zip -r ../../darknet-${app}-v${version}.zip .
	aws s3 cp ../../darknet-${app}-v${version}.zip s3://vocativ/darknet/darknet-${app}-v${version}.zip
	popd
}

main "$@"
