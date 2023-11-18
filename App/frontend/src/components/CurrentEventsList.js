import React, { useState, useCallback } from "react";
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Image, RefreshControl } from "react-native";
import { COLORS } from "../constants";
import * as Haptics from 'expo-haptics';

const initialCurrentEvents = [
    { 
        id: '1', 
        username: 'huahwi', 
        url: 'bs',
        titleOfEvent: 'Billiard',
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
        titleOfEvent: 'Park',
        place: 'LSU UREC',
        exactLocation: 'LSU Drive 1', 
        timeOfEvent: '11/12/23 7:30 AM - 5:30 AM', 
        desc: 'Example data test to test the description',
        privacyType: 'Private'
    },
    { 
        id: '3', 
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
        id: '4', 
        username: 'huahwi', 
        url: 'bs',
        titleOfEvent: 'Spiderman Meetup',
        place: 'LSU UREC',
        exactLocation: 'LSU Drive 1', 
        timeOfEvent: '11/12/23 7:30 AM - 5:30 AM', 
        desc: 'Example data test to test the description',
        privacyType: 'Private'
    },
  ];

  const EventItem = ({ event, navigation }) => {
    const { id, username, titleOfEvent, place, exactLocation, timeOfEvent, desc, privacyType } = event;
  
    const handleTap = () => {
      navigation.navigate("EventCardFromProfile", {
        id,
        username,
        titleOfEvent,
        place,
        exactLocation,
        timeOfEvent,
        desc,
        privacyType,
      });
    };

    return (
      <TouchableOpacity
        style={styles.eventItemContainer}
        onPress={handleTap}
        onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
      >
        <Text style={styles.eventItemTitle} numberOfLines={1}>{titleOfEvent}</Text>
        <Image source={require('../../assets/images/lsu.webp')} style={{ width: '100%', height: "100%" }}/>
      </TouchableOpacity>
    );
};

const CurrentEventsList = ({ navigation }) => {
    const [currentEvents, setCurrentEvents] = useState(initialCurrentEvents);
    const [refreshing, setRefreshing] = useState(false);
  
    const onRefresh = useCallback(() => {
        setRefreshing(true);
    
        // You can perform your data fetching or refreshing logic here
        // For example, fetch new data from an API
    
        // Simulating a delay for demonstration purposes
        setTimeout(() => {
          setCurrentEvents(initialCurrentEvents);
          setRefreshing(false);
        }, 1000);
    }, []);

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
            <RefreshControl
                colors={['black']}
                tintColor={COLORS.black}
                refreshing={refreshing}
                style={{ backgroundColor: 'transparent' }}
                size={"default"}
                onRefresh={onRefresh} 
            />
        }
      >
        {currentEvents.map((event) => (
            <EventItem key={event.id} event={event} navigation={navigation} />
        ))}
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        paddingLeft: 10,
        width: '100%'
    },
    eventItemContainer: {
        backgroundColor: "#fff",
        // padding: 10,
        marginRight: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        height: 80,
        width: 150,
    },
    eventItemTitle: {
        fontSize: 16,
        fontWeight: "bold",
        padding: 10,
        overflow: 'hidden',
    },
});

export default CurrentEventsList;
