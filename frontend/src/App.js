import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './App.css';
import "./index.css";
import Main from './component/Main.js';
import UserStore from "./stores/UserStore";

class App extends Component {
    
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
        UserStore.userlevel = result.userlevel;
      }
      else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
        UserStore.userlevel = -1;
      }

    }
    catch(e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
      UserStore.userlevel = -1;
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Main />
        </header>
      </div>
    );
  }
  
}

export default observer(App);
