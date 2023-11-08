import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ChatScreen, ProfileScreen } from '../screens';
import ProfileImage from '../components/ProfileImage';
import { COLORS } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomDrawerProfileItem = ({ navigation }) => {
  const handleProfilePress = () => {
    navigation.closeDrawer();
    navigation.navigate('Chat')
  };

  return (
    <TouchableOpacity onPress={handleProfilePress}>
      <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
        <ProfileImage width={70} height={70} />
        <View style={{ width: '45%', padding: 1, backgroundColor: COLORS.grey}}></View>
      </View>
    </TouchableOpacity>
  );
};

const Drawer = createDrawerNavigator();

function ChatDrawerNavigator() {
    return (
        <Drawer.Navigator 
            initialRouteName="Drawer"
            screenOptions={({ navigation }) => ({
                headerRight: () => (
                    <TouchableOpacity
                        onPress={navigation.toggleDrawer}
                        style={styles.groupsBtnContainer}
                    >
                        <Icon name="apps" style={{ marginRight: 5 }}/>
                        <Text style={styles.groupsBtn}>Groups</Text>
                    </TouchableOpacity>
                ),
                headerLeft: () => null,
                headerShown: true,
                drawerPosition: 'right',
                swipeEdgeWidth: 1500,
                drawerStyle: {
                    width: 100
                },
                headerStyle: {
                    backgroundColor: COLORS.bgColor,
                },
                headerTitleContainerStyle: {
                    marginRight: -10,
                },
                headerRightContainerStyle: {
                    paddingRight: 10
                }
            })}
            drawerContent={(props) => (
                <CustomDrawerProfileItem {...props} />
            )}
            >
            <Drawer.Screen name="Chat" component={ChatScreen} />
            <Drawer.Screen name="Other" component={ProfileScreen} />
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
  },
});

export default ChatDrawerNavigator;
