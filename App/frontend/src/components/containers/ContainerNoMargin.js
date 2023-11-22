import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const ContainerNoMargin = ({ children }) => {
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
        paddingBottom: 80
    },
    childContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: COLORS.bgColor, 
    }
});

export default ContainerNoMargin;
