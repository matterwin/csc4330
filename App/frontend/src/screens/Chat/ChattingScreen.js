import React, { useEffect } from 'react';
import { Text, StyleSheet, View, Pressable } from "react-native";
import WriteAMessage from '../../components/Chat/WriteAMessage';
import ChatMessageList from '../../components/Chat/ChatMessageList';
import { COLORS } from '../../constants';

const ChattingScreen = ({ navigation }) => {

    return (
        <>
            <View style={styles.msgsContainer}>
                <ChatMessageList />
            </View>
        </>
    )
}

export default ChattingScreen

const styles = StyleSheet.create({
    msgsContainer: {
        backgroundColor: COLORS.bgColor,
        flex: 1,
    }
});