import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button, Alert } from "react-native";
import { login } from '../api/handleAuth';
import { loginSuccess } from '../redux/auth/authActions';
import { useSelector, useDispatch } from 'react-redux';

const user = {
  username: 'exampleUser',
  email: 'user@example.com',
  profilePic: 'cloudinary-link',
};

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await login(username, password);
      if (res.status === 200) {
        dispatch(loginSuccess(res.token));
        await AsyncStorage.setItem("authToken", res.token);
        console.log(res);
        navigation.navigate("Home");
      } else {
        Alert.alert("Login Failed", "Incorrect username or password.");
      }
    } catch (e) {}
  };

  return (
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
