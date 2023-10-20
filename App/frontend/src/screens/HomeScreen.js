import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/auth/authActions';
import { ROUTES, COLORS } from '../constants';
import { setUserData } from "../redux/user/userActions";
import Spacer from "../components/Spacer";
import GestureRecognizer from 'react-native-swipe-gestures';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setUserData(null));
  };

  const logAuthToken = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      console.log("AuthToken:", authToken);
    } catch (error) {
      console.error("Error reading authToken from AsyncStorage:", error);
    }
  };

  const onSwipeLeft =  () => {
    navigation.navigate(ROUTES.MAP);
  };

  const onSwipeRight = () => {
    navigation.navigate(ROUTES.FRIEND);
  };

  const config = {
    velocityThreshold: 0,
    directionalOffsetThreshold: 80,
  };

  const renderButtons = () => {
    if (isAuthenticated) {
      logAuthToken();
      return (
        <>
          <Text>
            Username: {user.username}
          </Text>
          <Text>
            Email: {user.email}
          </Text>
          <Image
            source={user.profilePic ? { uri: user.profilePic } : null}
            style={{ width: 100, height: 100 }}
          />
          <Spacer height={20} />
          <TouchableOpacity onPress={handleLogout}>
            <Text> Logout </Text>
          </TouchableOpacity>
        </>
      );
    } else {
      return (
        <>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text>
              Register
            </Text>
          </TouchableOpacity>
        </>
      );
    }
  };

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      config={config}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Spacer height={10} />
        {renderButtons()}
      </View>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
