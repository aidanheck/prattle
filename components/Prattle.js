/** @format */

import React, { Component } from 'react';
import { View } from 'react-native';
/**
 * @class Prattle
 * @requires React
 * @requires React-native
 */

export default class Prattle extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }
  render() {
    /**Prattle component uses user name and background color defined in Start component */
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.props.navigation.state.params.color,
        }}
      ></View>
    );
  }
}