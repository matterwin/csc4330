import React from 'react';
import { FlatList } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProfileImage from './ProfileImage';

const GroupImage = ({ navigation, groupName }) => {
    const handleProfilePress = () => {
        navigation.navigate('Chat')
      };
    
      return (
        <TouchableOpacity onPress={handleProfilePress}>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <View style={ styles.nameAndGroupImageContainer }>
              <View style={ styles.groupNameContainer }>
                <Text numberOfLines={2}>{groupName}</Text>
              </View>
              <ProfileImage width={70} height={70}/>
            </View>
          </View>
        </TouchableOpacity>
      );
};

const styles = StyleSheet.create({
    nameAndGroupImageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    groupNameContainer: {
      padding: 5,
      backgroundColor :'#fff',
      borderRadius: 10,
      alignItems: 'center',
    }
});

export default GroupImage;
