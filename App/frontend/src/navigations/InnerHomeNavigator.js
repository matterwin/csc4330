import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HomeScreen, DiscoverScreen } from '../screens';
import { COLORS, FONTS } from '../constants';

const Tab = createMaterialTopTabNavigator();

function InnerHomeNavigator() {
  return (
    <Tab.Navigator
        tabBarPosition='top'
        screenOptions={{
            tabBarStyle: styles.tabBarStyle,
            tabBarLabelStyle: { fontSize: 13, fontFamily: FONTS.Poppins_600 },
            tabBarIndicatorStyle: {
                backgroundColor: COLORS.primaryLight,
                width: 50,
                height: 5,
                left: "19%",
                borderRadius: '50%',
            },
        }}
        initialRouteName='Friends'
    >
      <Tab.Screen
        name="Friends"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#D9D9D9',
        borderColor: '#fff',
        borderBottomWidth: 1,
    }
})

export default InnerHomeNavigator;
