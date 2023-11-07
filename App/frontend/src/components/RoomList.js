import React from 'react';
import { FlatList } from 'react-native';
import RoomBox from './RoomBox'; // Import your RoomBox component here

const RoomList = () => {
  const data = [
    { id: '1', name: 'Room 1' },
    { id: '2', name: 'Room 2' },
    { id: '3', name: 'Room 3' },
    { id: '4', name: 'Room 4' },
    // Add more data as needed
  ];

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RoomBox name={item.name} />}
    />
  );
};

export default RoomList;
