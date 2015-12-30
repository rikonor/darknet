#!/bin/bash -e

declare -a APPLICATIONS=(admin microsite)
declare -a ENVIRONMENTS=(prod dev)
declare -r REGION="us-east-1"
declare -r KEYNAME="vocativ-cms"
declare -ri NODES_COUNT=2
declare -r INSTANCE_TYPE="m2.xlarge"

get_ref_name() {
	git rev-parse --abbrev-ref HEAD
}

init_app() {
	local -r app="$1"

	pushd "vocativ-darknet-${app}"

	eb init "darknet-${app}" \
		--region "${REGION}" \
		--platform "Docker" \
		--keyname "${KEYNAME}"

	for env in "${ENVIRONMENTS[@]}"; do
		eb create "darknet-${app}-${env}" \
			--scale ${NODES_COUNT} \
			--cname "darknet-${app}-${env}" \
			--instance_type "${INSTANCE_TYPE}"
	done

	popd
}

main() {
	for app in "${APPLICATIONS[@]}"; do
		init_app "${app}"
	done
}

main "$@"