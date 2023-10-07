import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,  } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const HomeIcon = () => (
    <Image
      source={require('../../assets/360default.png')}
      style={{ width: 50, height: 50 }}
    />
  );

const BottomNav = () => {
  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Text>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <HomeIcon/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'grey',
    paddingVertical: 20,
    paddingBottom: 50, // Adjust this value as needed
  },
  buttonContainer: {
    flexDirection: 'row', // Display buttons horizontally
    alignItems: 'center',
    justifyContent: 'space-evenly', // Space them evenly
  },
});

export default BottomNav;
