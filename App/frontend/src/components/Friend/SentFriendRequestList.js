import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants';
import { useSelector } from 'react-redux';
import SentFriendRequestBox from './SentFriendRequestBox';
import { showSentFriendRequests } from '../../api/handleFriend';

const SentFriendRequestList = ({ navigation, chosenFriends, setChosenFriends }) => {
  const [friends, setFriends] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const token = useSelector(state => state.auth.token);
  const fetchData = async () => {
    try {
      setLoadingMore(true);
      const res = await showSentFriendRequests(token);

      if (res.status === 200) {
        console.log(res.data.sentRequests);
        setFriends(res.data.sentRequests);
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

  useEffect(() => {
    onRefresh();
  },[useSelector(state => state.fetch.shouldFetchSentFriendRequestData)])

  const renderItem = ({ item }) => (
    <SentFriendRequestBox
      navigation={navigation}
      username={item.username}
      url={item.url} 
      realName={item.realname}
      chosenFriends={chosenFriends} 
      setChosenFriends={setChosenFriends}
      isTitle={item.isTitle}
      numFriends={friends.length}
      setFriends={setFriends}
      profilePic={item.profilePic}
    />
  )

  return (
    <>
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={(item) => item.username}
        style={[styles.flatList, { marginBottom: 170 }]}
        refreshControl={
          <RefreshControl 
            colors={['black']}
            tintColor={COLORS.primary}
            refreshing={refreshing}
            style={{ backgroundColor: COLORS.bgColor }}
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
    display: 'flex',
    paddingHorizontal: 10,
  },
});

export default SentFriendRequestList;
