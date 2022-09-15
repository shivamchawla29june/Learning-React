import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    results: []
}

const deleteResult = (state,action) =>{
    const updatedArray = state.results.filter(result => result.id !== action.resultElId);
    return  updateObject(state, { results: updatedArray });
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return updateObject(state, { results: state.results.concat({ id: new Date(), value: action.result }) })

        case actionTypes.DELETE_RESULT:
            // const id=2;
            // const newArray=[...state.result];
            // newArray.splice(id, 1)
            return deleteResult(state, action)
    }
    return state;
}

export default reducer;