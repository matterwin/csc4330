import React from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ChatScreen } from '../screens';
import { COLORS, ROUTES } from '../constants';

const Stack = createStackNavigator();

function ChatNavigator({ navigation }) {
    return (
        <Stack.Navigator 
            screenOptions={{
                transitionSpec: {
                    open: { animation: 'timing', config: { duration: 0 } },
                    close: { animation: 'timing', config: { duration: 0 } },
                },
            }} 
            initialRouteName={"RoomsAndDMs"}
        >
            <Stack.Screen
                name={"RoomsAndDMs"}
                component={ChatScreen}
                options={{
                    title: null,
                    headerStyle: {
                        backgroundColor: COLORS.bgColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: null, // Remove the left component
                    headerTitle: null,
                    headerLeft: () => (
                        <View style={styles.searchBar}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search..."
                                placeholderTextColor={COLORS.grey}
                            />
                        </View>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        padding: 10,
        width: '217%',
        backgroundColor: COLORS.lightGray,
    },
    searchInput: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        paddingLeft: 10,
        height: 40,
    },
});

export default ChatNavigator;
