import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { AddFriendScreen, SearchScreen } from '../screens';
import { COLORS, FONTS } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import OuterFriendNavigator from './FriendOuterNavigator';

const Stack = createStackNavigator();

function FriendNavigator({ navigation }) {

    return (
        <Stack.Navigator initialRouteName={"MainFriendNav"}>
            <Stack.Screen
                name={"MainFriendNav"}
                component={OuterFriendNavigator}
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.bgColor,
                        elevation: 0, // For Android to remove shadow
                        shadowOpacity: 0, // For iOS to remove shadow
                        height: 100
                    },
                    headerTitle: () => <Text style={styles.headerTitle}>Friends</Text>,
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={navigation.toggleDrawer}
                            style={styles.groupsBtnContainer}
                            onPressIn={() => navigation.navigate("SearchScreen")}
                        >
                            <Icon name="search" size={24} color={COLORS.darkgrey}/>
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name={"AddFriendScreen"}
                component={AddFriendScreen}
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.bgColor,
                        elevation: 0, // For Android to remove shadow
                        shadowOpacity: 0, // For iOS to remove shadow,
                        height: 100
                    },
                    headerTitle: () => <Text style={styles.headerTitle}>Add Friends</Text>,
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }} onTouchEnd={() => navigation.pop()}>
                            <Icon name="arrow-back" size={26} color={COLORS.dark} />
                        </View>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={navigation.toggleDrawer}
                            style={styles.groupsBtnContainer}
                            onPressIn={() => navigation.navigate("SearchScreen")}
                        >
                            <Icon name="search" size={24} color={COLORS.darkgrey}/>
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name={"SearchScreen"}
                component={SearchScreen}
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.bgColor,
                        elevation: 0, // For Android to remove shadow
                        shadowOpacity: 0, // For iOS to remove shadow,
                        height: 100
                    },
                    headerTitle: () => <Text style={styles.headerTitle}>Search People</Text>,
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }} onTouchEnd={() => navigation.pop()}>
                            <Icon name="arrow-back" size={26} color={COLORS.dark} />
                        </View>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        fontFamily: FONTS.Poppins_600,
        fontSize: 19
    },
    searchBox: {
        marginRight: 10,
        paddingLeft: 40,
        paddingRight: 10,
        paddingVertical: 10,
        backgroundColor: COLORS.green,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    groupsBtnContainer: {
        borderRadius: 10,
        backgroundColor: COLORS.green,
        color: COLORS.black,
        padding: 8, 
        paddingHorizontal: 8,
        marginRight: 10,
      },
});

export default FriendNavigator;