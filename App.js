/** @format */

import React from 'react';
import Start from './components/Start';
import Prattle from './components/Prattle';
// import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const navigator = createStackNavigator({
  start: { screen: Start },
  prattle: { screen: Prattle },
});

const navigatorContainer = createAppContainer(navigator);

export default navigatorContainer;

