import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LoginForm from './LoginForm';
import store from '../store';
import * as manager from './Manager';
 
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
    manager.isLoggedIn();
  }

  render() {
    if(store.getState().isLoggedIn) {
      return (
        <div>
          <h1>
            你已經登入了，{store.getState().userlevel} 級使用者 {store.getState().username}！
          </h1>
          <div className={this.state.classes.root}>
            <Button variant="contained" color="secondary" onClick={() => manager.doLogout()}>
              登出
            </Button>
          </div>
        </div>
      );
    }
    else {
      return (
        <div>
          <h2>登入進行管理</h2>
          <div>
              <LoginForm />
          </div>
        </div>
      );
    }
  }
}

export default Login;