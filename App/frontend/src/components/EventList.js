import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import EventCard from './EventCard';

const EventList = ({ navigation }) => {
  const data = [
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
  ];

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
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    width: '100%'
  },
});

export default EventList;
