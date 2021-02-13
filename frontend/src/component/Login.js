import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LoginForm from './LoginForm';
 
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

  }

  render() {
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

export default Login;