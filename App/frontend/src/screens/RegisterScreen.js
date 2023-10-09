import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button, Alert } from "react-native";
import { register } from '../api/handleAuth';
import { loginSuccess } from '../redux/auth/authActions';
import { useDispatch } from 'react-redux';
import { setUserData } from "../redux/user/userActions";
import { profile } from "../api/handleUser";
import AsyncStorage from '@react-native-async-storage/async-storage';
import GestureRecognizer from 'react-native-swipe-gestures';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onSwipeRight = () => {
    navigation.navigate("LoginAuth");
  };

  const handleRegister = async () => {
    try {
      const res = await register(username, email, password);
      if(res.status === 201){
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
      }
      else
        Alert.alert("Register Failed", "Invalid creds...");
    } catch (e) {}
  };

  const config = {
    velocityThreshold: 0.0,
    directionalOffsetThreshold: 80
  };

  return (
    <GestureRecognizer
    onSwipeRight={onSwipeRight}
    config={config}
    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.text}>Register Screen</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Button title="Register" onPress={handleRegister} />
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
});

export default RegisterScreen;
