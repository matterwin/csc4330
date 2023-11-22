import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView, TextInput, KeyboardAvoidingView, SafeAreaView, Keyboard, Switch } from "react-native";
import { useSelector } from 'react-redux';
import { ROUTES, COLORS } from '../constants';
import { FONTS } from "../constants";
import UserImageIcon from "../components/UserImageIcon";
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import UploadEventImage from "../components/UploadEventImage";
import * as Haptics from 'expo-haptics';

const PostEventScreen = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const [next, setNext] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState('');

  const handleInputChange = (text, field) => {
    switch (field) {
      case 'title':
        setTitle(text);
        break;
      case 'desc':
        setDesc(text);
        break;
      default:
        break;
    }

    if (title.trim().length > 0) {
      setNext(true);
    } else {
      setNext(false);
    }
  };

  const handleNextPage = () => {
    if(!next) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("PostEventNextScreen", { title, desc, image, date: date.toISOString()});
  }

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setIsEnabled(previousState => !previousState);
  }
  const [date, setDate] = useState(new Date());

  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
  };

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
          <View style={styles.infoContainer}>
              <TextInput
                style={[styles.input, { fontFamily: FONTS.Poppins_500 }]}
                value={title}
                onChangeText={(text) => handleInputChange(text, 'title')}
                placeholder="Give your meetup or event a title*"
                placeholderTextColor={COLORS.grey}
              />
          </View>
          <View style={styles.infoContainer}>
            <UploadEventImage image={image} setImage={setImage} />
          </View>
          <View style={styles.infoContainer}>
              <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Describe your event: what it's about, what it's for, anything thing you want"
                placeholderTextColor={COLORS.grey}
                value={desc}
                onChangeText={(text) => handleInputChange(text, 'desc')}
                textAlignVertical="top"
                multiline
                numberOfLines={5}
                onKeyPress={(event) => {
                    if (event.nativeEvent.key === 'Enter') {
                      Keyboard.dismiss();
                    }
                }}
              />
          </View>
          <View style={[styles.timeContainer, { display: 'flex', justifyContent: 'space-between' }]}>
            <View style={styles.iconAndTextRow}>
              <Icon name="calendar" size={22} color={COLORS.primaryLight} />
              <Text style={[styles.title, { paddingRight: 0, }]}>Show date and time</Text>
            </View>
            <Switch
              trackColor={{false: '#ffffff', true: '#03df9b'}}
              thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ marginRight: 10 }}
            />
          </View>
          {isEnabled && (<>
            <View style={[styles.timeContainer, { display: 'flex', justifyContent: 'space-between' }]}>
              <Text style={[styles.title, { paddingRight: 0 }]}>Time</Text>
              <DateTimePicker
                  value={date}
                  mode={"time"}
                  is24Hour={true}
                  onChange={onChange}
                  accentColor={COLORS.primaryLight}
                  themeVariant="light"
                  textColor="white"
              />
            </View>
            <View style={[styles.timeContainer, { display: 'flex', justifyContent: 'space-between' }]}>
              <Text style={[styles.title, { paddingRight: 0 }]}>Date</Text>
              <DateTimePicker
                  value={date}
                  mode={"date"}
                  is24Hour={true}
                  onChange={onChange}
                  accentColor={COLORS.primaryLight}
                  themeVariant="light"
              />
            </View>
          </>)}
        </ScrollView>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ display: 'flex', flex: 0, backgroundColor: COLORS.bgColor }}>
        <View style={styles.btnContainer} onTouchStart={handleNextPage}>
          <View style={[ styles.sendBtn, { backgroundColor: next ? COLORS.primaryLight : COLORS.grey }]}>
              <Text style={styles.btnText}>Next</Text>
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
    backgroundColor: COLORS.white
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
    paddingLeft: 10,
    paddingRight: 10,
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

export default PostEventScreen;