import React from "react";
import { Text, StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { PostEventScreen, PostEventNextScreen } from "../screens";
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

const PostEventNavigator = ({ navigation }) => {

  return (
    <Stack.Navigator initialRouteName='PostEventScreen'>
      <Stack.Screen name={"PostEventScreen"}
        component={PostEventScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: {
              backgroundColor: COLORS.bgColor,
              elevation: 0, // For Android to remove shadow
              shadowOpacity: 0, // For iOS to remove shadow
          },
          headerTitle: () => <Text style={styles.headerTitle}>Post Event</Text>,
          headerLeft: () => (
              <View style={{ marginLeft: 10 }} onTouchEnd={() => navigation.pop()}>
                  <Icon name="arrow-back" size={26} color={COLORS.dark} />
              </View>
          ),
        })}
      />
      <Stack.Screen name={"PostEventNextScreen"}
        component={PostEventNextScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: {
              backgroundColor: COLORS.bgColor,
              elevation: 0, // For Android to remove shadow
              shadowOpacity: 0, // For iOS to remove shadow
          },
          headerTitle: () => <Text style={styles.headerTitle}>Post Event</Text>,
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

export default PostEventNavigator;

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: FONTS.Poppins_600,
    fontSize: 17
  },
});