import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, ROUTES } from '../constants';
import { HomeScreen, ChatScreen, LoginScreen, RegisterScreen } from '../screens';
import CustomTabBar from '../components/CustomTabBar';
import Icon from 'react-native-vector-icons/Ionicons';

const getTabBarIcon = (routeName, focused, color) => {
    let iconName;

    if (routeName === ROUTES.HOME) {
    iconName = focused ? 'home-sharp' : 'home-outline';
    } else if (routeName === ROUTES.CHAT) {
    iconName = focused ? 'chatbubbles-sharp' : 'chatbubbles-outline';
    } else if (routeName === ROUTES.LOGIN) {
    iconName = focused ? 'wallet-sharp' : 'wallet-outline';
    } else if (routeName === ROUTES.REGISTER) {
    iconName = focused ? 'notifications-sharp' : 'notifications-outline';
    }

    return <Icon name={iconName} size={26} color={color}/>;
};

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <Tab.Navigator 
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarInactiveTintColor: COLORS.dark,
                tabBarStyle: styles.tabBarStyle,
                tabBarActiveTintColor: COLORS.primary,
                tabBarIcon: ({ color, size, focused }) => {
                    return getTabBarIcon(route.name, focused, color);
                },
            })}
        >

            <Tab.Screen
            name={ROUTES.CHAT}
            component={ChatScreen}
            />
            <Tab.Screen
            name={ROUTES.HOME}
            component={HomeScreen}
            />
            <Tab.Screen
            name={ROUTES.LOGIN}
            component={LoginScreen}
            />
            <Tab.Screen
            name={ROUTES.REGISTER}
            component={RegisterScreen}
            />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        backgroundColor: COLORS.transparent,
        borderTopWidth: 0,
        bottom: 15,
        right: 10,
        left: 10,
        height: 92,
    },
});
