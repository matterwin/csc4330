import React, { useEffect } from 'react';
import { Text, StyleSheet, View, Pressable } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, FONTS } from '../constants';
import { useDispatch } from 'react-redux';
import { showBottomNav, hideBottomNav } from '../redux/nav/navActions';
import Container from '../components/containers/Container';

const ChattingScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const handleLeavePage = () => {
        navigation.navigate("Chat");
    }

    return (
        <Container>
            <TouchableOpacity style={styles.sendBtn}>
                <Text style={styles.btnText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLeavePage}><Text>chatting</Text></TouchableOpacity>
        </Container>
    )
}

export default ChattingScreen

const styles = StyleSheet.create({
    sendBtn: {
        borderRadius: 10,
        paddingVertical: 10,
        width: '100%',
        backgroundColor: COLORS.primaryLight,
        alignItems: 'center',
    },
    btnText: {
        fontFamily: FONTS.Poppins_600,
        color: '#fff',
        fontSize: 15
    },
});