import React, { Component } from 'react';
import aboutLZ from './aboutlz.png'
import { Trans, withTranslation } from 'react-i18next';

class AboutLZ extends Component {
  render() {
    return (
      <div className="aboutLZ">
        <h2><Trans>ABOUT_LZ</Trans></h2>
        <div>
          <img src={aboutLZ} alt="" width="80%" />
        </div>
      </div>
    );
  }
}

export default withTranslation()(AboutLZ);