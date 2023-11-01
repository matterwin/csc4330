import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HomeScreen, DiscoverScreen } from '../screens';
import { COLORS } from '../constants';

const Tab = createMaterialTopTabNavigator();

function HomeNavigator() {
  return (
    <Tab.Navigator
        tabBarPosition='top'
        screenOptions={{
            tabBarStyle: styles.tabBarStyle,
            tabBarLabelStyle: { fontSize: 13 },
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
        screenOptions={{ swipeEnabled: true, }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        screenOptions={{ swipeEnabled: true, }}
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

export default HomeNavigator;