import loginReducer from './isLoggedIn';
// You can import more here...
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    login: loginReducer
    //... you can add more here..
})

export default allReducers;