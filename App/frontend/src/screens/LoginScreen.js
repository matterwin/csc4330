import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button, Alert } from "react-native";
import { login } from '../api/handleAuth';
import { loginSuccess } from '../redux/auth/authActions';
import { useDispatch } from 'react-redux';
import { setUserData } from "../redux/user/userActions";
import { profile } from "../api/handleUser";
import AsyncStorage from '@react-native-async-storage/async-storage';
import GestureRecognizer from 'react-native-swipe-gestures';
import { ROUTES } from "../constants";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onSwipeLeft = () => {
    navigation.navigate(ROUTES.REGISTER);
  };

  const handleLogin = async () => {
    try {
      const res = await login(username, password);
      if (res.status === 200) {
        dispatch(loginSuccess(res.token));
        
        const resProfile = await profile(res.data.token);

        if(resProfile.status === 200){
          const user = resProfile.data;
          dispatch(setUserData(user));
        }

        try {
          await AsyncStorage.setItem("authToken", res.data.token);
        } catch (error) {
          console.error("Error storing authToken:", error);
        }

        console.log("Before navigation to RootNavigator");
        navigation.navigate("RootNavigator");
        console.log("After navigation to RootNavigator");
      } else {
        Alert.alert("Login Failed", "Incorrect username or password.");
      }
    } catch (e) {}
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      config={config}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.text}>Login Screen</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Button title="Login" onPress={handleLogin} style={styles.loginButton}/>
      </View>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: 'red',
    color: 'red',
    tintColor: 'red'
  }
});

export default LoginScreen;
