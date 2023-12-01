import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InnerHomeNavigator from './InnerHomeNavigator';
import CircleBtn from '../components/CircleBtn';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';

const Tab = createBottomTabNavigator();

function OuterHomeNavigator({ navigation }) {
  navigation.removeListener();

  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {...styles.tabBarStyle},
          headerShown: false,
          tabBarShowLabel: false,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: () => (
            <View style={{ marginLeft: 'auto', marginBottom: 230 }}>
              <CircleBtn navigation={navigation} homeBtn={true}>
                <Icon name="clipboard" size={28} color="white" />
              </CircleBtn>
            </View>
          )
        })}
        initialRouteName='FriendsAndDiscover'
    >
      <Tab.Screen
        name="FriendsAndDiscover"
        component={InnerHomeNavigator}
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
    backgroundColor: 'transparent',
    shadowRadius: 0,
    elevation: 0,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
})

export default OuterHomeNavigator;
