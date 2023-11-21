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
    </>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    marginLeft: 'auto',
  },
});

export default ProfileEventScreen;



// gooback means from this page
// maybe have to create another stack screen in profile nav