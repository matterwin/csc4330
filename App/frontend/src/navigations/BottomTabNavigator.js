import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, FONTS, ROUTES } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeNavigator from './HomeNavigator';
import ChatDrawer from './ChatDrawer';
import UserImageIcon from '../components/UserImageIcon';
import { Animated } from 'react-native';
import { useSelector } from 'react-redux';
import FriendNavigator from './FriendNavigator';
import ProfileNavigator from './ProfileNavigator';

const getTabBarIcon = (routeName, focused, color) => {
    let iconName;

    if (routeName === ROUTES.HOME) iconName = focused ? 'home-sharp' : 'home';
    else if (routeName === ROUTES.CHAT) iconName = focused ? 'chatbubbles-sharp' : 'chatbubbles';
    else if (routeName === ROUTES.SEARCH) iconName = focused ? 'search-sharp' : 'search';
    else if (routeName === ROUTES.FRIEND) iconName = 'people'

    if (focused) {
        const scaleValue = new Animated.Value(1);

        const scaleIn = Animated.timing(scaleValue, {
            toValue: 1.1,
            duration: 100,
            useNativeDriver: true,
        });

        const scaleOut = Animated.timing(scaleValue, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
            delay: 0,
        });

        Animated.sequence([scaleIn, scaleOut]).start();

        return (
            <Animated.View style={{ transform: [{ scaleX: scaleValue }, { scaleY: scaleValue }], }}>
                <Icon name={iconName} size={28} color={color} />
            </Animated.View>
        );
    }

    return <Icon name={iconName} size={30} color={color} />;
};

const Tab = createBottomTabNavigator();

function BottomTabNavigator({navigation}) {
    const user = useSelector(state => state.user);

    return (
        <Tab.Navigator 
            initialRouteName={ROUTES.HOME}
            screenOptions={({ route }) => ({
                headerShown: true,
                tabBarShowLabel: true,
                tabBarLabel: {
                    fontFamily: FONTS.Poppins_400,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                },
                tabBarInactiveTintColor: COLORS.gray,
                tabBarActiveTintColor: COLORS.primary,
                tabBarIcon: ({ color, size, focused }) => {
                    return getTabBarIcon(route.name, focused, color);
                },
                headerLeftContainerStyle: {
                    paddingLeft: 20
                },
                headerRightContainerStyle: {
                    paddingRight: 20
                },
                tabBarStyle: {
                    ...styles.tabBarStyle,
                },
            })}
        >
            <Tab.Screen
                name={ROUTES.HOME}
                component={HomeNavigator}
                options={({ route }) => ({
                    tabBarLabel: "Events",
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
                name={ROUTES.CHAT}
                component={ChatDrawer}
                options={({ route }) => ({
                    tabBarLabel: "Chat",
                    title: null,
                    headerShown: false,
                })}
            />
            <Tab.Screen
                name={ROUTES.FRIEND}
                component={FriendNavigator}
                options={({ route }) => ({
                    tabBarLabel: "Friends",
                    title: null,
                    headerShown: false,
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
                name={ROUTES.PROFILE}
                component={ProfileNavigator}
                options={({ route }) => ({
                    tabBarLabel: "Profile",
                    title: "null",
                    headerStyle: {
                      backgroundColor: 'transparent',
                      elevation: 0,
                      shadowOpacity: 0,
                    },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ borderRadius: 50, borderWidth:0, borderColor: focused ? COLORS.primary : 'transparent'}}>
                            <UserImageIcon url={user.profilePic} height={35} width={35} />
                        </View>
                    ),
                })}
                screenOptions
            />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        height: 85,
        paddingTop:10,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 2,
        elevation: 3,
      },
      labels: {
        fontFamily: FONTS.Poppins_400
      }
});
