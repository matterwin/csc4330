import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, FONTS } from "../../constants"; 
import { setUserData } from "../../redux/user/userActions";
import InnerProfileNavigator from "../../navigations/InnerProfileNavigator";
import UserImageIcon from "../../components/Upload/UserImageIcon";
import * as Haptics from 'expo-haptics';

const ProfileLayoutScreen = ({ navigation }) => {
  const [isPressed, setIsPressed] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleOnTouchStart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsPressed(true);
    navigation.navigate("EditProfileScreen");
  };

  const handleOnTouchEnd = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsPressed(false);
  };

  return (
    <>
      <View style={styles.container}>
        <UserImageIcon url={user.profilePic} width={130} height={130}/>
        <Text style={styles.realName}>{user.realName}</Text>
        <View
          style={[ styles.editBtn, { backgroundColor: isPressed ? COLORS.darkgrey : COLORS.grey },]}
          onTouchStart={handleOnTouchStart}
          onTouchEnd={handleOnTouchEnd}
        >
            <Text style={styles.btnText}>Edit Profile</Text>
        </View>
      </View>
      <InnerProfileNavigator/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgColor,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  realName: {
    fontFamily: FONTS.Poppins_500,
    fontSize: 15,
    marginTop: 20
  },
  editBtn: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    width: '100%',
    marginTop: 10
  },
  btnText: {
    fontFamily: FONTS.Poppins_600,
    color: '#fff',
    fontSize: 15,
  },
});

export default ProfileLayoutScreen;