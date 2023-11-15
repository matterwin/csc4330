import React, { useState } from 'react';
import { FlatList, StyleSheet, SafeAreaView, View } from 'react-native';
import ChatMessage from './ChatMessage';
import { COLORS } from '../constants';
import WriteAMessage from './WriteAMessage';

const initialMessages = [
  { id: '1', username: 'huahwi', url: 'bs', msgSent: 'hi there dsfsd f sdfsdf sdf dsf sd', sentDate: '11/12/2034 4:30 PM' },
  { id: '2', username: 'bigballer', url: 'bs', msgSent: 'whats up my guy whats up my guy whats up my guy whats up my guy whats up my guy whats up my guy whats up my guy, hello there', sentDate: '11/12/2034 4:33 PM'},
  { id: '3', username: 'huahwi', url: 'bs', msgSent: 'chilling', sentDate: '11/12/2034 4:35 PM'},
  { id: '4', username: 'huahwi', url: 'bs', msgSent: 'chilling fsdf sdf', sentDate: '11/12/2034 4:36 PM'},
  { id: '5', username: 'huahwi', url: 'bs', msgSent: 'chilling', sentDate: '11/12/2034 4:37 PM'},
  { id: '6', username: 'huahwi', url: 'bs', msgSent: 'chilling ds fsd f dsf', sentDate: '11/12/2034 4:38 PM'},
  { id: '7', username: 'huahwi', url: 'bs', msgSent: 'chilling', sentDate: '11/12/2034 4:39 PM'},
  { id: '8', username: 'bigballer', url: 'bs', msgSent: 'chilling sdfsdf', sentDate: '11/12/2034 4:40 PM'},
  { id: '9', username: 'huahwi', url: 'bs', msgSent: 'c', sentDate: '11/12/2034 4:41 PM'},
  { id: '10', username: 'huahwi', url: 'bs', msgSent: 'chilling ds f', sentDate: '11/12/2034 4:42 PM'},
  { id: '11', username: 'huahwi', url: 'bs', msgSent: 'chilling sdf ', sentDate: '11/12/2034 4:43 PM'},
];

const ChatMessageList = ({ navigation }) => {
  const [messages, setMessages] = useState(initialMessages);

  const appendMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const renderItem = ({ item, index }) => (
    <ChatMessage 
        navigation={navigation} 
        username={item.username} 
        url={item.url} 
        msgSent={item.msgSent}
        sentDate={item.sentDate}
        isNewMessage={index === 0}
    />
  )

  return (
    <>
      <FlatList
        inverted
        data={[...messages].reverse()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
      <SafeAreaView style={{ backgroundColor: COLORS.bgColor }}>
        <WriteAMessage appendMessage={appendMessage} lastMsgSendId={messages[messages.length-1].id}/>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flatList: {
    paddingLeft: 5,
  },
});

export default ChatMessageList;

// just send an api request or websocket whatever whenever you send a message

// api polling or websocket to deal with this