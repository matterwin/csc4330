import React from "react";
import { Text, StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from "./BottomTabNavigator";
import { COLORS, FONTS } from '../constants';
import RootNavigator from "./RootNavigator";

const Stack = createStackNavigator();

const commonOptions = {
    title: null,
    headerStyle: {
      backgroundColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
    },
    headerShown: false,
};

const AppNavigator = ({ navigation }) => {

  return (
    <Stack.Navigator initialRouteName='BottomNav'>
      <Stack.Screen name={"BottomNav"} component={BottomTabNavigator} options={commonOptions} />
      <Stack.Screen name={"RootNav"} component={RootNavigator} options={commonOptions} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: FONTS.Poppins_600,
    fontSize: 17
  },
});