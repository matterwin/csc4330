import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button, Alert } from "react-native";
import { login } from '../api/handleAuth';
import { loginSuccess } from '../redux/auth/authActions';
import { useDispatch } from 'react-redux';
import { setUserData } from "../redux/user/userActions";
import { profile } from "../api/handleUser";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

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

        navigation.navigate("Home");
      } else {
        Alert.alert("Login Failed", "Incorrect username or password.");
      }
    } catch (e) {}
  };

  return (
    // this and register page is very similar, so there can be an opportunity to reduce code by making it resuable
    // style this as you wish
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
      <Button title="Login" onPress={handleLogin} />
    </View>
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
});

export default LoginScreen;
