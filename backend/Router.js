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
            let password = req.body.password;

            username = username.toLowerCase();
            if(username.length > 24 || password.length > 24) {
                res.json({
                    success: false,
                    msg: '使用者名稱或密碼不應長於24字符！'
                })
                return;
            }

            let cols = [username];
            db.query('SELECT * FROM user WHERE username = ? LIMIT 1', cols, (err, data, fields) => {

                if(err) {
                    res.json({
                        success: false,
                        msg: 'An error occured, please try again'
                    })
                    return;
                }
                // If such userdata exists.
                if(data && data.length === 1) {
                    bcrypt.compare(password, data[0].password, (bcryptErr, verified) => {
                        console.log(bcrypt.hashSync(password, 12), data[0].password);
                        if(verified) {
                            req.session.userID = data[0].id;
                            res.json({
                                success: true,
                                username: data[0].username,
                                userlevel: data[0].userlevel
                            })
                            return;
                        }
                        // If password does not match database's record
                        else {
                            res.json({
                                success: false,
                                msg: 'Invalid password'
                            })
                        }
                    });
                }
                // The userdata does not exist.
                else {
                    res.json({
                        success: false,
                        msg: 'User not found, please try again'
                    })
                }
            });
        });

    }

    logout(app, db) {

        app.post('/logout', (req, res) => {

            if(req.session.userID) {
                
                req.session.destroy();
                res.json({
                    success: true
                })
                return true;
            }
            else {
                res.json({
                    success: false
                })
                return false;
            }
        })
    }

    isLoggedIn(app, db) {

        app.post('/isLoggedIn', (req, res) => {
            
            if(req.session.userID) {

                let cols = [req.session.userID];
                db.query('SELECT * FROM user WHERE id = ? LIMIT 1', cols, (err, data, fields) => {
                    
                    if(data && data.length === 1) {
                        
                        res.json({
                            success: true,
                            username: data[0].username,
                            userlevel: data[0].userlevel
                        })
                        return true;
                    }
                    else {
                        res.json({
                            success: false
                        })
                    }
                })
            }
            else {
                res.json({
                    success: false
                })
            }

        });
    }

    updateEventDetail(app, db) {

    }

}

module.exports = Router;