import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, SafeAreaView, ActivityIndicator } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { COLORS, FONTS } from '../../constants';
import { toggleSheet } from '../../redux/sheet/sheetActions'; 
import { useDispatch, useSelector } from 'react-redux';
import UserImageIcon from '../Upload/UserImageIcon';
import { showParticipants } from '../../api/handleEvent';
import Icon from 'react-native-vector-icons/Ionicons';

const numColumns = 3;

const ParticipantsSheet = () => {
  const [people, setPeople] = useState([]);
  const [owner, setOwner] = useState([]);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const eventId = useSelector(state => state.eventInfo.eventId);

  const fetchData = async () => {
    try {
      const res = await showParticipants(token, eventId);

      if (res.status === 200) {
        const owner = res.data.event.owner;
        setOwner(owner);
        const joinedUsers = res.data.event.joinedUsers;
        const allPeople = [owner, ...joinedUsers];
        setPeople(allPeople);
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const closeSheet = () => {
    dispatch(toggleSheet('participantsSheet'));
  };

  const snapPoints = useMemo(() => ['60%', '90%'], []);

  const goToUserProfile = (username) => {
    // pull up users profile
  }

  const renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    
    return (
      <View style={styles.item} onTouchStart={() => goToUserProfile(item.username)}>
          <UserImageIcon url={item.profilePic} height={90} width ={90} />
          <Text style={{ fontSize: 15, paddingTop: 5 }}>{item.username}</Text>
          {owner.username === item.username && (
            <View style={styles.overlay}>
              <View style={ styles.chosenVisual }>
                <View >
                    <Icon name="clipboard" size={22} color={ COLORS.white } style={{ marginLeft: 2 }}/>
                </View>
              </View>
            </View>
          )}
      </View>
    );
  };

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({
        id: `blank-${numberOfElementsLastRow}`,
        username: '',
        profilePic: '',
        empty: true,
      });
      numberOfElementsLastRow++;
    }

    return data;
  };

  return (
    <View style={[styles.sheet]}>
      <BottomSheet
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={closeSheet}
        backgroundStyle={{ backgroundColor: COLORS.white, width: '100%'}}
      >
        <View style={styles.contentContainer}>
          <View style={ styles.header }>
            <View style={styles.headerContent}>
              <Text style={ styles.sheetTitle }>{people.length}</Text>
              <Text style={ styles.sheetTitle }>Participants</Text>
            </View>
          </View>
          {loading ? (
            <ActivityIndicator style={styles.loadingIndicator} size="large" color={COLORS.primary} />
          ) : (
            <FlatList
              data={formatData(people, numColumns)}
              renderItem={renderItem}
              numColumns={numColumns}
              keyExtractor={(item) => item._id}
              style={styles.container}
            />
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  sheet: {
    width: "100%",
    height:"100%",
    zIndex: 1,
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  container: {
    flex: 1,
    width: '100%'
  },
  chosenVisual: {
    borderRadius: 50,
    borderWidth: 2,
    backgroundColor: COLORS.primary,
    borderColor: 'transparent'
},
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '33.3%',
    height: Dimensions.get('window').width / numColumns
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginLeft: 65,
    overflow: 'visible'
  },
  sheetTitle: {
    fontFamily: FONTS.Poppins_600,
    fontSize: 16
  },
  loadingIndicator: {
    marginTop: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  header: {
    borderBottomWidth: 1,
    width: '100%',
    borderColor: COLORS.greySuperLight,
    padding: 0,
    margin: 0,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3
  },
});

export default ParticipantsSheet;
