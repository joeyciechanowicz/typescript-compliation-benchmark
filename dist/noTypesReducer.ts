
import * as type from './const';


const updateThing0 = action => ({thing0a: action.value, thing0b: action.value});

const updateThing1 = action => ({thing1a: action.value, thing1b: action.value});

const updateThing2 = action => ({thing2a: action.value, thing2b: action.value});

const updateThing3 = action => ({thing3a: action.value, thing3b: action.value});

const updateThing4 = action => ({thing4a: action.value, thing4b: action.value});


function thingReducer(state, action) {
    switch (action.type) {
        
        case type.THING_0: return { ...state, ...updateThing0(action) };
        case type.THING_1: return { ...state, ...updateThing1(action) };
        case type.THING_2: return { ...state, ...updateThing2(action) };
        case type.THING_3: return { ...state, ...updateThing3(action) };
        case type.THING_4: return { ...state, ...updateThing4(action) };
    }
}
