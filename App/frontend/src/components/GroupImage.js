import React from 'react';
import { FlatList } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProfileImage from './ProfileImage';
import { useDrawerStatus } from '@react-navigation/drawer';
import { COLORS, FONTS } from '../constants';
import AddChannel from './AddChannel';

const GroupImage = ({ navigation, groupName, id }) => {
  const isDrawerOpen = useDrawerStatus() === 'open';
  const handleProfilePress = () => {
    navigation.navigate('Chat')
  };

  const isGroupNameVisible = groupName !== null && groupName !== '';
    
  return (
    <TouchableOpacity onPress={handleProfilePress}>
      <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <View style={ styles.nameAndGroupImageContainer }>
          <View style={[styles.groupNameContainer, { opacity: isDrawerOpen && isGroupNameVisible && id !== '999' ? 1 : 0 }]}>
            <Text numberOfLines={2} style={styles.groupNameText}>{groupName}</Text>
          </View>
          <View style={styles.imageAndRectangleContainer}>
            { id !== '999' ? (
              <ProfileImage width={70} height={70}/>
            ) : (
              <AddChannel />
            )}
            <View style={[styles.rectangle, { display: id === '0' ? 'visible' : 'none'}]}></View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nameAndGroupImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  groupNameContainer: {
    padding: 5,
    backgroundColor :'#fff',
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 50,
  },
  groupNameText: {
    fontFamily: FONTS.Poppins_700,
  },
  imageAndRectangleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center' 
  },
  rectangle: {
    marginVertical: 5,
    height: 3,
    width: '50%',
    borderRadius: '100%',
    backgroundColor: COLORS.grey
  },
});

export default GroupImage;
