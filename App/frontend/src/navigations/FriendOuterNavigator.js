import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InnerHomeNavigator from './InnerHomeNavigator';
import CircleBtn from '../components/CircleBtn';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';
import { FriendScreen } from '../screens';

const Tab = createBottomTabNavigator();

function OuterFriendNavigator({ navigation }) {
  return (
    <Tab.Navigator
        tabBarPosition='top'
        screenOptions={({ route }) => ({
          tabBarStyle: {...styles.tabBarStyle},
          headerShown: false,
          tabBarShowLabel: false,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: () => (
            <View style={{ marginLeft: 'auto', marginBottom: 230 }}>
              <CircleBtn navigation={navigation} friendBtn={true} noPadding={true}>
                <Icon name="person-add" size={24} color="white" />
              </CircleBtn>
            </View>
          )
        })}
        initialRouteName='FriendsAndDiscover'
    >
      <Tab.Screen
        name="FriendScreen"
        component={FriendScreen}
        options={({ route }) => ({
          title: null,
          headerShown: false,
          headerStyle: {
              backgroundColor: COLORS.bgColor,
              elevation: 0, // For Android to remove shadow
              shadowOpacity: 0, // For iOS to remove shadow
          },
        })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    height: 50,
    backgroundColor: 'red',
    shadowRadius: 0,
    elevation: 0,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
})

export default OuterFriendNavigator;
