import { extendObservable } from 'mobx';

/**
 * UserStore
 */

class UserStore {

    constructor() {
        extendObservable(this, {

            loading: true,
            isLoggedIn: false,
            username: '',
            userlevel: -1
        })
    }
}

export default new UserStore();