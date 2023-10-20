import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import BottomTabNavigator from './src/navigations/BottomTabNavigator';
import AuthNavigator from './src/navigations/AuthNavigator';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from './src/redux/auth/authActions';
import LoadingScreen from './src/screens/LoadingScreen';
import { profile } from './src/api/handleUser';
import { setUserData } from './src/redux/user/userActions';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthToken = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");

      if (authToken) {
        dispatch(loginSuccess(authToken));
        const userProfile = await profile(authToken);

        if(userProfile.status === 200){
          const user = userProfile.data;
          dispatch(setUserData(user));
        }
      }
    } catch (err) {
      console.error("Error reading authToken from AsyncStorage:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (isLoading) {
    // Display a loading screen while checking for the authToken and its validation
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <BottomTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppWrapper;
