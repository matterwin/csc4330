import React from 'react';
import { FlatList } from 'react-native';
import ChatRoomIcon from './ChatRoomIcon';
import { Text, StyleSheet, View } from 'react-native';

const ChatRoomList = ({ data }) => {
    return (
        <FlatList
            data={data}
            horizontal
            renderItem={({ item }) => <ChatRoomIcon item={item} />}
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
            style={styles.flatList}
        />
    );
};

const styles = StyleSheet.create({
    flatList: {
        backgroundColor: 'red',
        padding: 10,
        height:0,
    },
});

export default ChatRoomList;
