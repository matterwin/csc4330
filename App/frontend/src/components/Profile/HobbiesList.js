import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';
import HobbiesBox from './HobbiesBox';
import { showUsersHobbies } from '../../api/handleHobby';
import { useSelector } from 'react-redux';
import * as Haptics from 'expo-haptics';

const numColumns = 3;

const HobbiesList = ({ navigation }) => {
  const [hobbies, setHobbies] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.user);

  const fetchData = async () => {
    try {
      setLoadingMore(true);
      const res = await showUsersHobbies(token, user.username);

      if (res.status === 200) {
        const hobbiesData = res.data.hobbies || [];
      
        const transformedHobbies = hobbiesData.map((hobby, index) => ({
          id: hobby,
          hobby,
          url: 'bs',
        }));

        const updatedHobbies = [
          { id: 'Search', hobby: 'Search', url: 'bs' }, 
          { id: 'Edit', hobby: 'Edit', url: 'bs' }, 
          ...transformedHobbies
        ];
        setHobbies(updatedHobbies);
      }

    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const goToSearch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // navigation.navigate("SearchHobbyScreen") direct to search screen
  };

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
            onTouchStart={goToSearch}
        >
            <Icon name="search" size={30} color="white"/>
        </View>
      )
    }
    else if (item.hobby === "Edit") {
      return (
        <View
            style={styles.item}
        >
            <Icon name="trash" size={30} color="white"/>
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
      scrollEnabled={false}
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
