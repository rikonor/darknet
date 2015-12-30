#!/bin/bash -e

main() {
	local -r app="$1"
	local -r env="$2"

	pushd "vocativ-darknet-${app}"
	eb deploy "darknet-${app}-${env}"
	popd
}

main "$@"