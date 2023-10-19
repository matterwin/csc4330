import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const ChatRoomIcon = ({ item }) => {
    return (
        <View style={styles.item}>
            <Text style={styles.text}>{item.key}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        // width: 105,
        // height: 140,
        borderRadius: 10,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
    },
    text: {
        fontSize: 15,
    },
});

export default ChatRoomIcon;
