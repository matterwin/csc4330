import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HomeScreen, DiscoverScreen } from '../screens';
import { COLORS, FONTS } from '../constants';

const Tab = createMaterialTopTabNavigator();

function InnerHomeNavigator({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bgColor }}>
      <Tab.Navigator
          screenOptions={{
              tabBarStyle: styles.tabBarStyle,
              tabBarLabelStyle: { fontSize: 15, fontFamily: FONTS.Poppins_600 },
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
    </SafeAreaView>
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
