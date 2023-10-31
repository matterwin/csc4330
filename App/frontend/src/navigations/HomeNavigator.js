import React from 'react';
import { Text, StyleSheet, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { DiscoverScreen, HomeScreen } from '../screens';
import { ROUTES, COLORS } from '../constants';

const Stack = createStackNavigator();

function HomeNavigator() {

    return (
    <Stack.Navigator 
        initialRouteName={ROUTES.HOME + "Friends"}
    >
        <Stack.Screen
            name={ROUTES.HOME + "Friends"}
            component={HomeScreen}
            options={({ route }) => ({
                title: null,
                headerStyle: {
                    backgroundColor: COLORS.bgColor,
                    borderBottomColor: '#fff',
                    borderBottomWidth: '1px',
                    elevation: 0, // For Android to remove shadow
                    shadowOpacity: 0, // For iOS to remove shadow
                },
                headerLeft: () => <Text>Friends</Text>, // Set the header right component
                headerRight: () => <Text>Discover</Text>, // Set the header right component
           })}
        />
        <Stack.Screen
            name={ROUTES.DISCOVER}
            component={DiscoverScreen}
            options={({ route }) => ({
                title: null,
                headerStyle: {
                    backgroundColor: COLORS.primary,
                    borderBottomColor: '#fff',
                    borderBottomWidth: '1px',
                    elevation: 0, // For Android to remove shadow
                    shadowOpacity: 0, // For iOS to remove shadow
                },
                headerLeft: () => (
                    <View style={styles.leftSide}>
                      <Text>Friends</Text>
                    </View>
                  ),
                headerRight: () => (
                    <View style={styles.rightSide}>
                      <Text style={styles.headerText}>Discover</Text>
                    </View>
                ),
           })}
        />
    </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    leftSide: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: "50%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightSide: {
        flex: 1,
        flexDirection: 'row',
        paddingRight: "50%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
    }
});

export default HomeNavigator;