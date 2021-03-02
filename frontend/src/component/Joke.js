import React, { Component } from 'react';
import { Trans, withTranslation } from 'react-i18next';
 
class Joke extends Component {
  render() {
    return (
      <div>
        <h2><Trans>MEMES</Trans></h2>
        <div>

        </div>
      </div>
    );
  }
}

export default withTranslation()(Joke);