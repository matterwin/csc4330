import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, Alert, KeyboardAvoidingView } from "react-native";
import { register } from '../../api/handleAuth';
import { loginSuccess } from '../../redux/auth/authActions';
import { useDispatch } from 'react-redux';
import { setUserData } from "../../redux/user/userActions";
import { profile } from "../../api/handleUser";
import AsyncStorage from '@react-native-async-storage/async-storage';
import GestureRecognizer from 'react-native-swipe-gestures';
import { COLORS, FONTS } from "../../constants";
import UserImageIcon from "../../components/Upload/UserImageIcon";
import Icon from 'react-native-vector-icons/Ionicons';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [next, setNext] = useState(false);
  const dispatch = useDispatch();

  const onSwipeRight = () => {
    navigation.navigate("Login");
  };

  const handleInputChange = (text, field) => {
    switch (field) {
      case 'username':
        setUsername(text);
        break;
      case 'email':
        setEmail(text);
        break;
      case 'password':
        setPassword(text);
        break;
      default:
        break;
    }

    if (username.trim().length > 0 && email.trim().length > 0 && password.trim().length > 0) {
      setNext(true);
    } else {
      setNext(false);
    }
  };

  const handleRegister = () => {
    if(next) registerCall();
  };

  const registerCall = async () => {
    try {
      const res = await register(username, email, password);

      if(res.status === 201){
        dispatch(loginSuccess(res.data.token));
        await AsyncStorage.setItem("authToken", res.data.token);

        const userProfile = await profile(res.data.token);

        if(userProfile.status === 200){
          const userProfile = await profile(res.data.token);

          if(userProfile.status === 200){
            const user = userProfile.data.user;
            dispatch(setUserData(user));
          }
        }
      }
      else
        Alert.alert("Register Failed", "Invalid creds...");
    } catch (e) {}
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  return (
    <GestureRecognizer
      onSwipeRight={onSwipeRight}
      config={config}
      style={ styles.gestureContainer }
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ width: '100%', display: 'flex', flex: 1 }}>
        <View style={ styles.screenContainer }>
          <View style={{ marginBottom: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <UserImageIcon width={130} height={130}/>
            <Text style={{ fontFamily: FONTS.Poppins_500, fontSize: 20 }}>Social Eyes</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => handleInputChange(text, 'username')}
            value={username}
            placeholderTextColor={COLORS.grey}
          />
          <TextInput
            style={styles.input}
            placeholder="@ Email Address"
            onChangeText={(text) => handleInputChange(text, 'email')}
            value={email}
            placeholderTextColor={COLORS.grey}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => handleInputChange(text, 'password')}
            value={password}
            placeholderTextColor={COLORS.grey}
          />
          <View style={{ marginLeft: 'auto' }}>
            <Text style={[styles.otherBtnText, { fontFamily: FONTS.Poppins_500 }]}>Terms of Service</Text>
          </View>
          <View style={styles.btnContainer} onTouchStart={handleRegister}>
            <View style={[ styles.sendBtn, { width: '100%', backgroundColor: next ? COLORS.primary : COLORS.grey }]}>
                <Text style={styles.btnText}>Sign Up</Text>
            </View>
          </View>
          <View style={styles.Or}>
            <View style={[styles.borderLine, { marginLeft: 20}]}></View>
            <View><Text>OR</Text></View>
            <View style={[styles.borderLine, { marginRight: 20}]}></View>
          </View>
          <View style={styles.otherBtnContainer}>
            <View style={[ styles.otherBtn ]}>
              <Icon name="arrow-back" size={26} color={COLORS.primary} style={{ marginRight: 5 }} />
              <Text style={styles.otherBtnText}>Swipe Right to 
                  <Text style={{ color: COLORS.primary, fontFamily: FONTS.Poppins_700}} onPress={() => navigation.navigate("Login")}> Log In</Text>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: COLORS.grey,
    borderWidth: 1,
    fontSize: 15,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)', // Adjust the shadow color and opacity
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1, // Adjust the shadow opacity
    shadowRadius: 2, // Adjust the shadow radius
    elevation: 2, // For Android
  },
  gestureContainer: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: COLORS.bgColor, 
  },
  screenContainer: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%',
    marginBottom: 85,
    gap: 10,
    paddingHorizontal:10
  },
  borderLine: {
    borderBottomWidth: 1,
    borderColor: COLORS.darkgrey,
    marginTop: 30,
    width: '25%',
    marginBottom: 5,
  },
  Or: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btnContainer: {
    width: "100%",
    // paddingHorizontal: 10,
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  sendBtn: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  btnText: {
    fontFamily: FONTS.Poppins_600,
    color: '#fff',
    fontSize: 15,
  },
  otherBtn: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  otherBtnContainer: {
    width: "100%",
    // paddingHorizontal: 10,
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  otherBtnText: {
    fontFamily: FONTS.Poppins_400,
    color: COLORS.darkgrey,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
});

export default RegisterScreen;
