import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ChatScreen } from '../screens';
import { COLORS } from '../constants';
import EventCardScreen from '../screens/EventCardScreen';
import InnerHomeNavigator from './InnerHomeNavigator';

const Tab = createMaterialTopTabNavigator();

function OuterChatNavigator() {
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
        options={{
          tabBarVisible: false, // Show the tab bar for this screen
        }}
      />
      <Tab.Screen
        name="EventCard"
        component={EventCardScreen}
        screenOptions={{ tabBarStyle: { display: 'flex' }, swipeEnabled: true }}
        options={{
          tabBarVisible: true, // Show the tab bar for this screen
        }}
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

export default OuterChatNavigator;
