import React from "react";
import { StyleSheet, View } from "react-native";
import DiscoveryEventList from "../components/DiscoveryEvent";
import ContainerNoMargin from "../components/containers/ContainerNoMargin";

const DiscoverScreen = ({ navigation }) => {
  return (
    <>
      <ContainerNoMargin>
          <DiscoveryEventList navigation={navigation} />
      </ContainerNoMargin>
    </>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    marginLeft: 'auto',
  },
});

export default DiscoverScreen;
