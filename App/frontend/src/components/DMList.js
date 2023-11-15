import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import DMBox from './DMBox';

const DMList = ({ navigation }) => {
  const data = [
    { id: '1', dmID: 234324, username: 'huahwi', url: 'bs', lastMsg: 'hi there', whoSentLastMsg: 'You' },
    { id: '2', dmID: 25464, username: 'penny', url: 'bs', lastMsg: 'hi there', whoSentLastMsg: 'You' },
    { id: '3', dmID: 223434, username: 'johne', url: 'bs', lastMsg: 'hi there', whoSentLastMsg: 'You' },
  ];

  const renderItem = ({ item }) => (
    <DMBox 
        navigation={navigation} 
        username={item.username} 
        url={item.url} 
        lastMsg={item.lastMsg} 
        whoSentLastMsg={item.whoSentLastMsg} 
        dmID={item.dmID}
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
