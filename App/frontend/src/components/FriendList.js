import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import FriendBox from './FriendBox';

const FriendList = ({ navigation, chosenFriends, setChosenFriends }) => {
  const data = [
    { id: '1', name: 'huahwi', url: 'bs', firstName: 'peter', lastName: 'parker' },
    { id: '2', name: 'penny', url: 'bs', firstName: 'spider', lastName: 'pig' },
  ];

  const renderItem = ({ item }) => (
    <FriendBox
        navigation={navigation} 
        name={item.name} 
        url={item.url} 
        firstName={item.firstName}
        lastName={item.lastName}
        chosenFriends={chosenFriends} 
        setChosenFriends={setChosenFriends}
    />
  )

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    width: '100%'
  },
});

export default FriendList;
