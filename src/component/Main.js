import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Home from "./Home";
import Ranking from "./Ranking";
import Rankingtips from "./Rankingtips";
import Joke from "./Joke";
import AboutLZ from "./AboutLZ";
import Recommend from "./Recommend";
import Login from "./Login";
 
class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          {/* <h2>LZ資訊站</h2> */}
          <ul className="header">
            <li><NavLink exact to="/">主頁</NavLink></li>
            <li><NavLink to="/ranking">股票</NavLink></li>
            <li><NavLink to="/rankingtips">排名攻略</NavLink></li>
            <li><NavLink to="/jokes">梗/梗圖/SY</NavLink></li>
            <li><NavLink to="/aboutlz">關於LZ</NavLink></li>
            <li><NavLink to="/recommend">系統建議</NavLink></li>
            <li><NavLink to="/login">登入</NavLink></li>
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