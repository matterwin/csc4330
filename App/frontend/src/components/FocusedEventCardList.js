import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, RefreshControl, ActivityIndicator, Text, View } from 'react-native';
import { COLORS } from '../constants';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import UserImageIcon from './UserImageIcon';
import FocusedEventCard from './FocusedEventCard';
import { singleEvent } from '../api/handleEvent';

const FocusedEventCardList = ({ navigation, eventId }) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await singleEvent(token, eventId);

      if (res.status === 200) {
        setPosts(res.data.formattedEvent);
      }
    } finally {
        setRefreshing(false);
        setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if(loading){
    return(
        <>
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        </>
    );
  }

  const renderItem = ({ item }) => (
    <FocusedEventCard
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
      />
    </>
  );
};

const styles = StyleSheet.create({
  flatList: {
    width: '100%'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default FocusedEventCardList;
