import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, RefreshControl, ActivityIndicator, View, Text } from 'react-native';
import { COLORS } from '../../constants';
import { useSelector } from 'react-redux';
import { showAllUsers, showAllUsersWithFilter } from '../../api/handleFriend';
import AllUsersBox from './AllUsersBox';
import Icon from 'react-native-vector-icons/Ionicons';

const AllUsersList = ({ navigation, chosenFriends, setChosenFriends, person }) => {
  const [friends, setFriends] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.auth.token);

  const fetchData = async (filter) => {
    try {
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

  if(friends.length === 0 && !loading) {
    return (
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
        <View style={styles.rightSideOfTop}>
          <View style={styles.textCircle}>
            <Icon name='man' size={22} color={COLORS.primary}/>
            <Text style={{ color: COLORS.darkgrey, paddingRight: 10, fontSize: 18 }}>Nobody found</Text>
          </View>
        </View>
      </View>
    );
  }

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
        <View style={{ display: 'flex', marginTop: 'auto', marginTop: 20 }}>
            <ActivityIndicator size="default" color={COLORS.black}/>
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
            tintColor={COLORS.primary}
            refreshing={refreshing}
            style={{ backgroundColor: COLORS.bgColor, overflow: 'hidden' }}
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
    paddingHorizontal: 10,
    marginBottom: 85,
  },
  rightSideOfTop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5
  },
  textCircle: {
    padding: 5,
    borderRadius: "100%",
    // borderColor: COLORS.greySuperLight,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
});

export default AllUsersList;
