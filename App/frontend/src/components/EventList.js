import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, RefreshControl, ActivityIndicator, Text, View } from 'react-native';
import EventCard from './EventCard';
import { COLORS, FONTS } from '../constants';
import { allYourFriendsEvents } from '../api/handleEvent';
import { useDispatch, useSelector } from 'react-redux';
import UserImageIcon from './UserImageIcon';

const EventList = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [stopLoadingMore, setStopLoadingMore] = useState(false);
  const [refreshedData, setRefreshedData] = useState([]);
  const token = useSelector(state => state.auth.token);

  const fetchData = async (clearAll) => {
    try {
      setLoadingMore(true);
      const res = await allYourFriendsEvents(token, page, null);

      if (res.status === 200) {
        if(res.data.eventsOnPage === 0){
          setStopLoadingMore(true);
          return;
        }

        const newEvents = clearAll
          ? res.data.formattedEvents
          : [...posts, ...res.data.formattedEvents];

        setPosts(newEvents);
        setPage(prevPage => prevPage + 1);
      }
    } finally {
      setLoadingMore(false);
    }
  };

  const getRefreshData = async () => {

    try {
      setLoadingMore(true);
      const res = await allYourFriendsEvents(token, 1, 5);

      if (res.status === 200) {
        const refreshedSet = res.data.formattedEvents;
        if (refreshedSet.length > 0) {
          setRefreshedData(res.data.formattedEvents);
        }
      }
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    onRefresh();
  },[useSelector(state => state.fetch.shouldFetchFriendsData)])

  // answer is if we see 1 event that is present in both sets, then stop adding events to the newEvents array
  // basically upon seeing the 1st duplicated event, cancel the filtering of newEvents
  // useEffect(() => {
  //   if (refreshedData.length > 0) {
  //     const newEvents = [];
  //     const seenIds = new Set(posts.map(event => event._id));

  //     for (const existingEvent of refreshedData) {
  //       if (!seenIds.has(existingEvent._id)) {
  //         newEvents.push(existingEvent);
  //         seenIds.add(existingEvent._id);
  //       } else {
  //         // Stop adding events upon encountering the first duplicated event
  //         break;
  //       }
  //     }

  //     setPosts(prev => [...newEvents, ...prev]);
  //     setRefreshing(false);
  //   }
  // },[refreshedData])

  const onRefresh = useCallback(() => {
    setPage(1);
    fetchData(true);
    // setRefreshing(true);
    // getRefreshData(posts.length);
    // different type of refreshing
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
      realname={item.owner.realname}
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

  if(posts.length === 0){
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
            tintColor={COLORS.green}
            refreshing={refreshing}
            style={{ backgroundColor: COLORS.primaryLight }}
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

export default EventList;
