import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ChatScreen from './src/screens/ChatScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import BottomNav from './src/components/BottomNav';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: () => <CustomHeaderTitle />,
        headerShown: false,
        gestureEnabled: true,
        transitionSpec: {
          open: { animation: 'timing', config: { duration: 0 } }, // Disable animation
          close: { animation: 'timing', config: { duration: 0 } }, // Disable animation
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}         
        options={{
        }}
      />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{
          title: 'Chat',
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
        <BottomNav />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
