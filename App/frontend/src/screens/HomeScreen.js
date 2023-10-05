import React from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../components/authRedux/authActions';

const HomeScreen = ({ navigation }) => {
  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  // const dispatch = useDispatch();

  const isAuthenticated = false;

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
          <Button 
            title="Login Button" 
            onPress={() => navigation.navigate('Login')}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text>
              Login TouchableOpacity
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text>
              Register TouchableOpacity
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
