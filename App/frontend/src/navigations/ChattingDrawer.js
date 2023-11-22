import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ChattingScreen } from '../screens';
import { COLORS, FONTS } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import GroupList from '../components/GroupList';

const CustomDrawerProfileItem = ({ navigation }) => {
  return (
    <GroupList navigation={navigation}/>
  );
};

const Drawer = createDrawerNavigator();

function ChattingDrawer({ route, navigation}) {
    const { dmID, username, lastMsg, whoSentLastMsg } = route.params;

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
                  height: 100
                },
                headerLeft: () => (
                  <View style={{ marginLeft: 10 }} onTouchEnd={() => navigation.navigate("BottomNav")}>
                      <Icon name="arrow-back" size={26} color={COLORS.dark} />
                  </View>
              ),
                headerTitle: () => <Text style={styles.headerTitle}>{"@" + username}</Text>,
                headerRight: () => (
                  <TouchableOpacity
                    onPress={navigation.toggleDrawer}
                    style={styles.groupsBtnContainer}
                  >
                      <Icon name="apps" size={22} color={COLORS.darkgrey}/>
                  </TouchableOpacity>
                ),
            })}
            drawerContent={(props) => <CustomDrawerProfileItem {...props} navigation={navigation}/>}
        >
            <Drawer.Screen name={"@" + username} options={{ drawerLabel: 'Chatter' }}>
                {() => <ChattingScreen dmID={dmID} name={username} lastMsg={lastMsg} whoSentLastMsg={whoSentLastMsg} />}
            </Drawer.Screen>
        </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  groupsBtnContainer: {
    borderRadius: 10,
    backgroundColor: COLORS.green,
    color: COLORS.black,
    padding: 8, 
    paddingHorizontal: 8,
    marginRight: 10,
  },
  headerTitle: {
    fontFamily: FONTS.Poppins_600,
    fontSize: 19
  },
});

export default ChattingDrawer;
