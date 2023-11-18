import React from "react";
import { StyleSheet, View } from "react-native";
import EventList from "../components/EventList";
import ContainerNoMargin from "../components/containers/ContainerNoMargin";

const ProfileEventScreen = ({ navigation }) => {
  return (
    <>
      <ContainerNoMargin>
          <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%' }}>
          <EventList navigation={navigation} />
          </View>
      </ContainerNoMargin>
      <View style={styles.addButtonContainer}></View>
    </>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    marginLeft: 'auto',
  },
});

export default ProfileEventScreen;
