import React from "react";
import { StyleSheet, Animated } from "react-native";
import DiscoveryList from "../../components/Home/DiscoveryList";
import ContainerNoMargin from "../../components/containers/ContainerNoMargin";

const DiscoverScreen = ({ navigation }) => {
  const av = new Animated.Value(0);
  av.addListener(() => {return});

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
