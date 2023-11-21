import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants';
import { useSelector } from 'react-redux';
import { showAllUsers } from '../api/handleFriend';
import AllUsersBox from './AllUsersBox';

const AllUsersList = ({ navigation, chosenFriends, setChosenFriends, person }) => {
  const [friends, setFriends] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const token = useSelector(state => state.auth.token);

  const fetchData = async () => {
    try {
      setLoadingMore(true);
      const res = await showAllUsers(token);

      if (res.status === 200) {
        console.log("200");
        console.log(res.data.formattedUsers);
        setFriends(res.data.formattedUsers);
      }
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  const onRefresh = useCallback(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <AllUsersBox
      navigation={navigation}
      username={item.username}
      profilePic={item.profilePic}
      url={item.url} 
      realName={item.realname}
      chosenFriends={chosenFriends} 
      setChosenFriends={setChosenFriends}
      isTitle={item.isTitle}
      numFriends={friends.length}
      setFriends={setFriends}
      isFriend={item.isFriend}
      sentRequestTo={item.sentRequestTo}
      receivedRequestFrom={item.receivedRequestFrom}
    />
  )

  return (
    <>
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={(item) => item.username}
        style={styles.flatList}
        refreshControl={
          <RefreshControl 
            colors={['black']}
            tintColor={COLORS.green}
            refreshing={refreshing}
            style={{ backgroundColor: COLORS.primaryLight, overflow: 'hidden' }}
            size={"default"}
            onRefresh={onRefresh} 
          />
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  flatList: {
    width: '100%',
    padding: 5,
    marginBottom: 100,
  },
});

export default AllUsersList;
