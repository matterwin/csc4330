import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';

const SearchBar = () => {
  return (
    <View style={styles.searchBarContainer}>
      <Icon name="search-outline" size={24} color={COLORS.dark} />
      <TextInput
        placeholder="Search in chats"
        style={styles.searchInput}
        placeholderTextColor={COLORS.grey}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingHorizontal: 10,
    width: '100%',
    flex: 1
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.dark,
  },
});

export default SearchBar;
