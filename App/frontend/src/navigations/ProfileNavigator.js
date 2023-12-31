import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS, FONTS } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import UserImageIcon from '../components/Upload/UserImageIcon';
import ProfileLayoutScreen from '../screens/Profile/ProfileLayoutScreen';
import { EditProfileScreen, EventCardScreen, SearchHobbyScreen, SettingsScreen } from '../screens';

const Stack = createStackNavigator();

function ProfileNavigator({ navigation }) {
    const user = useSelector(state => state.user);

    return (
        <Stack.Navigator 
            initialRouteName={"ProfileLayoutScreen"}
        >
            <Stack.Screen
                name={"ProfileLayoutScreen"}
                component={ProfileLayoutScreen}
                options={{
                    // headerShown: false,
                    headerStyle: {
                        backgroundColor: COLORS.bgColor,
                        elevation: 0, // For Android to remove shadow
                        shadowOpacity: 0, // For iOS to remove shadow
                        height: 100
                    },
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }} onTouchEnd={() => navigation.navigate("ProfileLayoutScreen")}>
                            <UserImageIcon url={user.profilePic} height={35} width={35} />
                        </View>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("SettingsScreen")}
                            style={styles.groupsBtnContainer}
                        >
                            <Icon name="settings" size={24} color={COLORS.darkgrey}/>
                        </TouchableOpacity>
                    ),
                    headerTitle: () => <Text style={styles.headerTitle}>{user.username}</Text>,
                }}
            />
            <Stack.Screen
                name={"EditProfileScreen"}
                component={EditProfileScreen}
                options={{
                    // headerShown: false,
                    headerStyle: {
                        backgroundColor: COLORS.bgColor,
                        elevation: 0, // For Android to remove shadow
                        shadowOpacity: 0, // For iOS to remove shadow
                        height: 100
                    },
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }} onTouchEnd={() => navigation.pop()}>
                            <Icon name="arrow-back" size={26} color={COLORS.dark} />
                        </View>
                    ),
                    headerTitle: () => <Text style={styles.headerTitle}>Edit Profile</Text>,
                }}
            />
            <Stack.Screen
                name={"SettingsScreen"}
                component={SettingsScreen}
                options={{
                    // headerShown: false,
                    headerStyle: {
                        backgroundColor: COLORS.bgColor,
                        elevation: 0, // For Android to remove shadow
                        shadowOpacity: 0, // For iOS to remove shadow
                        height: 100
                    },
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }} onTouchEnd={() => navigation.pop()}>
                            <Icon name="arrow-back" size={26} color={COLORS.dark} />
                        </View>
                    ),
                    headerTitle: () => <Text style={styles.headerTitle}>Settings</Text>,
                }}
            />
            <Stack.Screen
                name={"EventCardFromProfile"}
                component={EventCardScreen}
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.bgColor,
                        elevation: 0, // For Android to remove shadow
                        shadowOpacity: 0, // For iOS to remove shadow
                        height: 100
                    },
                    headerTitle: () => <Text style={styles.headerTitle}>Event</Text>,
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }} onTouchEnd={() => navigation.pop()}>
                            <Icon name="arrow-back" size={26} color={COLORS.dark} />
                        </View>
                    ),
                }}
            />
             <Stack.Screen
                name={"SearchHobbyScreen"}
                component={SearchHobbyScreen}
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.bgColor,
                        elevation: 0, // For Android to remove shadow
                        shadowOpacity: 0, // For iOS to remove shadow
                        height: 100
                    },
                    headerTitle: () => <Text style={styles.headerTitle}>Search Hobbies</Text>,
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

export default ProfileNavigator;