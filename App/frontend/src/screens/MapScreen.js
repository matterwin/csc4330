import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { ROUTES, COLORS } from '../constants';
import { setUserData } from "../redux/user/userActions";
import Spacer from "../components/containers/Spacer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScrollContainer from "../components/containers/ScrollContainer";
import Container from "../components/Containers/Container";

const MapScreen = ({ navigation }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const logAuthToken = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      console.log("AuthToken:", authToken);
    } catch (error) {
      console.error("Error reading authToken from AsyncStorage:", error);
    }
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
    <ScrollContainer>
      <Container>
        <Text>Map Screen</Text>
        <Spacer height={10} />
        {renderButtons()}
      </Container>
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default MapScreen;
