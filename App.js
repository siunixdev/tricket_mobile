import React from 'react';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from './src/screen/Home';
import CategoryDetail from './src/screen/CategoryDetail';
import EventDetail from './src/screen/EventDetail';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'DUMB-TICK',
        headerStyle: {
          backgroundColor: '#CA4040',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    Detail: {
      screen: CategoryDetail,
      navigationOptions: ({navigation}) => ({
        title: 'DUMB-TICK',
        headerStyle: {
          backgroundColor: '#CA4040',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }),
    },
    EventDetail: {
      screen: EventDetail,
      navigationOptions: ({navigation}) => ({
        id: navigation.state.params.id,
        title: 'DUMB-TICK',
        headerStyle: {
          backgroundColor: '#CA4040',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }),
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AppNavigator);
