import React from "react";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";

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
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(navigator);