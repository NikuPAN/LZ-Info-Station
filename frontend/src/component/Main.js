import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Home from './Home';
import Ranking from './Ranking';
import Rankingtips from './Rankingtips';
import Joke from './Joke';
import AboutLZ from './AboutLZ';
import Recommend from './Recommend';
// import Login from './Login';
 
class Main extends Component {

  render() {
    return (
      <HashRouter>
        <div>
          <ul className="header">
            <li key={1}><NavLink exact to="/">主頁</NavLink></li>
            <li key={2}><NavLink to="/ranking">股票</NavLink></li>
            <li key={3}><NavLink to="/rankingtips">排名攻略</NavLink></li>
            <li key={4}><NavLink to="/jokes">梗/梗圖</NavLink></li>
            <li key={5}><NavLink to="/aboutlz">關於LZ</NavLink></li>
            <li key={6}><NavLink to="/recommend">系統建議</NavLink></li>
            {/* <li><NavLink to="/login">登入</NavLink></li> */}
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/ranking" component={Ranking}/>
            <Route path="/rankingtips" component={Rankingtips}/>
            <Route path="/jokes" component={Joke}/>
            <Route path="/aboutlz" component={AboutLZ}/>
            <Route path="/recommend" component={Recommend}/>
            {/* <Route path="/login" component={Login}/> */}
          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default Main;