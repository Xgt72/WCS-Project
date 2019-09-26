import React, { Component } from 'react';
import ThreeEntryPoint from './threejs/ThreeEntryPoint';
import './header.css';

export default class ThreeContainer extends Component {
  componentDidMount() {
    new ThreeEntryPoint(this.threeRootElement);
  }

  render() {
    return (
      <div
        className="header-header"
        ref={(element) => {
          this.threeRootElement = element;
          return element;
        }}
      />
    );
  }
}
