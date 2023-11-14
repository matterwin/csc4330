import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from "./BottomTabNavigator";
import ChattingDrawer from "./ChattingDrawer";

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

const RootNavigator = () => {

  return (
    <Stack.Navigator 
      initialRouteName='BottomNav'
      screenOptions={{
        gestureResponseDistance: {
          horizontal: 50, // Adjust the value according to your preference
        },
      }}
    >
      <Stack.Screen name={"BottomNav"} component={BottomTabNavigator} options={commonOptions} />
      <Stack.Screen name={"ChattingDrawer"} component={ChattingDrawer} options={commonOptions} />
    </Stack.Navigator>
  );
};

export default RootNavigator;