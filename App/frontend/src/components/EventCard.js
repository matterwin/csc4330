import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Container from './Containers/Container';

const EventCard = ({ item }) => {
    return (
        <Container>
            <View style={styles.item}>
                <Text style={styles.text}>{item.key}</Text>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
});

export default ChatRoomIcon;