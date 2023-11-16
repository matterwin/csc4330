import React, { useState, useCallback } from 'react';
import { FlatList, StyleSheet, View, RefreshControl } from 'react-native';
import { COLORS } from '../constants';
import ActualFriendsBox from './ActualFriendsBox';
import CircleBtn from './CircleBtn';

const initialFriends = [
  { id: '0', isTitle: true, title: 'Friends' },
  { id: '1', username: 'huahwi', url: 'bs', firstName: 'peter', lastName: 'parker' },
  { id: '2', username: 'penny', url: 'bs', firstName: 'spider', lastName: 'pig' },
];

const ActualFriendsList = ({ navigation, chosenFriends, setChosenFriends, setClickedCreateChatBtn }) => {
  const [friends, setFriends] = useState(initialFriends);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // You can perform your data fetching or refreshing logic here
    // For example, fetch new data from an API

    // Simulating a delay for demonstration purposes
    setTimeout(() => {
      setFriends(initialFriends);
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderItem = ({ item }) => (
    <ActualFriendsBox
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
        <FlatList
            data={friends}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.flatList}
            refreshControl={
                <RefreshControl 
                colors={['black']}
                tintColor={COLORS.green}
                refreshing={refreshing}
                style={{ backgroundColor: COLORS.primaryLight }}
                size={"default"}
                onRefresh={onRefresh} 
                />
            }
        />
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

export default ActualFriendsList;
