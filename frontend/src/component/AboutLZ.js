import React, { Component } from 'react';
import aboutLZ from './aboutlz.png'
class AboutLZ extends Component {
  render() {
    return (
      <div className="aboutLZ">
        <h2>關於LZ？就是這樣而已。</h2>
        <div>
          <img src={aboutLZ} atl="" width="80%" />
        </div>
      </div>
    );
  }
}

export default AboutLZ;