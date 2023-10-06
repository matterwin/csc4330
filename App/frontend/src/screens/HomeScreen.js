import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/auth/authActions';
import { setUserData } from "../redux/user/userActions";
import Spacer from "../components/Spacer";

const HomeScreen = ({ navigation }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setUserData(null));
  };

  const renderButtons = () => {
    if (isAuthenticated) {
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Spacer height={10} />
      {renderButtons()}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
