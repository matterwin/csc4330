import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegisterScreen } from '../screens';
import { ROUTES } from '../constants';

const Stack = createStackNavigator();

function AuthNavigator() {
    return (
    <Stack.Navigator 
        screenOptions={{
            transitionSpec: {
                open: { animation: 'timing', config: { duration: 0 } }, // Disable animation
                close: { animation: 'timing', config: { duration: 0 } }, // Disable animation
            },
        }} 
        initialRouteName={"LoginAuth"}
    >
        <Stack.Screen
            name={"LoginAuth"}
            component={LoginScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen 
            name={ROUTES.REGISTER} 
            component={RegisterScreen} 
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
    );
}

export default AuthNavigator;