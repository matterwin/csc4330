import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, RefreshControl, ActivityIndicator, View } from 'react-native';
import { COLORS } from '../../constants';
import { useSelector } from 'react-redux';
import { showAllUsers, showAllUsersWithFilter } from '../../api/handleFriend';
import AllUsersBox from '../Friend/AllUsersBox';

const AllHobbiesList = ({ navigation, chosenFriends, setChosenFriends, person }) => {
  const [friends, setFriends] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.auth.token);

  const fetchData = async (filter) => {
    try {
      setLoadingMore(true);
      let res;
      if(filter) {
        res = await showAllUsersWithFilter(token, person);
      } else {
        res = await showAllUsers(token);
      }

      if (res.status === 200) {
        setFriends(res.data.formattedUsers);
      }
    } finally {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if(person.trim !== '') fetchData(true);
    else fetchData(false);
  },[person])

  const onRefresh = useCallback(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData(false);
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
    {loading && 
        <View style={{ display: 'flex', marginTop: 'auto', marginBottom: 30 }}>
            <ActivityIndicator size="small" color={COLORS.black}/>
        </View> 
    }
    {!loading && 
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
    }
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

export default AllHobbiesList;
