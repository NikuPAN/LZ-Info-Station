import React, { Component } from 'react';
import { Trans, withTranslation } from 'react-i18next';
import lzmark192 from './lzmark192.png';
 
class Home extends Component {
  render() {
    return (
      <div>
        <h2><Trans>WELCOME</Trans></h2>
        {/* <p>這裡是LZ，我們啥都幹 - <br/>
            幹榜幹房幹按鈕幹人和幹人老婆。<br/>
            只要是為了要跑者不睡覺我們啥都幹得出來。<br/>
            我們還有獨特的迫害文化，讓你進群1分鐘馬上懷疑人生。
        </p> */}
        <br/>
        <div>
          <img src={lzmark192} alt="LZ Mark" />
        </div>
        <br/>
        <div>
          <p><Trans>WELCOME_MSG</Trans></p>
        </div>
      </div>
    );
  }
}
 
export default withTranslation()(Home);