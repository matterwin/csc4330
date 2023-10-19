import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import BottomTabNavigator from './src/navigations/BottomTabNavigator';
import AuthNavigator from './src/navigations/AuthNavigator';
import { useSelector } from 'react-redux';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <BottomTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppWrapper;
