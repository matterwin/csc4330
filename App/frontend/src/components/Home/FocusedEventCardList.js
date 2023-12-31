import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, RefreshControl, ActivityIndicator, Text, View } from 'react-native';
import { COLORS } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import UserImageIcon from '../Upload/UserImageIcon';
import FocusedEventCard from './FocusedEventCard';
import { singleEvent } from '../../api/handleEvent';import { Button } from 'react-native';

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
      invited={item.invited}
      joined={item.joined}
      invitedUsers={item.invitedUsers}
      joinedUsers={item.joinedUsers}
      fetchData={fetchData}
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
      />
    </>
  );
};

const styles = StyleSheet.create({
  flatList: {
    width: '100%',
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default FocusedEventCardList;
