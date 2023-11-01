import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const Container = ({ children }) => {
    return (
        <View style={styles.parentContainer}>
            <View style={styles.childContainer}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    parentContainer:{
        flex: 1,  
        backgroundColor: COLORS.bgColor,
        top: 0,
    },
    childContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: COLORS.bgColor, 
        margin: 20
    }
});

export default Container;
