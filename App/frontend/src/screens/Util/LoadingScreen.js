import React from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import Spacer from "../../components/containers/Spacer";
import ProfileImage from "../../components/Upload/ProfileImage";
import { FONTS } from "../../constants";

const LoadingScreen = () => {

  return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ProfileImage width={150} height={150} />
            <Text style={{ fontFamily: FONTS.Poppins_500, fontSize: 20 }}>Social Eyes</Text>
            <Spacer height={10} />
        </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
});

export default LoadingScreen;
