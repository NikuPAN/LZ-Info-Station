import * as actions from '../actions/ActionTypes';

// []

const loginReducer = (state, action) => {
    switch (action.type) {
        case actions.LOGIN:
            return {
                isLoggedIn: true,
                username: action.payload.username,
                userlevel: action.payload.userlevel
            };
        case actions.LOGOUT:
            return {
                isLoggedIn: false,
                username: '',
                userlevel: -1
            };
        default:
            return {
                isLoggedIn: false,
                username: '',
                userlevel: -1
            };
    }
};

export default loginReducer;