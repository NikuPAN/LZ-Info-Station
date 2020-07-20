import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import UserStore from "../stores/UserStore";
import LoginForm from "./LoginForm";
 
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      useStyles: makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
      })),
      classes: this.useStyles
    }
  }

  async componentDidMount() {
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
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }
      else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }

    }
    catch(e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  async doLogout() {
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
        UserStore.isLoggedIn = false;
        UserStore.username = '';
        UserStore.userlevel = -1;
      }

    }
    catch(e) {
      // In case if have error.
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        {(UserStore.isLoggedIn) ? (
          <div>
            <h1>
              你已經登入了，{UserStore.userlevel} 級使用者 {UserStore.username}！
            </h1>
            <div className={this.state.classes.root}>
              <Button variant="contained" color="secondary" onClick={() => this.doLogout()}>
                登出
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h2>登入進行管理 {UserStore.isLoggedIn}</h2>
            <div>
                <LoginForm />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Login;