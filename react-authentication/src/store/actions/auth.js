import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart =() =>{
    return{
        type: actionTypes.AUTH_START
    };
};

export const authSuccess =(tokenId, userId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: tokenId,
        userId: userId
    };
};


export const authFail =(error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignUp) =>{
    return dispatch =>{
        dispatch(authStart());
        const authData ={
            email: email, 
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBILlHqzmvsZnR9kID59-R-HykMQ9tJH44';
        if(!isSignUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBILlHqzmvsZnR9kID59-R-HykMQ9tJH44'
        }
        axios.post(url, authData).then(response =>{
            console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000)
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(error =>{
            console.log(error)
            dispatch(authFail(error.response.data.error))
        })
    }
}

export const logout =() =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return{
        type: actionTypes.AUTH_LOGOUT
    }

}

export const checkAuthTimeout = (expirationTime) =>{
    return dispatch =>{
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const setAuthRedirectPath = (path) =>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}

export const authCheckState =() =>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout())
        }
        else{
            const expirationDate=new Date(localStorage.getItem('expirationDate'));
            const userId = localStorage.getItem('userId')
            if(expirationDate > new Date()){
                dispatch(authSuccess(token, userId));
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime()- new Date().getTime())/1000
                        )
                    )
            }else{
                dispatch(logout())
            }
            
        }
    }
}
