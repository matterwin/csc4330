import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView, TextInput, KeyboardAvoidingView } from "react-native";
import { useSelector } from 'react-redux';
import { ROUTES, COLORS } from '../constants';
import { FONTS } from "../constants";
import UserImageIcon from "../components/UserImageIcon";
import Icon from 'react-native-vector-icons/Ionicons';
import UploadEventImage from "../components/UploadEventImage";
import * as Haptics from 'expo-haptics';

const CreateEventRequiredScreen = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const [next, setNext] = useState(false);
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [image, setImage] = useState(null);
  const [privacyType, setPrivacyType] = useState('Friends Only');
  const [tapped, setTapped] = useState(false);

  const handleInputChange = (text, field) => {
    switch (field) {
      case 'title':
        setTitle(text);
        break;
      case 'place':
        setPlace(text);
        break;
      case 'privacy':
        setPrivacyType(text);
        break;
      default:
        break;
    }

    if (title.trim().length > 0 && place.trim().length > 0 && privacyType.trim().length > 0) {
      setNext(true);
    } else {
      setNext(false);
    }
  };

  const handleTap = (text) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setTapped(!tapped);
    setPrivacyType(text);
  };

  const handleNextPage = () => {
    if(!next) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("CreateEventOptionalScreen", { title, place, image, privacyType});
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', paddingBottom: 500}}>
            {/* <View style={styles.nameAndPicContainer}>
              <View style={{ marginRight: 5 }}>
                  <UserImageIcon url={user.profilePic} width={35} height={35} />
              </View>
              <Text style={styles.username}>{user.username}</Text>
            </View> */}
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Title of event:</Text>
              <TextInput
                style={styles.input}

                value={title}
                onChangeText={(text) => handleInputChange(text, 'title')}
              />
            </View>
            <View style={styles.infoContainer}>
              <UploadEventImage image={image} setImage={setImage} />
              <Text style={[styles.profText, { marginVertical: 10, marginLeft: 'auto', marginRight: 'auto', marginBottom: 0 }]}>Choose Event Image</Text>
              <Text style={[styles.profSubText, { marginLeft: 'auto', marginRight: 'auto' }]}>(Not required)</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Place:</Text>
              <TextInput
                style={styles.input}
                value={place}
                onChangeText={(text) => handleInputChange(text, 'place')}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={[styles.title, { marginBottom: 5 }]}>Privacy: </Text>
              <View style={[styles.textCircle, { backgroundColor: !tapped ? COLORS.primaryLight : COLORS.bgColor }]} onTouchStart={() => handleTap("Friends Only")}>
                <Icon name="person" size={18} color={(!tapped) ? COLORS.white : COLORS.primary}/>
                <Text style={{ color: (!tapped) ? COLORS.white : "#000" }}>Friends Only</Text>
              </View>
              <View style={[styles.textCircle, { backgroundColor: tapped ? COLORS.primaryLight : COLORS.bgColor }]} onTouchStart={() => handleTap("Anyone")}>
                <Icon name="globe" size={18} color={(tapped) ? COLORS.white : COLORS.primary}/>
                <Text style={{ color: (tapped) ? COLORS.white : "#000" }}>Anyone</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ display: 'flex', flex: 0, backgroundColor: COLORS.bgColor }}>
        <View style={styles.btnContainer} onTouchStart={handleNextPage}>
          <View style={[ styles.sendBtn, { backgroundColor: next ? COLORS.primaryLight : COLORS.grey }]}>
              <Text style={styles.btnText}>Next</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgColor,
    flex: 1,
  },
  infoContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.greySuperLight,
    paddingVertical: 15,
    paddingBottom: 0,
    display: 'flex'
  },
  btnContainer: {
    width: "100%",
    paddingHorizontal: 10,
    position: 'relative',
    bottom: 0,
    paddingBottom: 100,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  sendBtn: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  textCircle: {
    padding: 10,
    borderRadius: "100%",
    borderWidth: 1,
    borderColor: COLORS.greySuperLight,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 10
  },
  btnText: {
      fontFamily: FONTS.Poppins_600,
      color: '#fff',
      fontSize: 15,
  },
  title: {
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: FONTS.Poppins_500,
    fontSize: 16,
  },
  descText: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
  },
  profText: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 20,
  },
  profSubText: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 13,
    fontWeight: 400,
    marginBottom: 20,
  },
  text: {
    fontFamily: FONTS.Poppins_400,
    fontSize: 14,
  },
  input: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 500,
  },
  nameAndPicContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginBottom: 5
  },
  username: {
      fontSize: 14,
      fontFamily: FONTS.Poppins_500
  },
});

export default CreateEventRequiredScreen;