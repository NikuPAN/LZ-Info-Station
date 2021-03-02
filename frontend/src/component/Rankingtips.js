import React, { Component } from "react";
import abcsleep from '../background/abcsleep.png';
import { Trans, withTranslation } from 'react-i18next';
 
class Rankingtips extends Component {
  render() {
    return (
      <div>
        <h2><Trans>RANK_TIPS</Trans></h2>
        <div>
          <img src={abcsleep} atl="" width="50%" />
        </div>
        <h2>學青葉ＡＢＣ不睡覺就可以了。</h2>
      </div>
    );
  }
}

export default withTranslation()(Rankingtips);