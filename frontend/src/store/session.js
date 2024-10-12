import { csrfFetch } from './csrf';

const SET_SESSION_USER = 'session/SET_SESSION_USER';
export const setSessionUserAction = (user) => {
    return {
        type: SET_SESSION_USER,
        user
    }
};

const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';
export const removeSesssionUserAction = () => {
    return {
        type: REMOVE_SESSION_USER
    }
};

export const login = (credential, password) => async (dispatch) => {
    const response = await csrfFetch(
        '/api/session',
        {
            method: 'POST',
            body: JSON.stringify({ credential, password })
        });
    if (response.ok) {
        const data = await response.json();
        dispatch(setSessionUserAction(data.user));
        return response;
    }


}




const intialState = { user: null };

const sessionReducer = (state = intialState, action) => {
    switch (action.type) {
        case SET_SESSION_USER:
            return {
                ...state,
                user: action.user,
            };
        case REMOVE_SESSION_USER:
            return { ...state, user: null };
        default:
            return state;
    };
};

export default sessionReducer;
