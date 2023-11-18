import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ChatScreen } from '../screens';
import { COLORS, FONTS } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import GroupList from '../components/GroupList';

const CustomDrawerProfileItem = ({ navigation }) => {
  return (
    <GroupList navigation={navigation}/>
  );
};

const Drawer = createDrawerNavigator();

function ChatDrawerNavigator({ navigation }) {
    return (
      <Drawer.Navigator 
        screenOptions={({ navigation }) => ({
            headerShown: true,
            drawerPosition: 'right',
            swipeEdgeWidth: 1500,
            drawerStyle: {
              width: 100,
            },
            headerStyle: {
              backgroundColor: COLORS.bgColor,
            },
            headerTitle: () => <Text style={styles.headerTitle}>Chat</Text>,
            headerRight: () => (
              <TouchableOpacity
              onPress={navigation.toggleDrawer}
                  style={styles.groupsBtnContainer}
              >
                  <Icon name="apps" size={24} color={COLORS.darkgrey}/>
              </TouchableOpacity>
            ),
            headerLeft: () => null,
        })}
        drawerContent={(props) => <CustomDrawerProfileItem {...props} navigation={navigation}/>}
      >
        <Drawer.Screen name="ChatScreen" component={ChatScreen} />
      </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  groupsBtnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: COLORS.green,
    color: COLORS.black,
    padding: 10,
    marginRight: 10
  },
  headerTitle: {
    fontFamily: FONTS.Poppins_500,
    fontSize: 17
  },
});

export default ChatDrawerNavigator;
