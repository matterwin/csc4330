import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import BottomTabNavigator from './src/navigations/BottomTabNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabNavigator/>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
