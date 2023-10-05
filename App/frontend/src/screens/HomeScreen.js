import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/auth/authActions';
import { loginSuccess } from "../redux/auth/authActions";

const HomeScreen = ({ navigation }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const renderButtons = () => {
    if (isAuthenticated) {
      return (
        <TouchableOpacity onPress={() => dispatch(logout())}>
          <Text>Logout</Text>
        </TouchableOpacity>
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
          <TouchableOpacity onPress={() => dispatch(loginSuccess(null))}>
            <Text>
              Dispatch
            </Text>
          </TouchableOpacity>
        </>
      );
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
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
