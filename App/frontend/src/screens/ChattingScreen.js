import React, { useEffect } from 'react';
import { Text, StyleSheet, View, Pressable } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Container from '../components/containers/Container';
import WriteAMessage from '../components/WriteAMessage';

const ChattingScreen = ({ navigation }) => {

    const handleLeavePage = () => {
        navigation.navigate("Chat");
    }

    return (
        <>
            <Container>
                <TouchableOpacity onPress={handleLeavePage}><Text>chatting</Text></TouchableOpacity>
            </Container>
            <WriteAMessage />
        </>
    )
}

export default ChattingScreen

const styles = StyleSheet.create({

});