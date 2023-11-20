import React from "react";
import { StyleSheet } from "react-native";
import DiscoveryList from "../components/DiscoveryList";
import ContainerNoMargin from "../components/containers/ContainerNoMargin";

const DiscoverScreen = ({ navigation }) => {
  return (
    <>
      <ContainerNoMargin>
          <DiscoveryList navigation={navigation} />
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
