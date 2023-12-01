import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, RefreshControl, ActivityIndicator, Text, View } from 'react-native';
import EventCard from '../Home/EventCard';
import { COLORS, FONTS } from '../../constants';
import { allYourFriendsEvents } from '../../api/handleEvent';
import { useSelector } from 'react-redux';
import { allYourEvents } from '../../api/handleEvent';
import UserImageIcon from '../Upload/UserImageIcon';

const YourEventList = ({ navigation, scrollOffsetY }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [stopLoadingMore, setStopLoadingMore] = useState(false);
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState(true);

  const fetchData = async (clearAll) => {
    try {
      setLoadingMore(true);
      const res = await allYourEvents(token, page, null);

      if (res.status === 200) {
        if(res.data.eventsOnPage === 0){
          setStopLoadingMore(true);
          return;
        }

        if(clearAll) setPosts(res.data.formattedEvents);
        else setPosts(prevPosts => [...prevPosts, ...res.data.formattedEvents]);
        setPage(prevPage => prevPage + 1);
      }
    } finally {
      setLoadingMore(false);
    }
  };

  const onRefresh = useCallback(() => {
    setPage(1);
    fetchData(true);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const onEndReached = () => {
    // Check if there is more data to fetch
    if (!loadingMore && posts.length > 0 && !stopLoadingMore) {
      fetchData();
    }
  };

  const renderLoadingIndicator = () => {
    return loadingMore ? <ActivityIndicator size="small" color={COLORS.black} style={{ marginBottom: 20 }}/> : null;
  };
  
  const renderItem = ({ item }) => (
    <EventCard
      navigation={navigation} 
      eventId={item._id}
      username={item.owner.username}
      profilePic={item.owner.profilePic}
      privacyType={item.privacyType}
      titleOfEvent={item.titleOfEvent}
      place={item.place}
      eventImage={item.eventImage}
      exactLocation={item. exactLocation}
      description={item.description}
      dateAndTimeOfEvent={item.dateAndTimeOfEvent}
      createdAt={item.createdAt}
    />
  );

  if(posts.length === 0 && !loading){
    return(
      <>
        <View style={styles.noFriendsContainer}>
          <UserImageIcon height={90} width={90} />
          <View style={styles.noFriendMsg}>
            <Text style={styles.msg}>Add people and become friends to see events</Text>
          </View>
        </View>
      </>
    );
  }

  if(loading) {
    <View style={{ display: 'flex', marginTop: 'auto', paddingTop: 500 }}>
        <ActivityIndicator size="default" color={COLORS.black}/>
    </View> 
  }

  return (
    <>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={styles.flatList}
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
        onEndReached={onEndReached}
        onEndReachedThreshold={0.05}
        ListFooterComponent={renderLoadingIndicator} // Add this line
      />
    </>
  );
};

const styles = StyleSheet.create({
  flatList: {
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 85
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

export default YourEventList;
