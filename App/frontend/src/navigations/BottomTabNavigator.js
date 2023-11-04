import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, ROUTES } from '../constants';
import { HomeScreen, ChatScreen, SearchScreen } from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileImage from '../components/ProfileImage';
import MapScreen from '../screens/MapScreen';
import FriendScreen from '../screens/FriendScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileIcon from '../components/ProfileIcon';
import HomeNavigator from './HomeNavigator';

const getTabBarIcon = (routeName, focused, color) => {
    let iconName;

    if (routeName === ROUTES.HOME + "BottomTabNav") iconName = focused ? 'home-sharp' : 'home';
    else if (routeName === ROUTES.CHAT) iconName = focused ? 'chatbubbles-sharp' : 'chatbubbles';
    else if (routeName === ROUTES.MAP) iconName = focused ? 'map-sharp' : 'map';
    else if (routeName === ROUTES.SEARCH) iconName = focused ? 'search-sharp' : 'search';
    else if (routeName === ROUTES.FRIEND) iconName = focused ? 'people-sharp' : 'people';

    return <Icon name={iconName} size={30} color={color} />;
};

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <Tab.Navigator 
            initialRouteName={ROUTES.HOME}
            screenOptions={({ route }) => ({
                headerShown: true,
                tabBarShowLabel: false,
                tabBarInactiveTintColor: COLORS.gray,
                tabBarStyle: styles.tabBarStyle,
                tabBarActiveTintColor: COLORS.primary,
                tabBarIcon: ({ color, size, focused }) => {
                    return getTabBarIcon(route.name, focused, color);
                },
                headerLeftContainerStyle: {
                    paddingLeft: 20
                },
                headerRightContainerStyle: {
                    paddingRight: 20
                }
            })}
        >
            <Tab.Screen
                name={ROUTES.HOME + "BottomTabNav"}
                component={HomeNavigator}
                options={({ route }) => ({
                    title: null,
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: COLORS.bgColor,
                        elevation: 0, // For Android to remove shadow
                        shadowOpacity: 0, // For iOS to remove shadow
                    },
               })}
            />
            <Tab.Screen
                name={ROUTES.MAP}
                component={MapScreen}
                options={({ route }) => ({
                    title: null,
                    headerStyle: {
                       backgroundColor: 'transparent',
                       elevation: 0, // For Android to remove shadow
                       shadowOpacity: 0, // For iOS to remove shadow
                    },
                    headerLeft: () => <Icon name="search-outline" size={26} color={COLORS.dark} />,
                    headerRight: () => <Icon name="notifications-outline" size={26} color={COLORS.dark} />,
                    headerTitle: "Map"
               })}
            />
                        <Tab.Screen
                name={ROUTES.CHAT}
                component={ChatScreen}
                options={({ route }) => ({
                     title: null,
                     headerStyle: {
                        backgroundColor: 'transparent',
                        elevation: 0, // For Android to remove shadow
                        shadowOpacity: 0, // For iOS to remove shadow
                    },
                    headerLeft: () => <Icon name="search-outline" size={26} color={COLORS.dark} />,
                    headerRight: () => <Icon name="notifications-outline" size={26} color={COLORS.dark} />,
                    headerTitle: "Chat"
                })}
            />
            <Tab.Screen
                name={ROUTES.FRIEND}
                component={FriendScreen}
                options={({ route }) => ({
                    title: null,
                    headerStyle: {
                        backgroundColor: 'transparent',
                        elevation: 0, // For Android to remove shadow
                        shadowOpacity: 0, // For iOS to remove shadow
                    },
                    headerLeft: () => <Icon name="search-outline" size={26} color={COLORS.dark} />,
                    headerRight: () => <Icon name="notifications-outline" size={26} color={COLORS.dark} />,
                    headerTitle: "Friends"
               })}
            />
            <Tab.Screen
                name={ROUTES.PROFILE}
                component={ProfileScreen}
                options={({ route }) => ({
                    title: null,
                    headerStyle: {
                      backgroundColor: 'transparent',
                      elevation: 0,
                      shadowOpacity: 0,
                    },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <ProfileIcon focused={ focused } />
                    ),
                })}
            />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        height: 90,
        paddingTop: 5,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 2,
        elevation: 3,
      },
});
