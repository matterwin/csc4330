import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegisterScreen } from '../screens';
import { ROUTES } from '../constants';
import AppNavigator from './AppNavigator';

const Stack = createStackNavigator();

function AuthNavigator({ navigation }) {
    return (
        <Stack.Navigator 
            screenOptions={{
                transitionSpec: {
                    open: { animation: 'timing', config: { duration: 0 } }, // Disable animation
                    close: { animation: 'timing', config: { duration: 0 } }, // Disable animation
                },
            }} 
            initialRouteName={ROUTES.LOGIN}
        >
            <Stack.Screen
                name={ROUTES.LOGIN}
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name={ROUTES.REGISTER} 
                component={RegisterScreen} 
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"App"}
                component={AppNavigator}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}

export default AuthNavigator;