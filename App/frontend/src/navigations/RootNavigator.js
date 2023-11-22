import React from "react";
import { Text, StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from "./BottomTabNavigator";
import ChattingDrawer from "./ChattingDrawer";
import { CreateChatScreen } from "../screens";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '../constants';

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

const RootNavigator = ({ navigation }) => {

  return (
    <Stack.Navigator 
      initialRouteName='BottomNav'
      screenOptions={{
        gestureResponseDistance: {
          horizontal: 50,
        },
      }}
    >
      <Stack.Screen name={"BottomNav"} component={BottomTabNavigator} options={commonOptions} />
      <Stack.Screen name={"ChattingDrawer"} component={ChattingDrawer} options={commonOptions} />
      <Stack.Screen name={"CreateChatScreen"}
        component={CreateChatScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: {
              backgroundColor: COLORS.bgColor,
              elevation: 0, // For Android to remove shadow
              shadowOpacity: 0, // For iOS to remove shadow
              height: 100
          },
          headerTitle: () => <Text style={styles.headerTitle}>Create Chat</Text>,
          headerLeft: () => (
              <View style={{ marginLeft: 10 }} onTouchEnd={() => navigation.pop()}>
                  <Icon name="arrow-back" size={26} color={COLORS.dark} />
              </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: FONTS.Poppins_600,
    fontSize: 19
  },
});