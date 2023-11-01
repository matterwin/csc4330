import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateEventScreen } from '../screens';
import { COLORS, ROUTES } from '../constants';
import InnerHomeNavigator from './InnerHomeNavigator';

const Stack = createStackNavigator();

function RealHomeNavigator() {
    return (
        <Stack.Navigator 
            screenOptions={{
                transitionSpec: {
                    open: { animation: 'timing', config: { duration: 0 } }, // Disable animation
                    close: { animation: 'timing', config: { duration: 0 } }, // Disable animation
                },
            }} 
            initialRouteName={ROUTES.HOME}
        >
            <Stack.Screen
                name={ROUTES.HOME}
                component={InnerHomeNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name={ROUTES.CREATE_EVENT} 
                component={CreateEventScreen} 
                options={{
                    title: null,
                    headerShown: true, 
                    gestureEnabled: false, 
                    headerStyle: {
                        backgroundColor: COLORS.bgColor,
                    },
                    // headerLeft: () => <Text>Back</Text>,
                    headerRight: () => <Text>Invite</Text>,
                }}

            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({

});

export default RealHomeNavigator;