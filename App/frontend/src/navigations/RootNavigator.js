import React from "react";
import { Text, StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from "./BottomTabNavigator";
import ChattingDrawer from "./ChattingDrawer";
import { CreateChatScreen, OtherUserProfileScreen } from "../screens";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '../constants';
import PostEventNavigator from "./PostEventNavigator";
import { useDispatch } from "react-redux"; 
import { resetInvitedUsers } from '../redux/invites/invitesActions';

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
  const dispatch = useDispatch();

  return (
    <Stack.Navigator 
      initialRouteName='PostEventNavigator'
      screenOptions={{
        gestureResponseDistance: {
          horizontal: 50,
        },
      }}
    >
      <Stack.Screen name={"ChattingDrawer"} component={ChattingDrawer} options={commonOptions} />
      <Stack.Screen name={"PostEventNavigator"} 
        component={PostEventNavigator} 
        options={({ navigation }) => ({
          headerShown: false,
          headerStyle: {
              backgroundColor: COLORS.bgColor,
              elevation: 0, // For Android to remove shadow
              shadowOpacity: 0, // For iOS to remove shadow
          },
          headerTitle: () => <Text style={styles.headerTitle}>Post Event</Text>,
          headerLeft: () => (
              <View style={{ marginLeft: 10 }} onTouchEnd={() => { dispatch(resetInvitedUsers()); navigation.pop(); }}>
                  <Icon name="arrow-back" size={26} color={COLORS.dark} />
              </View>
          ),
        })}
      />
      <Stack.Screen name={"OtherUserProfileScreen"} 
        component={OtherUserProfileScreen} 
        options={({ navigation, route }) => ({
          headerShown: true,
          headerStyle: {
              backgroundColor: COLORS.bgColor,
              elevation: 0, // For Android to remove shadow
              shadowOpacity: 0, // For iOS to remove shadow
          },
          headerTitle: () => <Text style={styles.headerTitle}>{route.params && route.params.searchedUser && route.params.searchedUser}</Text>,
          headerLeft: () => (
              <View style={{ marginLeft: 10 }} onTouchEnd={() => { dispatch(resetInvitedUsers()); navigation.pop(); }}>
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
    fontSize: 17
  },
});