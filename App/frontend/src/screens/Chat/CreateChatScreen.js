import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { COLORS, FONTS } from '../../constants';
import UploadImage from '../../components/Upload/UploadImage';
import FriendList from '../../components/Friend/FriendList';

const chosenOnes = [];

const CreateChatScreen = () => {
  const [chosenFriends, setChosenFriends] = useState(chosenOnes);
  const [groupName, setGroupName] = useState('');
  const [image, setImage] = useState(null);
  const [clickedCreateChatBtn, setClickedCreateChatBtn] = useState(false);

  const handleInputChange = (text) => {
    if (text.length <= 30) {
        setGroupName(text);
    }
  };

  useEffect(() => {
    if (clickedCreateChatBtn) {
        console.log("Creating chat with:");
        console.log("Group Name:", groupName);
        console.log("Chosen Friends:", chosenFriends);
        console.log("Image:", image);

        if(chosenFriends.length === 1) {
            // do stuff for creating a direct message
            // find out if you already have a direct message with someone and if so just redirect the user to that dm chat
        } else {
            // do stuff for creating a group chat
            // multiple different group chats with the same people are allowed, so do no redirection
        }

        // Add logic for creating the chat (send data to backend, etc.)
        // somehow append this new chat shit to either dmlist or grouplist
        // and obvi make an async call to backend to create the dm or the groupchat

        // Reset the state after creating the chat
        setGroupName('');
        setChosenFriends([]);
        setImage(null);

        console.log("Chat created successfully!");

        setClickedCreateChatBtn(false);
    }

  },[clickedCreateChatBtn])

  return (
    <>
        <View style={styles.container}>
            { chosenFriends.length > 1 &&
                <View style={[styles.createGroupContainer]}>
                    <Animated.View style={{ display: 'flex', width: '30%' }} entering={SlideInUp} exiting={SlideOutUp}>
                        <UploadImage image={image} setImage={setImage}/>
                    </Animated.View>
                    <Animated.View style={{ display: 'flex', width: '70%', marginTop: 20 }} entering={SlideInUp} exiting={SlideOutUp}>
                        <TextInput
                            placeholder='Enter Group Name'
                            style={styles.input}
                            placeholderTextColor={COLORS.black}
                            onChangeText={handleInputChange}
                            value={groupName}
                        />
                        <Text style={styles.namLen}>{groupName.length}/30</Text>
                    </Animated.View>
                </View>
            }
          <FriendList chosenFriends={chosenFriends} setChosenFriends={setChosenFriends} setClickedCreateChatBtn={setClickedCreateChatBtn} />
        </View>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.bgColor,
        padding: 10,
        flex: 1
    },
    messageFriendsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
    },
    everythingBesidesButtonContainer: {
        width: '100%'
    },
    friendsTitle: {
        fontFamily: FONTS.Poppins_600,
        marginBottom: 10,
        fontSize: 15
    },
    title: {
        fontFamily: FONTS.Poppins_700,
        marginBottom: 10,
        fontSize: 16
    },
    bar: {
        width: "100%",
        height: 1,
        borderRadius: 50,
        backgroundColor: COLORS.grey,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    shiftRight: {
        marginRight: 'auto'
    },
    namLen: {
        marginLeft: 'auto',
        fontFamily: FONTS.Poppins_400,
        margin: 7
    },
    createGroupContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginBottom: 20
    },
    input: {
        padding: 10,
        backgroundColor: COLORS.white,
        fontFamily: FONTS.Poppins_400,
        fontSize: 15,
        maxHeight: 100,
        paddingTop: 10,
        borderRadius: 50
    },
});

export default CreateChatScreen;
