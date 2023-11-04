import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateEventScreen } from '../screens';
import { COLORS, ROUTES } from '../constants';
import InnerHomeNavigator from './InnerHomeNavigator';
import EventCardScreen from '../screens/EventCardScreen';
import ProfileImage from '../components/ProfileImage';
import Icon from 'react-native-vector-icons/Ionicons';
import OuterHomeNavigator from './OuterHomeNavigator';

const Stack = createStackNavigator();

function HomeNavigator({ navigation }) {
    return (
        <Stack.Navigator 
            screenOptions={{
                transitionSpec: {
                    open: { animation: 'timing', config: { duration: 0 } }, // Disable animation
                    close: { animation: 'timing', config: { duration: 0 } }, // Disable animation
                },
            }} 
            initialRouteName={"HomeAndEventCard"}
        >
            <Stack.Screen
                name={"HomeAndEventCard"}
                component={OuterHomeNavigator}
                options={{
                    // headerShown: false,
                    headerStyle: {
                        backgroundColor: COLORS.bgColor,
                        elevation: 0, // For Android to remove shadow
                        shadowOpacity: 0, // For iOS to remove shadow
                    },
                    headerTitle: () => <ProfileImage width={50} height={50} />
                }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({

});

export default HomeNavigator;