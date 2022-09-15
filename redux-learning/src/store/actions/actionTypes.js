export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const STORE_RESULT = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT;'

export const increment = () => {
    return {
        type: INCREMENT
    };
};

export const decrement = () => {
    return {
        type: DECREMENT
    };
};
export const add = (val) => {
    return {
        type: ADD,
        value: val
    };
};
export const subtract = (val) => {
    return {
        type: SUBTRACT,
        value: val
    };
};

export const saveResult = (result) => {
    return {
        type: STORE_RESULT,
        result: result
    };
};

export const storeResult = (result) => {
    return function (dispatch) {
        setTimeout(() => {
            dispatch(saveResult(result))
        }, 2000);
    }
};

export const deleteResult = (resultElId) => {
    return {
        type: DELETE_RESULT,
        resultElId: resultElId
    };
};