import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';
import HobbiesBox from './HobbiesBox';

const initialHobbies = [
  { id: '1', hobby: 'Search', url: 'bs' },
  { id: '2', hobby: 'Basketball', url: 'bs' },
  { id: '3', hobby: 'Basketball', url: 'bs' },
  { id: '4', hobby: 'Fishing', url: 'bs' },
  { id: '5', hobby: 'Basketball', url: 'bs' },
  { id: '6', hobby: 'Basketball', url: 'bs' },
  { id: '7', hobby: 'Fishing', url: 'bs' },
  { id: '8', hobby: 'Basketball', url: 'bs' },
  { id: '9', hobby: 'Basketball', url: 'bs' },
  { id: '10', hobby: 'Basketball', url: 'bs' },
  { id: '11', hobby: 'Basketball', url: 'bs' },
];

const numColumns = 3;

const HobbiesList = () => {
  const [hobbies, setHobbies] = useState(initialHobbies);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // You can perform your data fetching or refreshing logic here
    // For example, fetch new data from an API

    // Simulating a delay for demonstration purposes
    setTimeout(() => {
      setHobbies(initialHobbies);
      setRefreshing(false);
    }, 1000);
  }, []);

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({
        id: `blank-${numberOfElementsLastRow}`,
        hobby: '',
        url: '',
        empty: true,
      });
      numberOfElementsLastRow++;
    }

    return data;
  };

  const renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    else if (item.hobby === "Search") {
      return (
        <View
            style={styles.item}
        >
            <Icon name="search" size={30} color="white"/>
        </View>
      )
    }
    else if (item.hobby === "Add") {
      return (
        <View
            style={styles.item}
        >
            <Icon name="add" size={40} color="white"/>
        </View>
      )
    }
    return (
      <HobbiesBox 
        hobby={item.hobby}
        url={item.url}
      />
    );
  };

  return (
    <FlatList
      data={formatData(hobbies, numColumns)}
      style={styles.container}
      renderItem={renderItem}
      numColumns={numColumns}
      refreshControl={
        <RefreshControl 
          colors={['black']}
          tintColor={COLORS.green}
          refreshing={refreshing}
          style={{ backgroundColor: COLORS.primaryLight }}
          size={"default"}
          onRefresh={onRefresh} 
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});

export default HobbiesList;
