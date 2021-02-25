import React, { useRef } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Home from './Home';
import Ranking from './Ranking';
import Rankingtips from './Rankingtips';
import Joke from './Joke';
import AboutLZ from './AboutLZ';
// import Recommend from './Recommend';
// import Login from './Login';
import { useTranslation } from 'react-i18next';
import LangSelector from './LangSelector';
 
const Main = () => {

  const { t } = useTranslation();

  const RankingRef = useRef(Ranking);

  const onChangeLanguage = (e) => {
    // console.log("Language Changed!");
    // RankingRef.current.onChangeLanguage();
  }
  return (
    <HashRouter>
      <div>
        <ul className="header">
          <li key={1}><NavLink exact to="/">{t('MAIN_PAGE')}</NavLink></li>
          <li key={2}><NavLink to="/ranking">{t('TOP10')}</NavLink></li>
          <li key={3}><NavLink to="/rankingtips">{t('RANK_TIPS')}</NavLink></li>
          <li key={4}><NavLink to="/jokes">{t('MEMES')}</NavLink></li>
          <li key={5}><NavLink to="/aboutlz">{t('ABOUT_LZ')}</NavLink></li>
          {/* <li key={6}><NavLink to="/recommend">系統建議</NavLink></li> */}
          {/* <li value='lang_selector'><LangSelector/></li> */}
          {/* <li><NavLink to="/login">登入</NavLink></li> */}
        </ul>
        <LangSelector onChange={onChangeLanguage} />
        <div className="content">
          <Route exact path="/" component={Home}/>
          <Route path="/ranking" component={Ranking} ref={RankingRef} />
          <Route path="/rankingtips" component={Rankingtips}/>
          <Route path="/jokes" component={Joke}/>
          <Route path="/aboutlz" component={AboutLZ}/>
          {/* <Route path="/recommend" component={Recommend}/> */}
          {/* <Route path="/login" component={Login}/> */}
        </div>
      </div>
    </HashRouter>
  );
}
 
export default Main;