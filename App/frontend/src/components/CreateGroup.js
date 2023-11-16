import React, { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { FONTS, COLORS } from '../constants';

const CreateGroup = () => {
    const [message, setMessage] = useState('');

    const handleInputChange = (text) => {
        setMessage(text);
    };

    return (
        <TextInput
            style={styles.input}
            placeholder="Channel to get this grades"
            value={message}
            onChangeText={handleInputChange}
        />
    );
};

export default CreateGroup;

const styles = StyleSheet.create({
    sendBtn: {
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    btnText: {
        fontFamily: FONTS.Poppins_600,
        color: '#fff',
        fontSize: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.grey,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 10,
        marginBottom: 10,
        width: '100%',
        backgroundColor: COLORS.white,
        fontFamily: FONTS.Poppins_400,
        fontSize: 15,
        maxHeight: 100,
        paddingTop: 10
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
        backgroundColor: 'transparent'
    },
});
