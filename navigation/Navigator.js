import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Header from '../components/Header';

const AppNavigator = createStackNavigator({
  Detail: {
    screen: Detail,
    navigationOptions: {
      header: () => <Header />,
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: () => <Header />,
    },
  },
});

export default createAppContainer(AppNavigator);
