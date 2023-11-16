import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import GroupImage from './GroupImage';
import { useDrawerStatus } from '@react-navigation/drawer';

const GroupList = ({ navigation }) => {
  const isDrawerOpen = useDrawerStatus() === 'open';

  const data = [
    { id: '0', groupName: 'Direct Messages', url: null , members: null, owner: null },
    { id: '1', groupName: 'LSU', url: 'bs', members: ["Joe", "Shmoe"], owner: "Billy" },
    { id: '2', groupName: 'The Lord of the Rings', url: 'bs', members: ["Joe", "Shmoe"], owner: "Billy" },
    // { id: '999', groupName: "hi", url: null , members: null, owner: null },
  ];

  const renderItem = ({ item }) => (
    <GroupImage navigation={navigation} groupName={item.groupName} id={item.id}/>
  )

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={[styles.flatList, { overflow: isDrawerOpen ? 'visible' : 'hidden' }]}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: COLORS.bgColor,
    paddingTop: 40,
    paddingRight: 15
  },
});

export default GroupList;
