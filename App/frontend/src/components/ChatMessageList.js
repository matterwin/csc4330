import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ChatMessage from './ChatMessage';

const ChatMessageList = ({ navigation }) => {
  const data = [
    { id: '1', name: 'huahwi', url: 'bs', msgSent: 'hi there', sentDate: '11/12/2034 4:30 PM' },
    { id: '2', name: 'your_username', url: 'bs', msgSent: 'whats up my guy whats up my guy whats up my guy whats up my guy whats up my guy whats up my guy whats up my guy, hello there', sentDate: '11/12/2034 4:33 PM'},
    { id: '3', name: 'huahwi', url: 'bs', msgSent: 'chilling', sentDate: '11/12/2034 4:35 PM'},
    { id: '4', name: 'huahwi', url: 'bs', msgSent: 'chilling', sentDate: '11/12/2034 4:36 PM'},
    { id: '5', name: 'huahwi', url: 'bs', msgSent: 'chilling', sentDate: '11/12/2034 4:37 PM'},
    { id: '6', name: 'huahwi', url: 'bs', msgSent: 'chilling', sentDate: '11/12/2034 4:38 PM'},
    { id: '7', name: 'huahwi', url: 'bs', msgSent: 'chilling', sentDate: '11/12/2034 4:39 PM'},
    { id: '8', name: 'huahwi', url: 'bs', msgSent: 'chilling', sentDate: '11/12/2034 4:40 PM'},
    { id: '9', name: 'huahwi', url: 'bs', msgSent: 'chilling', sentDate: '11/12/2034 4:41 PM'},
    { id: '10', name: 'huahwi', url: 'bs', msgSent: 'chilling', sentDate: '11/12/2034 4:42 PM'},
    { id: '11', name: 'huahwi', url: 'bs', msgSent: 'chilling', sentDate: '11/12/2034 4:43 PM'},
  ];

  const renderItem = ({ item }) => (
    <ChatMessage 
        navigation={navigation} 
        name={item.name} 
        url={item.url} 
        msgSent={item.msgSent}
        sentDate={item.sentDate}
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
    paddingLeft: 5,
  },
});

export default ChatMessageList;
