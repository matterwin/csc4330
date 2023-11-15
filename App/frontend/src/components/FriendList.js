import React, { useState } from 'react';
import { FlatList, StyleSheet, SafeAreaView } from 'react-native';
import FriendBox from './FriendBox';
import { COLORS } from '../constants';
import Btn from './Btn';

const initialFriends = [
  { id: '1', username: 'huahwi', url: 'bs', firstName: 'peter', lastName: 'parker' },
  { id: '2', username: 'penny', url: 'bs', firstName: 'spider', lastName: 'pig' },
];

const FriendList = ({ navigation, chosenFriends, setChosenFriends }) => {
  const [friends, setFriends] = useState(initialFriends);

  const renderItem = ({ item }) => (
    <FriendBox
        navigation={navigation} 
        username={item.username}
        url={item.url} 
        firstName={item.firstName}
        lastName={item.lastName}
        chosenFriends={chosenFriends} 
        setChosenFriends={setChosenFriends}
    />
  )

  return (
    <>
    <FlatList
      data={friends}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.flatList}
    />
      <SafeAreaView style={{ backgroundColor: COLORS.bgColor, width: "100%"}}>
          <Btn words={"Create Chat"} chosenFriends={chosenFriends}/>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flatList: {
    width: '100%'
  },
});

export default FriendList;
