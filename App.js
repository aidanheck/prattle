/** @format */
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Start from './components/Start';
import Prattle from './components/Prattle';

const navigator = createStackNavigator({
  start: { screen: Start },
  prattle: { screen: Prattle },
});

const navigatorContainer = createAppContainer(navigator);

export default navigatorContainer;
