const fs = require('fs');

const numFields = parseInt(process.argv[2]) || 1;

const items = [...Array(1000)].map((_, i) => i);
const fields = [...Array(numFields)].map((_, i) => i);

const consts = items.map(i => `export const THING_${i} = 'THING_${i}';`).join('\n');


const iter = (cb) => items.map(i => cb(i)).join('');

const assignment = i => `{${fields.map(f => `thing${i}_${f}: action.value`).join(', ')}}`;
const pick = i => fields.map(f => `'thing${i}_${f}'`).join(' | ');

const state = `
interface State {
    ${iter(i => fields.map(f => `
    thing${i}_${f}: number;`).join(''))}
}`;

const typedReducer = `
function thingReducer(state: State, action: Action) {
    switch (action.type) {
        ${iter(i => `
        case type.THING_${i}: return { ...state, ...updateThing${i}(action) };`)}
    }
}`;

const noTypesReducer = `
import * as type from './const';

${iter(i => `
const updateThing${i} = action => ({thing${i}a: action.value, thing${i}b: action.value});
`)}

function thingReducer(state, action) {
    switch (action.type) {
        ${items.map(i => `
        case type.THING_${i}: return { ...state, ...updateThing${i}(action) };`).join('')}
    }
}
`;


const partialState = `
import * as type from './const';

interface Action {
   type: string;
   value: number;
}

${state}

${iter(i => `
const updateThing${i} = (action: Action): Partial<State> => (${assignment(i)});
`)}

${typedReducer}
`;


const partialTypedState = `
import * as type from './const';

interface Action {
   type: string;
   value: number;
}

${state}

interface PartialState extends Partial<State> {}

${iter(i => `
const updateThing${i} = (action: Action): PartialState => (${assignment(i)});
`)}

${typedReducer}
`;

const pickInterfaceState = `
import * as type from './const';

interface Action {
   type: string;
   value: number;
}

${state}

${iter(i => `
const updateThing${i} = (action: Action): Pick<State, ${pick(i)}> => (${assignment(i)});
`)}

${typedReducer}
`;

fs.writeFileSync('dist/const.ts', consts);
fs.writeFileSync('dist/noTypesReducer.ts', noTypesReducer);
fs.writeFileSync('dist/partialState.ts', partialState);
fs.writeFileSync('dist/partialTypedState.ts', partialTypedState);
fs.writeFileSync('dist/pickInterfaceState.ts', pickInterfaceState);
