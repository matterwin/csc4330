import React from "react";
import { StyleSheet, View } from "react-native";
import DMList from "../components/DMList";
import ContainerNoMargin from "../components/containers/ContainerNoMargin";

const ChatScreen = ({ navigation }) => {
  return (
    <>
      <ContainerNoMargin>
        <View style={styles.listOfChatContainer}>
          <DMList navigation={navigation} />
        </View>
      </ContainerNoMargin>
    </>
  );
}

const styles = StyleSheet.create({
  listOfChatContainer: {
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start', 
    width: '100%'
  }
});

export default ChatScreen;
