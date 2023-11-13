import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ChatScreen, ChattingScreen } from '../screens';
import { COLORS } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import GroupList from '../components/GroupList';

const CustomDrawerProfileItem = ({ navigation }) => {
  return (
    <GroupList navigation={navigation}/>
  );
};

const Drawer = createDrawerNavigator();

function ChattingDrawer({ route }) {
    const { dmID, name, lastMsg, whoSentLastMsg } = route.params;

    return (
        <Drawer.Navigator 
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
                headerLeft: () => (
                    <View style={{ marginLeft: 10 }} onTouchEnd={() => navigation.navigate("BottomNav")}>
                        <Icon name="arrow-back" size={26} color={COLORS.dark} />
                    </View>
                ),
                headerShown: true,
                drawerPosition: 'right',
                swipeEdgeWidth: 1500,
                drawerStyle: {
                  width: 100,
                },
                headerStyle: {
                  backgroundColor: COLORS.bgColor,
                },
            })}
            drawerContent={(props) => <CustomDrawerProfileItem {...props} />}
        >
            <Drawer.Screen name={"@" + name} options={{ drawerLabel: 'Chatter' }}>
                {() => <ChattingScreen dmID={dmID} name={name} lastMsg={lastMsg} whoSentLastMsg={whoSentLastMsg} />}
            </Drawer.Screen>
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
});

export default ChattingDrawer;
