import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';

const AddChannel = () => {
  return (
    <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.grey,
    borderRadius: 50,
    width: 55,
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  plus: {
    fontSize: 40,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 45,
  },
});

export default AddChannel;
