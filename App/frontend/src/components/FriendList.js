import React, { useState } from 'react';
import { FlatList, StyleSheet, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import FriendBox from './FriendBox';
import Btn from './Btn';

const initialFriends = [
  { id: '0', isTitle: true, title: 'Friends' },
  { id: '1', username: 'huahwi', url: 'bs', firstName: 'peter', lastName: 'parker' },
  { id: '2', username: 'penny', url: 'bs', firstName: 'spider', lastName: 'pig' },
];

const FriendList = ({ navigation, chosenFriends, setChosenFriends, setClickedCreateChatBtn }) => {
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
        isTitle={item.isTitle}
        numFriends={friends.length}
    />
  )

  return (
    <>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <FlatList
          data={friends}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />
        <Btn words={"Create Chat"} chosenFriends={chosenFriends} setClickedCreateChatBtn={setClickedCreateChatBtn}/>
      </SafeAreaView>
    </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
 },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  flatList: {
    width: '100%',
  },
});

export default FriendList;
