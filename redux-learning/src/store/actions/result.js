import * as actionTypes from './actionTypes';

export const saveResult = (result) => {
    return {
        type: actionTypes.STORE_RESULT,
        result: result
    };
};

export const storeResult = (result) => {
    return function (dispatch, getState) {
        setTimeout(() => {
            dispatch(saveResult(result))
        }, 2000);
    }
};

export const deleteResult = (resultElId) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: resultElId
    };
};