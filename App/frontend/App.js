import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { Provider } from 'react-redux';
import { Text, StyleSheet, View, Pressable, ActivityIndicator, LogBox } from "react-native";
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AuthNavigator from './src/navigations/AuthNavigator';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from './src/redux/auth/authActions';
import { logout } from './src/redux/auth/authActions';
import LoadingScreen from './src/screens/Util/LoadingScreen';
import { profile } from './src/api/handleUser';
import { setUserData } from './src/redux/user/userActions';
import { toggleSheet } from './src/redux/sheet/sheetActions';
import { COLORS, FONTS } from './src/constants';
import { StatusBar } from 'expo-status-bar';
import { 
  useFonts,     
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold, 
} from '@expo-google-fonts/poppins';
import FriendSheet from './src/components/Sheets/FriendSheet';
import AppNavigator from './src/navigations/AppNavigator';
import ParticipantsSheet from './src/components/Sheets/ParticipantsSheet';
import { GestureHandlerRootView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import FriendInfoSheet from './src/components/Sheets/FriendInfoSheet';
import InvitePeopleSheet from './src/components/Sheets/InvitePeopleSheet';

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
  const isOpenForParticipants = useSelector((state) => state.sheet.participantsSheet.isOpen);
  const isOpenForFriendInfo = useSelector((state) => state.sheet.friendInfoSheet.isOpen);
  const isOpenForInvitePeople = useSelector((state) => state.sheet.invitePeopleSheet.isOpen);
  const isNotified = useSelector((state) => state.note.isNotified);
  const token = useSelector(state => state.auth.token);

  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();

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
      console.log(authToken);

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
      } else {
        dispatch(logout());
        dispatch(setUserData(null));
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="dark" />
        {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
        {isOpenForParticipants && (
            <ParticipantsSheet />
        )}
        {isOpenForFriendInfo && (
            <FriendInfoSheet />
        )}
        {isOpenForInvitePeople && (
            <InvitePeopleSheet />
        )}
        {isNotified && <LoadingVisual />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppWrapper;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
  sheet: {
    width: "100%",
    height:"100%",
    position: "absolute",
    zIndex: 1,
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
});