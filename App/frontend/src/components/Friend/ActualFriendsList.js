import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, RefreshControl, ActivityIndicator, View, Text } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import ActualFriendsBox from './ActualFriendsBox';
import { showFriends } from '../../api/handleFriend';
import { useSelector } from 'react-redux';
import UserImageIcon from '../Upload/UserImageIcon';

const ActualFriendsList = ({ navigation, chosenFriends, setChosenFriends }) => {
  const [friends, setFriends] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const token = useSelector(state => state.auth.token);

  const fetchData = async () => {
    try {
      setLoadingMore(true);
      const res = await showFriends(token);

      if (res.status === 200) {
        console.log(res.data.friendsList);
        setFriends(res.data.friendsList);
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
  },[useSelector(state => state.fetch.shouldFetchFriendsListData)])

  const renderItem = ({ item }) => (
    <ActualFriendsBox
      navigation={navigation}
      username={item.username}
      url={item.url} 
      realName={item.realname}
      chosenFriends={chosenFriends} 
      setChosenFriends={setChosenFriends}
      isTitle={item.isTitle}
      numFriends={friends.length}
      profilePic={item.profilePic}
    />
  )

  return (
    <>
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={(item) => item.username}
        style={styles.flatList}
        nestedScrollEnabled
        refreshControl={
          <RefreshControl 
            colors={['black']}
            tintColor={COLORS.primary}
            refreshing={refreshing}
            style={{ backgroundColor: COLORS.bgColor, display: 'flex' }}
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
    // padding: 5,
    paddingBottom: 100,
  },
  noFriendsContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noFriendMsg: {
    width: 200, 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 300,
    marginTop: 20,
  },
  msg: {
    textAlign: 'center',
    fontFamily: FONTS.Poppins_400,
    fontSize: 16
  }
});

export default ActualFriendsList;
