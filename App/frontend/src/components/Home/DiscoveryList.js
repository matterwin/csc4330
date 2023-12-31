import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import EventCard from './EventCard';
import { COLORS } from '../../constants';
import { allPublicExcludingFriendsEvents } from '../../api/handleEvent';
import { useSelector } from 'react-redux';

const DiscoveryEventList = ({ navigation }) => {
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
      const res = await allPublicExcludingFriendsEvents(token, page, null);

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
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  // useEffect(() => {
  //   onRefresh();
  // },[useSelector(state => state.fetch.shouldFetchDiscoverData)])

  const getRefreshData = async () => {
    try {
      setLoadingMore(true);
      const res = await allPublicExcludingFriendsEvents(token, 1, 5);

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
        invited={item.invited}
        joined={item.joined}
    />
  );

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
  },
});

export default DiscoveryEventList;
