const fs = require('fs');

const items = [...Array(1000)].map((_, i) => i);

const consts = items.map(i => `export const THING_${i} = 'THING_${i}';`).join('\n');

const noTypesReducer = `
import * as type from './const';

${items.map(i => `
const updateThing${i} = action => ({thing${i}: action.value});
`).join('\n')}

function thingReducer(state, action) {
    switch (action.type) {
        ${items.map(i => `case type.THING_${i}: return { ...state, ...updateThing${i}(action) };`).join('\n')}
    }
}
`;

const partialState = `
import * as type from './const';

interface Action {
   type: string;
   value: number;
}

interface State {
    ${items.map(i => `thing${i}: number;`).join('\n')}
}

${items.map(i => `
const updateThing${i} = (action: Action): Partial<State> => ({thing${i}: action.value});
`).join('\n')}

function thingReducer(state: State, action: Action) {
    switch (action.type) {
        ${items.map(i => `case type.THING_${i}: return { ...state, ...updateThing${i}(action) };`).join('\n')}
    }
}
`;


const partialTypedState = `
import * as type from './const';

interface Action {
   type: string;
   value: number;
}

interface State {
    ${items.map(i => `thing${i}: number;`).join('\n')}
}

interface PartialState extends Partial<State> {}

${items.map(i => `
const updateThing${i} = (action: Action): PartialState => ({thing${i}: action.value});
`).join('\n')}

function thingReducer(state: State, action: Action) {
    switch (action.type) {
        ${items.map(i => `case type.THING_${i}: return { ...state, ...updateThing${i}(action) };`).join('\n')}
    }
}
`;

const pickInterfaceState = `
import * as type from './const';

interface Action {
   type: string;
   value: number;
}

interface State {
    ${items.map(i => `thing${i}: number;`).join('\n')}
}

${items.map(i => `
const updateThing${i} = (action: Action): Pick<State, 'thing${i}'> => ({thing${i}: action.value});
`).join('\n')}

function thingReducer(state: State, action: Action) {
    switch (action.type) {
        ${items.map(i => `case type.THING_${i}: return { ...state, ...updateThing${i}(action) };`).join('\n')}
    }
}
`;

fs.writeFileSync('dist/const.ts', consts);
fs.writeFileSync('dist/noTypesReducer.ts', noTypesReducer);
fs.writeFileSync('dist/partialState.ts', partialState);
fs.writeFileSync('dist/partialTypedState.ts', partialTypedState);
fs.writeFileSync('dist/pickInterfaceState.ts', pickInterfaceState);
