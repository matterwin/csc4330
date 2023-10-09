import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, ROUTES } from '../constants';
import { HomeScreen, ChatScreen, SearchScreen } from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileImage from '../components/ProfileImage';
import MapScreen from '../screens/MapScreen';
import FriendScreen from '../screens/FriendScreen';
import AuthNavigator from './AuthNavigator';
import { useSelector } from 'react-redux';
import ProfileScreen from '../screens/ProfileScreen';

const getTabBarIcon = (routeName, focused, color, isAuthenticated) => {
    let iconName;

    if (routeName === ROUTES.HOME) iconName = focused ? 'home-sharp' : 'home-outline';
    else if (routeName === ROUTES.CHAT) iconName = focused ? 'chatbubbles-sharp' : 'chatbubbles-outline';
    else if (routeName === ROUTES.MAP) iconName = focused ? 'map-sharp' : 'map-outline';
    else if (routeName === ROUTES.LOGIN) iconName = focused ? 'log-in-sharp' : 'log-in-outline';
    else if (routeName === ROUTES.SEARCH) iconName = focused ? 'search-sharp' : 'search-outline';
    else if (routeName === ROUTES.FRIEND) iconName = focused ? 'people-sharp' : 'people-outline';
    else if (routeName === ROUTES.PROFILE) {
        if (isAuthenticated) {
            return <ProfileImage width={30} height={30} />;
        } else {
            iconName = focused ? 'log-in-sharp' : 'log-in-outline';
        }
    }

    return <Icon name={iconName} size={26} color={color} />;
};

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const WIDTH = 55;
    const HEIGHT = 55;

    return (
        <Tab.Navigator 
            initialRouteName={ROUTES.HOME}
            screenOptions={({ route }) => ({
                headerShown: true,
                tabBarShowLabel: false,
                tabBarInactiveTintColor: COLORS.dark,
                tabBarStyle: styles.tabBarStyle,
                tabBarActiveTintColor: COLORS.primary,
                tabBarIcon: ({ color, size, focused }) => {
                    return getTabBarIcon(route.name, focused, color, isAuthenticated); // Pass isAuthenticated
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
                name={ROUTES.HOME}
                component={HomeScreen}
                options={({ route }) => ({
                    title: null,
                    headerStyle: {
                        backgroundColor: 'transparent',
                        elevation: 0, // For Android to remove shadow
                        shadowOpacity: 0, // For iOS to remove shadow
                    },
                    headerLeft: () => <Icon name="search-outline" size={26} color={COLORS.dark} />,
                    headerRight: () => <Icon name="notifications-outline" size={26} color={COLORS.dark} />,
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
                name={isAuthenticated ? "Profile" : "Login"}
                component={isAuthenticated ? ProfileScreen : AuthNavigator}
                options={({ route }) => ({
                    title: null,
                    headerStyle: {
                       backgroundColor: 'transparent',
                       elevation: 0, // For Android to remove shadow
                       shadowOpacity: 0, // For iOS to remove shadow
                    },
                    headerShown: false,
                    tabBarStyle: !isAuthenticated ? { display: "none" } : styles.tabBarStyle
               })}
            />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        right: 10,
        left: 10,
        bottom: 30,
        height: 75,
        paddingTop: 20,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 3,
      },
});
