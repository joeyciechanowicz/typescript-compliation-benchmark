
import * as type from './const';

interface Action {
   type: string;
   value: number;
}


interface State {
    
    thing0_0: number;
    thing0_1: number;
    thing1_0: number;
    thing1_1: number;
    thing2_0: number;
    thing2_1: number;
    thing3_0: number;
    thing3_1: number;
    thing4_0: number;
    thing4_1: number;
}


const updateThing0 = (action: Action): Partial<State> => ({thing0_0: action.value, thing0_1: action.value});

const updateThing1 = (action: Action): Partial<State> => ({thing1_0: action.value, thing1_1: action.value});

const updateThing2 = (action: Action): Partial<State> => ({thing2_0: action.value, thing2_1: action.value});

const updateThing3 = (action: Action): Partial<State> => ({thing3_0: action.value, thing3_1: action.value});

const updateThing4 = (action: Action): Partial<State> => ({thing4_0: action.value, thing4_1: action.value});



function thingReducer(state: State, action: Action) {
    switch (action.type) {
        
        case type.THING_0: return { ...state, ...updateThing0(action) };
        case type.THING_1: return { ...state, ...updateThing1(action) };
        case type.THING_2: return { ...state, ...updateThing2(action) };
        case type.THING_3: return { ...state, ...updateThing3(action) };
        case type.THING_4: return { ...state, ...updateThing4(action) };
    }
}
