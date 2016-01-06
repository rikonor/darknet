#!/bin/bash -e

get_app_dir() {
	local -r app="$1"

	local result
	case "${app}" in
		site)
			result='vocativ-darknet-microsite' ;;
		admin)
			result='vocativ-darknet-admin' ;;
		*)
			exit 1 ;;
	esac
	echo -n "${result}"
}

main() {
	local -r app="$1"
	local -r version="$2"

	rm -rf .build/${app}
	mkdir -p .build/${app}

	local -r app_src_dir="$(get_app_dir "$app")"
	echo "Building ${app_src_dir}..."

	pushd "${app_src_dir}"
	meteor build \
		--directory ../.build/${app} \
		--architecture os.linux.x86_64
	popd

	pushd .build/${app}/bundle
	ln -s programs/server/package.json .
	mkdir .ebextensions
	cp ../../../ebextensions/*.config.yaml .ebextensions/
	rename --remove-extension .ebextensions/*.config.yaml
	zip -r ../../darknet-${app}-v${version}.zip .ebextensions *
	aws s3 cp ../../darknet-${app}-v${version}.zip s3://vocativ/darknet/darknet-${app}-v${version}.zip
	popd
}

main "$@"
