#!/bin/bash

# brew install hyperfine

mkdir -p dist

node create-templates.js 1

echo "Generated typescript files"

# safety checks
./node_modules/.bin/tsc dist/noTypesReducer.ts || exit 1
./node_modules/.bin/tsc dist/partialState.ts || exit 1
./node_modules/.bin/tsc dist/partialTypedState.ts || exit 1
./node_modules/.bin/tsc dist/pickInterfaceState.ts || exit 1

echo "Typescript files are valid"

for FIELDS in 1 2 3 4 5 6 7 8 9 10
do
    echo "Generating templates for $FIELDS fields"
    node create-templates.js $FIELDS

	hyperfine \
    './node_modules/.bin/tsc dist/partialState.ts' \
    './node_modules/.bin/tsc dist/partialTypedState.ts' \
    './node_modules/.bin/tsc dist/pickInterfaceState.ts' \
    --export-json "run-$FIELDS-fields.json"
done
