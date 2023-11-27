import React, { useRef, useState } from 'react';
import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';
import InnerProfileNavigator from '../../navigations/InnerProfileNavigator';
import HobbiesList from '../../components/Profile/HobbiesList';
import EventList from '../../components/Home/EventList';
import { useSelector, useDispatch } from 'react-redux';
import { ROUTES, COLORS, FONTS } from '../../constants';
import UserImageIcon from "../../components/Upload/UserImageIcon";
import * as Haptics from 'expo-haptics';

const DATA = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
  {id: 6},
  {id: 7},
  {id: 8},
  {id: 9},
  {id: 10},
];

const Header_Max_Height = 240;
const Header_Min_Height = 0;
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

const DynamicHeader = ({value}) => {
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
  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  const animatedHeaderColor = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [COLORS.bgColor, '#678983'],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: animatedHeaderHeight,
          backgroundColor: animatedHeaderColor,
        },
      ]}>
      <UserImageIcon url={user.profilePic} width={130} height={130}/>
        <Text style={styles.realName}>{user.realName}</Text>
        <View
          style={[ styles.editBtn, { backgroundColor: isPressed ? COLORS.darkgrey : COLORS.grey },]}
          onTouchStart={handleOnTouchStart}
          onTouchEnd={handleOnTouchEnd}
        >
            <Text style={styles.btnText}>Edit Profile</Text>
        </View>
    </Animated.View>
  );
};

const ProfileLayoutScreen = () => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  return (

    <View>
      <DynamicHeader value={scrollOffsetY} />



      <ScrollView
        scrollEventThrottle={5}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
          {
            useNativeDriver: false,
          },
        )}>
      <View style={{ flex: 1 }}>
<InnerProfileNavigator />

</View>

      </ScrollView>
    </View>
  );
};

export default ProfileLayoutScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.bgColor,
    // padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  card: {
    height: 100,
    backgroundColor: '#E6DDC4',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  subtitle: {
    color: '#181D31',
    fontWeight: 'bold',
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
    marginTop: 10,
  },
  btnText: {
    fontFamily: FONTS.Poppins_600,
    color: '#fff',
    fontSize: 15,
  }
});