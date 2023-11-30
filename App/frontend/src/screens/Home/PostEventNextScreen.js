import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView, TextInput, KeyboardAvoidingView, SafeAreaView, Keyboard } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES, COLORS } from '../../constants';
import { FONTS } from "../../constants";
import UserImageIcon from "../../components/Upload/UserImageIcon";
import Icon from 'react-native-vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { uploadEventImage } from "../../api/handleUpload";
import { createEvent } from "../../api/handleEvent";
import { setFetchFlag } from "../../redux/fetch/fetchActions";
import FriendInfoSheet from "../../components/Sheets/FriendInfoSheet";
import { toggleSheet } from "../../redux/sheet/sheetActions";

const PostEventNextScreen = ({ navigation, route }) => {
    const {
        title,
        desc,
        image,
        date
    } = route.params;

  const user = useSelector(state => state.user);
  const [next, setNext] = useState(true);
  const [place, setPlace] = useState('');
  const [privacyType, setPrivacyType] = useState('Friends Only');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [tapped, setTapped] = useState(false);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  const event = {
    privacyType: privacyType,
    titleOfEvent: title,
    place: place,
    eventImage: image,
    exactLocation: address,
    description: desc,
    dateAndTimeOfEvent: date,
    invitedUsers: useSelector((state) => state.invites.invitedUsers)
  };

    const handleInputChange = (text, field) => {
        switch (field) {
            case 'place':
                setPlace(text);
                break;
            case 'privacyType':
                setPrivacyType(text);
                break;
            case 'address':
                setAddress(text);
                break;
            default:
                break;
        }
    };

  const handleNextPage = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setLoading(true);
    eventCreation();
  }

  const eventCreation = async () => {
    try {
      const res = await createEvent(token, event);

      if (res.status === 201) {
        console.log(res.data.event);
        
        if(route.params.image !== null){
          imageUpload(res.data.event._id);
        } else {
          navigation.navigate("BottomNav"); // can change this to be more specific navigation
          dispatch(setFetchFlag('Friends'));
          dispatch(setFetchFlag('Discover'));
        }
      }
      else {
        console.log(res.data);
      }
    } finally {
      setLoading(false);
      navigation.navigate("BottomNav");
    }
  };

  const imageUpload = async (eventId) => {
    try {
      const res = await uploadEventImage(token, route.params.image, eventId);

      if (res.status === 201) {
        console.log(res.data);
      }
      else {
        console.log(res.data);
      }
    } finally {
      setLoading(false);
      dispatch(setFetchFlag((privacyType === 'Anyone' ? 'Discover' : 'Friends')), true);
    }
  };

  const handleTap = (text) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setTapped(!tapped);
    setPrivacyType(text);
  };

  const handlePrivateTap = (text) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setTapped(!tapped);
    setPrivacyType(text);
    dispatch(toggleSheet('invitePeopleSheet'));
  }

  return (
    <>
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bgColor }}>
      <View style={styles.container}>
        <ScrollView>
          <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10 }}>
            <View style={styles.nameAndPicContainer}>
                <View style={{ marginRight: 5 }}>
                    <UserImageIcon url={user.profilePic} width={35} height={35} />
                </View>
                <Text style={styles.username}>{user.username}</Text>
            </View>
          </View>
          <View style={[styles.infoContainer, { marginTop: 0 }]}>
              <Text style={[styles.title, { marginBottom: 5, marginLeft: 10 }]}>Privacy: </Text>
              <View style={[styles.textCircle, { backgroundColor: privacyType === 'Friends Only' ? COLORS.primaryLight : COLORS.bgColor }]} onTouchStart={() => handleTap("Friends Only")}>
                <Icon name="person" size={20} color={(privacyType === 'Friends Only') ? COLORS.white : COLORS.primary}/>
                <Text style={{ color: (privacyType === 'Friends Only') ? COLORS.white : "#000", fontSize: 16 }}>Friends Only</Text>
              </View>
              <View style={[styles.textCircle, { backgroundColor: privacyType === 'Anyone' ? COLORS.primaryLight : COLORS.bgColor }]} onTouchStart={() => handleTap("Anyone")}>
                <Icon name="globe" size={20} color={(privacyType === 'Anyone') ? COLORS.white : COLORS.primary}/>
                <Text style={{ color: (privacyType === 'Anyone') ? COLORS.white : "#000", fontSize: 16 }}>Anyone</Text>
              </View>
              <View style={[styles.textCircle, { backgroundColor: privacyType === 'Private' ? COLORS.primaryLight : COLORS.bgColor }]} onTouchStart={() => handlePrivateTap("Private")}>
                <Icon name="finger-print" size={20} color={(privacyType === 'Private') ? COLORS.white : COLORS.primary}/>
                <Text style={{ color: (privacyType === 'Private') ? COLORS.white : "#000", fontSize: 16 }}>Private</Text>
              </View>
            </View>
            <View style={[styles.infoContainer, { backgroundColor: COLORS.white, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingRight: 10 }]}>
                <TextInput
                    style={[styles.input, { flex: 1, fontFamily: FONTS.Poppins_500 }]}
                    value={place}
                    onChangeText={(text) => handleInputChange(text, 'place')}
                    placeholder="General place of interest"
                    placeholderTextColor={COLORS.grey}
                />
                <Icon name="bonfire" size={22} color={COLORS.primaryLight} />
            </View>
            <View style={[styles.infoContainer, { backgroundColor: COLORS.white, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingRight: 10 }]}>
                <TextInput
                    style={[styles.input, { flex: 1, fontFamily: FONTS.Poppins_500 }]}
                    value={address}
                    onChangeText={(text) => handleInputChange(text, 'address')}
                    placeholder="Physical Address"
                    placeholderTextColor={COLORS.grey}
                />
                <Icon name="compass" size={22} color={COLORS.primaryLight} />
            </View>
        </ScrollView>
      </View>
      
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ display: 'flex', flex: 0, backgroundColor: COLORS.bgColor }}>
        <View style={styles.btnContainer} onTouchStart={handleNextPage}>
          <View style={[ styles.sendBtn, { backgroundColor: next ? COLORS.primaryLight : COLORS.grey }]}>
              <Text style={styles.btnText}>Post</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
      </SafeAreaView>
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
    borderBottomColor: COLORS.grey,
    paddingBottom: 15,
    paddingBottom: 0,
    display: 'flex',
    // backgroundColor: COLORS.white
  },
  btnContainer: {
    width: "100%",
    paddingHorizontal: 10,
    position: 'relative',
    bottom: 0,
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
    // paddingLeft: 10,
    // paddingRight: 10,
    fontFamily: FONTS.Poppins_500,
    fontSize: 16,
  },
  timeContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.greySuperLight,
    paddingVertical: 5,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconAndTextRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginLeft: 10
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
    fontSize: 16,
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
  nameAndPicContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // marginLeft: 10,
    marginBottom: 5
},
username: {
    fontSize: 14,
    fontFamily: FONTS.Poppins_500
},
rightSideOfTop: {
    marginLeft: 'auto', 
    // marginRight: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5
},
});

export default PostEventNextScreen;