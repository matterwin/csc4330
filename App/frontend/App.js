import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { Image } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const CustomHeaderTitle = () => (
  <Image
    source={require('./assets/logotest.png')}
    style={{ width: 150, height: 40 }}
  />
);

const navigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerTitle: () => <CustomHeaderTitle />,
      },
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: 'Login',
      },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        title: 'Register',
      },
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(navigator);

const App = () => {
  return (
    <Provider store={store}>
        <AppContainer />
    </Provider>
  );
};

export default App;
