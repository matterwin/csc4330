import React, { useState, useCallback } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import EventCard from './EventCard';
import Animated, { FadeOut } from 'react-native-reanimated';
import { COLORS } from '../constants';

const initialPosts = [
  { 
      id: '1', 
      username: 'huahwi', 
      url: 'bs',
      titleOfEvent: 'Billiards Meet Up',
      place: 'LSU UREC',
      exactLocation: 'LSU Drive 1', 
      timeOfEvent: '11/12/23 7:30 AM - 5:30 AM', 
      desc: 'Example data test to test the description',
      privacyType: 'Private'
  },
  { 
    id: '2', 
    username: 'huahwi', 
    url: 'bs',
    titleOfEvent: 'Billiards Meet Up',
    place: 'LSU UREC',
    exactLocation: 'LSU Drive 1', 
    timeOfEvent: '11/12/23 7:30 AM - 5:30 AM', 
    desc: 'Example data test to test the description',
    privacyType: 'Private'
  },
];

const EventList = ({ navigation }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // You can perform your data fetching or refreshing logic here
    // For example, fetch new data from an API

    // Simulating a delay for demonstration purposes
    setTimeout(() => {
      setPosts(initialPosts);
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderItem = ({ item }) => (
    <EventCard
        navigation={navigation} 
        username={item.username}
        titleOfEvent={item.titleOfEvent}
        place={item.place}
        exactLocation={item. exactLocation}
        timeOfEvent={item.timeOfEvent}
        desc={item.desc}
        privacyType={item.privacyType}
    />
  )

  return (
    <>
      <FlatList
        data={posts}
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
  flatList: {
    width: '100%'
  },
});

export default EventList;
