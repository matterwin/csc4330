import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ProfileScreen, ProfileFriendScreen, ProfileEventScreen, ProfileHobbyScreen } from '../screens';
import { COLORS, FONTS } from '../constants';
import HobbiesList from '../components/Profile/HobbiesList';

const Tab = createMaterialTopTabNavigator();

function InnerProfileNavigator() {

  return (
    <Tab.Navigator
        // tabBarPosition='top'
        screenOptions={{
            tabBarStyle: styles.tabBarStyle,
            tabBarLabelStyle: { fontSize: 13, fontFamily: FONTS.Poppins_600 },
            tabBarIndicatorStyle: {
                backgroundColor: COLORS.primaryLight,
                width: 55,
                height: 5,
                left: "6%",
                borderRadius: '50%',
            },
        }}
        initialRouteName='Profile'
    >
      <Tab.Screen name="Profile" component={ProfileHobbyScreen}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: COLORS.bgColor,
        borderColor: '#fff',
        borderBottomWidth: 1,
        position: 'relative', 
    }
})

export default InnerProfileNavigator;
