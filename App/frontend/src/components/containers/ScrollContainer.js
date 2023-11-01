import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants';

const ScrollContainer = ({ bgColor, children }) => {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView>
                {children}
            </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,  
        backgroundColor: COLORS.bgColor,
    },
});

export default ScrollContainer;
