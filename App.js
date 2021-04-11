/** @format */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Start from './components/Start';
import Prattle from './components/Prattle';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const navigator = createStackNavigator({
  Start: { screen: Start },
  Prattle: { screen: Prattle },
});

const navigatorContainer = createAppContainer(navigator);

export default navigatorContainer;
