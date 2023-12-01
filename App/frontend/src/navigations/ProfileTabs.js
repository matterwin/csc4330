import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ProfileScreen, ProfileFriendScreen, ProfileEventScreen, ProfileHobbyScreen } from '../screens';
import { COLORS, FONTS } from '../constants';
import HobbiesList from '../components/Profile/HobbiesList';
import ActualFriendsList from '../components/Friend/ActualFriendsList';
import YourEventList from '../components/Profile/YourEventList';

const Tab = createMaterialTopTabNavigator();

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

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: COLORS.bgColor,
        borderColor: '#fff',
        borderBottomWidth: 1,
        position: 'relative'
    }
})

export default ProfileTabs;