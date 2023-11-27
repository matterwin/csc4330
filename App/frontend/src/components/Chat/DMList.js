import React, { useState, useCallback } from 'react';
import { FlatList, StyleSheet, View, RefreshControl, Text } from 'react-native';
import DMBox from './DMBox';
import CircleBtn from '../CircleBtn';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';

const initialDms = [
  { id: '0', isTitle: true, title: 'Direct Messages' },
  { id: '1', dmID: 234324, username: 'huahwi', url: 'bs', lastMsg: 'hi there', whoSentLastMsg: 'You' },
  { id: '2', dmID: 25464, username: 'penny', url: 'bs', lastMsg: 'hi there', whoSentLastMsg: 'You' },
  { id: '3', dmID: 223434, username: 'johne', url: 'bs', lastMsg: 'hi there', whoSentLastMsg: 'You' },
];

const DMList = ({ navigation }) => {
  const [dms, setDms] = useState(initialDms);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // You can perform your data fetching or refreshing logic here
    // For example, fetch new data from an API

    // Simulating a delay for demonstration purposes
    setTimeout(() => {
      setDms(initialDms);
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderItem = ({ item }) => (
    <DMBox 
        navigation={navigation} 
        username={item.username} 
        url={item.url} 
        lastMsg={item.lastMsg} 
        whoSentLastMsg={item.whoSentLastMsg} 
        dmID={item.dmID}
        isTitle={item.isTitle}
    />
  );

  return (
    <>
      <FlatList
        data={dms}
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
      <View style={styles.addButtonContainer}>
        <CircleBtn chatBtn={true} navigation={navigation}>
          <Icon name="send" size={24} color="white" />
        </CircleBtn>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flatList: {
    width: '100%',
  },
  addButtonContainer: {
    position: 'absolute',
    margin: 10,
    bottom: 0,
    right: 0,
    backgroundColor:'transparent'
  },
});

export default DMList;
