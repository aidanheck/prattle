/** @format */

import React from 'react';
import Start from './components/Start';
import Prattle from './components/Prattle';
// import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const navigator = createStackNavigator({
  Start: { screen: Start },
  Prattle: { screen: Prattle },
});

const navigatorContainer = createAppContainer(navigator);

export default navigatorContainer;

// const Stack = createStackNavigator();
// export default class App extends Component {
//   render() {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName='Start'>
//           <Stack.Screen name='Start' component={Start} />
//           <Stack.Screen name='Prattle' component={Prattle} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }
// }