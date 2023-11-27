import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { EventCardScreen } from '../screens';
import { COLORS, FONTS } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileImage from '../components/Upload/ProfileImage';
import OuterHomeNavigator from './OuterHomeNavigator';

const Stack = createStackNavigator();

function HomeNavigator({ navigation }) {

    return (
        <Stack.Navigator 
            initialRouteName={"HomeAndEventCard"}
        >
            <Stack.Screen
                name={"HomeAndEventCard"}
                component={OuterHomeNavigator}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: COLORS.bgColor,
                        elevation: 0, // For Android to remove shadow
                        shadowOpacity: 0, // For iOS to remove shadow,
                        height: 100
                    },
                    headerTitle: () => <Text style={styles.headerTitle}>Events</Text>, 
                }}
            />
            <Stack.Screen
                name={"EventCardScreen"}
                component={EventCardScreen}
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.bgColor,
                        elevation: 0, // For Android to remove shadow
                        shadowOpacity: 0, // For iOS to remove shadow,
                        height: 100
                    },
                    headerTitle: () => <Text style={styles.headerTitle}>Event</Text>,
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }} onTouchEnd={() => navigation.pop()}>
                            <Icon name="arrow-back" size={26} color={COLORS.dark} />
                        </View>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        fontFamily: FONTS.Poppins_600,
        fontSize: 19
    },
});

export default HomeNavigator;