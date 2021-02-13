import React, { Component } from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import TextField from "@material-ui/core/TextField";
// import IconButton from '@material-ui/core/IconButton';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormControl from '@material-ui/core/FormControl';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';

// import UserStore from '../stores/UserStore';
import store from '../store';
import * as acts from '../actions/index';

 
class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      password: '',
      username: '',
      errorMsg: '',
      loginDisabled: false,
      resetDisabled: true,
      useStyles: makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          border: '1px solid #e2e2e1',
          overflow: 'hidden',
          borderRadius: 4,
          backgroundColor: '#fcfcfb',
          transition: theme.transitions.create(['border-color', 'box-shadow']),
          '&:hover': {
            backgroundColor: '#fff',
          },
          '&$focused': {
            backgroundColor: '#fff',
            borderColor: theme.palette.primary.main,
          },
        },
        margin: {
          margin: theme.spacing(1),
        },
        withoutLabel: {
          marginTop: theme.spacing(3),
        },
        textField: {
          width: '25ch',
        },
      })),
      classes: this.useStyles

    }
  }

  onUsernameFieldChange = (event) => {
    var val = event.target.value;
    this.setState({
      username: (val != null ? val : ''),
      resetDisabled: ((val !== '' || this.state.username !== '') ? false : true)
    });
  };

  onPasswordFieldChange = (event) => {
    var val = event.target.value;
    this.setState({
      password: (val != null ? val : ''),
      resetDisabled: ((val !== '' || this.state.username !== '') ? false : true)
    });
  };

  onClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword 
    });
  };

  onMouseDownPassword = (event) => {
    event.preventDefault();
  };

  resetForm = () => {
    this.setState({
      username: '',
      password: '',
      loginDisabled: false,
      resetDisabled: true
    });
  };

  async doLogin() {
    if(!this.state.username) {
      return;
    }
    if(!this.state.password) {
      return;
    }

    this.setState({
      loginDisabled: true,
      resetDisabled: true
    });

    try {
      let res = await fetch('/login', {
        method: 'post',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });

      let result = await res.json();
      if(result && result.success) {
        store.dispatch(acts.login(result.username, result.userlevel));
        this.setState({
          errorMsg: ''
        });
      }
      else if(result && result.success === false) {
        this.resetForm();
        // alert(result.msg);
        this.setState({
          errorMsg: result.msg
        });
      }
    }
    catch(e) {
      console.log(e);
      this.resetForm();
      this.setState({
        errorMsg: ''
      });
    }
  }

  render() {
    return (
      <div className="loginForm">
        <table>
            <tr>
              {/* <td><label>用戶名:&nbsp;&nbsp;</label></td> */}
              <td>
                <input className="login-input" 
                  id="login-field" 
                  type="text" 
                  placeholder="用戶ID"
                  value={this.state.username} 
                  onChange={this.onUsernameFieldChange} 
                />
              </td>
            </tr>
            <tr>
              {/* <td><label>密碼:&nbsp;&nbsp;</label></td> */}
              <td>
                <input className="login-input" 
                  id="password-field" 
                  type="password" 
                  placeholder="密碼"
                  value={this.state.password} 
                  onChange={this.onPasswordFieldChange} 
                />
              </td>
            </tr>
            <tr>
              <h6>{this.state.errorMsg}</h6>
            </tr>
            <tr>
              {/* <td></td> */}
              <td>
                <Button 
                  className="loginbuttons"
                  id="reset-button"
                  variant="contained" 
                  color="secondary"
                  disabled={this.state.resetDisabled}
                  onClick={this.resetForm}
                >重設</Button>
                &nbsp;&nbsp;
                <Button 
                  className="loginbuttons"
                  id="login-button"
                  variant="contained" 
                  color="primary" 
                  disabled={this.state.loginDisabled}
                  onClick={() => this.doLogin()}
                >登入</Button>
              </td>
            </tr>
          </table>
        {/* <div>
         <FormControl fullWidth className={clsx(this.state.useStyles.margin, this.state.useStyles.textField)} variant="outlined">
            <InputLabel htmlFor="username-field">用戶名稱</InputLabel>
            <OutlinedInput
              id="username-field"
              type="text"
              value={this.state.username}
              className={this.state.useStyles.root}

              onChange={this.onUsernameFieldChange}
              labelWidth={65}
            />
          </FormControl>
        </div>
        <br/>
        <div>
          <FormControl fullWidth className={clsx(this.state.useStyles.margin, this.state.useStyles.textField)} variant="outlined">
            <InputLabel htmlFor="password-field">密碼</InputLabel>
            <OutlinedInput
              id="password-field"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              className={this.state.useStyles.root}

              onChange={this.onPasswordFieldChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.onClickShowPassword}
                    onMouseDown={this.onMouseDownPassword}
                    edge="end"
                  >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={30}
            />
          </FormControl>
        </div> */}
      </div>
    );
  }
}

export default LoginForm;