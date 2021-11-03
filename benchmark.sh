#!/bin/bash

# brew install hyperfine

mkdir -p dist

node create-templates.js

echo "Generated typescript files"

# safety checks
./node_modules/.bin/tsc dist/noTypesReducer.ts
./node_modules/.bin/tsc dist/partialState.ts
./node_modules/.bin/tsc dist/partialTypedState.ts
./node_modules/.bin/tsc dist/pickInterfaceState.ts

echo "Typescript files are valid"

hyperfine --min-runs 20 --warmup 3 \
    './node_modules/.bin/tsc dist/partialState.ts' \
    './node_modules/.bin/tsc dist/partialTypedState.ts' \
    './node_modules/.bin/tsc dist/pickInterfaceState.ts' \
    --export-markdown run.md
    
    # './node_modules/.bin/tsc dist/noTypesReducer.ts' \
