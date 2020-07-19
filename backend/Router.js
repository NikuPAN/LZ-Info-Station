/* Router.js provides everything you need from backend.
 * Ask before make any changes.
 */

const bcrypt = require('bcrypt');

class Router {

    constructor(app, db) {
        this.login(app, db);
        this.logout(app, db);
        this.isLoggedIn(app, db);
        this.updateEventDetail(app, db);
    }

    login(app, db) {

        app.post('/login', (req, res) => {

            let username = req.body.username;
            let passwaord = req.body.password;

            username = username.toLowerCase();
            if(username.length > 24 || password.length > 24) {
                res.json({
                    success: false,
                    msg: '使用者名稱或密碼不應長於24字符！'
                })
                return;

                let cols = [username];
                db.query('SE');
            }
        });

    }

    logout(app, db) {

    }

    isLoggedIn(app, db) {

    }

    

}

module.exports = Router;