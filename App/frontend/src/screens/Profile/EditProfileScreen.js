import React, { useState } from "react";
import { Text, StyleSheet, View, ScrollView, TextInput, KeyboardAvoidingView } from "react-native";
import { useSelector } from 'react-redux';
import { ROUTES, COLORS } from '../../constants';
import { FONTS } from "../../constants";
import UploadProfilePic from "../../components/Upload/UploadProfilePic";

const EditProfileScreen = ({ navigation }) => {
  const [changesOccurred, setChangesOccurred] = useState(false);
  const user = useSelector(state => state.user);
  const [image, setImage] = useState(null);
  const [realname, setRealname] = useState(user.realname);
  const [bio, setBio] = useState(user.bio);
  const [location, setLocation] = useState(user.location);

  const handleInputChange = (text, originalValue, field) => {
    if (text !== originalValue) {
      setChangesOccurred(true);
    } else {
      setChangesOccurred(false);
    }
    
    switch (field) {
      case 'bio':
        setBio(text);
        break;
      case 'location':
        setLocation(text);
        break;
      case 'realname':
        setRealname(text);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.infoContainer}>
              <UploadProfilePic image={image} setImage={setImage} />
              <Text style={[styles.profText, { marginVertical: 10, marginLeft: 'auto', marginRight: 'auto' }]}>Change Profile Image</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Real Name</Text>
              <TextInput
                style={styles.input}
                placeholder={user.realname}
                value={realname}
                onChangeText={(text) => handleInputChange(text, user.realname, 'realname')}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Bio</Text>
              <TextInput
                style={styles.input}
                placeholder={user.bio}
                value={bio}
                onChangeText={(text) => handleInputChange(text, user.bio, 'bio')}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Location</Text>
              <TextInput
                style={styles.input}
                placeholder={user.location}
                value={location}
                onChangeText={(text) => handleInputChange(text, user.location, 'location')}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ display: 'flex', flex: 0, backgroundColor: COLORS.bgColor }}>
        <View style={styles.btnContainer}>
          <View style={[ styles.sendBtn, { backgroundColor: changesOccurred ? COLORS.primaryLight : COLORS.grey }]}>
              <Text style={styles.btnText}>Save Changes</Text>
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
    marginBottom: 100
  },
  sendBtn: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
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
    fontSize: 15,
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
  text: {
    fontFamily: FONTS.Poppins_400,
    fontSize: 14,
  },
  input: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    height: 40,
    color: COLORS.primary,
  },
});

export default EditProfileScreen;