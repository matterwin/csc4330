import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Text, StyleSheet, View, Pressable, ActivityIndicator } from "react-native";
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AuthNavigator from './src/navigations/AuthNavigator';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from './src/redux/auth/authActions';
import { logout } from './src/redux/auth/authActions';
import LoadingScreen from './src/screens/LoadingScreen';
import { profile } from './src/api/handleUser';
import { setUserData } from './src/redux/user/userActions';
import { toggleSheet } from './src/redux/sheet/sheetActions';
import { FONTS } from './src/constants';
import { StatusBar } from 'expo-status-bar';
import { 
  useFonts,     
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold, 
} from '@expo-google-fonts/poppins';
import RootNavigator from './src/navigations/RootNavigator';
import FriendSheet from './src/components/FriendSheet';
import AppNavigator from './src/navigations/AppNavigator';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const App = ({ navigation }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const isOpen = useSelector((state) => state.sheet.isOpen);
  const isNotified = useSelector((state) => state.note.isNotified);

  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const checkAuthToken = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");

      if (authToken != null) {
        dispatch(loginSuccess(authToken));
        const userProfile = await profile(authToken);

        if(userProfile.status === 200){
          const user = userProfile.data.user;
          dispatch(setUserData(user));
        } else {
          dispatch(logout());
          dispatch(setUserData(null));
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
  
  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  const LoadingVisual = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
      {isOpen && (
        <>
          <Pressable style={styles.backdrop} onPress={() => dispatch(toggleSheet())} />
          <FriendSheet />
        </>
      )}
      {isNotified && <LoadingVisual />}
    </NavigationContainer>
  );
};

export default AppWrapper;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
  directMessagesTitle: {
    fontFamily: FONTS.Poppins_500,
    marginBottom: 10,
    fontSize: 15
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparnet',
    width: "100%",
    height:"100%",
    position: "absolute",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
});