import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { COLORS, FONTS } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import AllUsersList from '../components/AllUsersList';

const chosenOnes = [];

const SearchScreen = () => {
  const [chosenFriends, setChosenFriends] = useState(chosenOnes);
  const [person, setPerson] = useState(null);
  const [clickedCreateChatBtn, setClickedCreateChatBtn] = useState(false);

  const handleInputChange = (text, field) => {
    switch (field) {
      default:
        break;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Icon name="search" size={18} color={COLORS.primary} style={styles.searchIcon} />
          <TextInput 
            style={styles.input}
            value={person}
            onChangeText={(text) => handleInputChange(text, 'person')}
            placeholder='Search users ...'
            placeholderTextColor={COLORS.grey}
          />
        </View>
        <AllUsersList chosenFriends={chosenFriends} setChosenFriends={setChosenFriends} setClickedCreateChatBtn={setClickedCreateChatBtn} person={person}/>
      </View>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgColor,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  directMessagesTitle: {
    fontFamily: FONTS.Poppins_500,
    fontSize: 15,
  },
  input: {
    flex: 1,
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 500,
  },
});
