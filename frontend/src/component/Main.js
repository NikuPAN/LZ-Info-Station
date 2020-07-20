import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
//import { observer } from 'mobx-react';
import Home from "./Home";
import Ranking from "./Ranking";
import Rankingtips from "./Rankingtips";
import Joke from "./Joke";
import AboutLZ from "./AboutLZ";
import Recommend from "./Recommend";
import Login from "./Login";
import UserStore from "../stores/UserStore";
 
class Main extends Component {

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
      <HashRouter>
        <div>
          {console.log("logged in?: ", UserStore.isLoggedIn)}
          <ul className="header">
            <li><NavLink exact to="/">主頁</NavLink></li>
            <li><NavLink to="/ranking">股票</NavLink></li>
            <li><NavLink to="/rankingtips">排名攻略</NavLink></li>
            <li><NavLink to="/jokes">梗/梗圖/SY</NavLink></li>
            <li><NavLink to="/aboutlz">關於LZ</NavLink></li>
            <li><NavLink to="/recommend">系統建議</NavLink></li>
            {(!UserStore.isLoggedIn) ? (
              <li><NavLink to="/login">登入</NavLink></li>
            ) : (
              <li>歡迎 {UserStore.username} </li>
            )}
            {(UserStore.isLoggedIn) ? (
              <li onClick={() => this.doLogout()}>登出</li>) : ( null )
            }
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/ranking" component={Ranking}/>
            <Route path="/rankingtips" component={Rankingtips}/>
            <Route path="/jokes" component={Joke}/>
            <Route path="/aboutlz" component={AboutLZ}/>
            <Route path="/recommend" component={Recommend}/>
            <Route path="/login" component={Login}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default Main;