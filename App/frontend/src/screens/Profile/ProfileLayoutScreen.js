import React, { useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';
import HobbiesList from '../../components/Profile/HobbiesList';
import ActualFriendsList from '../../components/Friend/ActualFriendsList';
import YourEventList from '../../components/Profile/YourEventList';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, FONTS } from "../../constants"; 
import { setUserData } from "../../redux/user/userActions";
import InnerProfileNavigator from "../../navigations/InnerProfileNavigator";
import UserImageIcon from '../../components/Upload/UserImageIcon';
import * as Haptics from 'expo-haptics';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Header_Max_Height = 240;
const Header_Min_Height = 120;
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

function ProfileTabs() {
  return (
    <Tab.Navigator
        screenOptions={{
            tabBarStyle: styles.tabBarStyle,
            tabBarLabelStyle: { fontSize: 13, fontFamily: FONTS.Poppins_600 },
            tabBarIndicatorStyle: {
                backgroundColor: COLORS.primaryLight,
                width: 55,
                height: 5,
                left: "10%",
                borderRadius: '50%',
            },
        }}
        initialRouteName='Profile'
    >
      <Tab.Screen name="Hobbies" component={ HobbiesList }/>
      <Tab.Screen name="Friends" component={ ActualFriendsList }/>
      <Tab.Screen name="Events" component={ YourEventList }/>
    </Tab.Navigator>
  );
}

const DynamicHeader = ({ value, navigation }) => {
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

const ProfileLayoutScreen = ({ navigation }) => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const data = [{ key: 'header' }, { key: 'hobbies' }, { key: 'friends' }];

  const renderItem = ({ item }) => {
    switch (item.key) {
      case 'header':
        return <DynamicHeader value={scrollOffsetY} navigation={navigation}/>;
      case 'hobbies':
        return <ProfileTabs />;

      case 'friends':
          return <ActualFriendsList />
      default:
        return null;
    }
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      scrollEventThrottle={5}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      onScroll={(event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        scrollOffsetY.setValue(offsetY);
      }}
    />
  );
};

export default ProfileLayoutScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.bgColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
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
  },
});
