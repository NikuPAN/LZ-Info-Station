import * as actions from './ActionTypes';

export const login = (username, userlevel) => {
    return {
        type: actions.LOGIN,
        payload: {
            username: username,
            userlevel: userlevel
        }
    };
};

export const logout = () => {
    return {
        type: actions.LOGOUT,
        payload: {
            username: '',
            userlevel: -1
        }
    };
};