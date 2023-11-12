import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import DMBox from './DMBox';

const DMList = ({ navigation }) => {
  const data = [
    { id: '1', name: 'huahwi', url: 'bs', lastMsg: 'hi there', whoSentLastMsg: 'You' },
    { id: '2', name: 'penny', url: 'bs', lastMsg: 'hi there', whoSentLastMsg: 'You' },
    { id: '3', name: 'johne', url: 'bs', lastMsg: 'hi there', whoSentLastMsg: 'You' },
  ];

  const renderItem = ({ item }) => (
    <DMBox 
        navigation={navigation} 
        name={item.name} 
        url={item.url} 
        lastMsg={item.lastMsg} 
        whoSentLastMsg={item.whoSentLastMsg} 
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

export default DMList;
