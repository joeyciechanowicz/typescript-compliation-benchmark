#!/bin/bash

# brew install hyperfine

mkdir -p dist

node create-templates.js 1

echo "Generated typescript files"

# safety checks
# ./node_modules/.bin/tsc dist/noTypesReducer.ts || exit 1
./node_modules/.bin/tsc dist/partialState.ts || exit 1
./node_modules/.bin/tsc dist/partialTypedState.ts || exit 1
./node_modules/.bin/tsc dist/pickInterfaceState.ts || exit 1

echo "Typescript files are valid"

# for FIELDS in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
for FIELDS in 1 2 3 4 5 6 8 10 12 14 16 19 22 25 28 22 26 30 31
do
    echo "Generating templates for $FIELDS fields"
    node create-templates.js $FIELDS

	hyperfine \
    './node_modules/.bin/tsc dist/partialState.ts' \
    './node_modules/.bin/tsc dist/partialTypedState.ts' \
    './node_modules/.bin/tsc dist/pickInterfaceState.ts' \
    './node_modules/.bin/tsc dist/seperateInterfaces.ts' \
    --export-json "runs/run-$FIELDS-fields.json"
done

node process-runs.js > output.csv
