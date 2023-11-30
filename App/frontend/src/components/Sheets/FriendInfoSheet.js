import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, SafeAreaView, ActivityIndicator } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { COLORS, FONTS } from '../../constants';
import { toggleSheet } from '../../redux/sheet/sheetActions'; 
import { useDispatch, useSelector } from 'react-redux';
import { setInfo } from '../../redux/info/infoActions';
import { removeFriend } from '../../api/handleFriend';
import { setFetchFlag } from '../../redux/fetch/fetchActions';
import * as Haptics from 'expo-haptics';

const numColumns = 3;

const FriendInfoSheet = () => {
  const id = useSelector(state => state.info.id);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState(false);

  const handleOnTouchEnd = () => {
    setLoading(true);
    delFriend(id);
  }

  const handleOnTouchStart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  const delFriend = async (username) => {
    try {
      const res = await removeFriend(token, username);

      if (res.status === 200) {
        dispatch(setInfo(null));
        dispatch(toggleSheet('friendInfoSheet'));
        dispatch(setFetchFlag('Friends'));
        dispatch(setFetchFlag('FriendsList'));
      }
    } finally {
      setLoading(false);
    }
  };

  const closeSheet = () => {
    dispatch(toggleSheet('friendInfoSheet'));
  };

  const snapPoints = useMemo(() => ['30%', '90%'], []);

  const goToUserProfile = (username) => {
    // pull up users profile
  }

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
              <Text style={ styles.sheetTitle }>{id}</Text>
            </View>
          </View>
          <View style={{ width: '100%', margin: 10, paddingHorizontal: 10 }}>
            <View 
              style={[ styles.sendBtn, { backgroundColor: COLORS.danger },]} 
                onTouchStart={handleOnTouchStart}
                onTouchEnd={handleOnTouchEnd}
            >
              <Text style={styles.btnText}>Remove Friend</Text>
            </View>
            {loading && 
              <View style={{ display: 'flex', marginTop: 'auto', marginBottom: 30 }}>
                <ActivityIndicator size="large" color={COLORS.black}/>
              </View> 
            }
          </View>
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
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '33.3%',
    height: Dimensions.get('window').width / numColumns
  },
  sheetTitle: {
    fontFamily: FONTS.Poppins_600,
    fontSize: 16
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 85,
    marginRight: 70,
    overflow: 'visible'
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
  sendBtn: {
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    width: '100%',
  },
  btnText: {
    fontFamily: FONTS.Poppins_600,
    color: '#fff',
    fontSize: 15,
  },
});

export default FriendInfoSheet;
