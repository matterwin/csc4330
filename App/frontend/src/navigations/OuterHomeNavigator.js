import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HomeScreen, DiscoverScreen } from '../screens';
import { COLORS } from '../constants';
import EventCardScreen from '../screens/EventCardScreen';
import InnerHomeNavigator from './InnerHomeNavigator';

const Tab = createMaterialTopTabNavigator();

function OuterHomeNavigator() {
  return (
    <Tab.Navigator
        tabBarPosition='top'
        screenOptions={{ tabBarStyle: { display: 'none' } }}
        initialRouteName='FriendsAndDiscover'
    >
      <Tab.Screen
        name="FriendsAndDiscover"
        component={InnerHomeNavigator}
        screenOptions={{ swipeEnabled: true }}
      />
      <Tab.Screen
        name="EventCard"
        component={EventCardScreen}
        screenOptions={{ swipeEnabled: true }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#D9D9D9',
        borderColor: '#fff',
        borderBottomWidth: 1,
    },
    test: {
      display: 'none'
    }
})

export default OuterHomeNavigator;
