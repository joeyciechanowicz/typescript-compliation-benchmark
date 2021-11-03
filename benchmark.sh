#!/bin/bash

# brew install hyperfine

node create-templates.js

# safety checks
./node_modules/.bin/tsc dist/noTypesReducer.ts
./node_modules/.bin/tsc dist/partialState.ts
./node_modules/.bin/tsc dist/partialTypedState.ts
./node_modules/.bin/tsc dist/pickInterfaceState.ts

hyperfine --min-runs 20 --warmup 3 \
    './node_modules/.bin/tsc dist/noTypesReducer.ts' \
    './node_modules/.bin/tsc dist/partialState.ts' \
    './node_modules/.bin/tsc dist/partialTypedState.ts' \
    './node_modules/.bin/tsc dist/pickInterfaceState.ts'
