// Check login status, do login or logout should be done within 1 manager.
import store from '../store';
import * as acts from '../actions/index';

export const isLoggedIn = async() => {
    try {
        let res = await fetch('/isLoggedIn', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        let result = res.json(); // await needed?
        if(result && result.success) {
          store.dispatch(acts.login(result.username, result.userlevel));
          console.log(store.getState().login);
        }
        else {
          store.dispatch(acts.logout);
        }
    }
    catch(e) {
        store.dispatch(acts.logout);
    }
};

export const doLogin = async(username, password) => {
    // Implement later
}

export const doLogout = async() => {
    try {
        let res = await fetch('/logout', {
            method: 'post',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        });

        let result = res.json(); // await needed?
        if(result && result.success) {
            store.dispatch(acts.login.logout());
        }
    }
    catch(e) {
        // In case if have error.
        console.log(e);
    }
}