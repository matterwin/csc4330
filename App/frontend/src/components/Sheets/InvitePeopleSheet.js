import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { COLORS, FONTS } from '../../constants';
import { toggleSheet } from '../../redux/sheet/sheetActions'; 
import { useDispatch, useSelector } from 'react-redux';
import InviteFriendsList from '../Friend/InviteFriendsList';

const InvitePeopleSheet = () => {
    const invitedUsers = useSelector((state) => state.invites.invitedUsers);
    const [chosenFriends, setChosenFriends] = useState(invitedUsers);
    const dispatch = useDispatch()

    const closeSheet = () => {
        dispatch(toggleSheet('invitePeopleSheet'));
    };

    const snapPoints = useMemo(() => ['60%', '90%'], []);

    useEffect(() => {
        console.log(chosenFriends);
    },[chosenFriends])

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
                        <Text style={ styles.sheetTitle }>{chosenFriends.length}</Text>
                        <Text style={ styles.sheetTitle }>Invites</Text>
                    </View>
                </View>
                <InviteFriendsList chosenFriends={chosenFriends} setChosenFriends={setChosenFriends} />
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

export default InvitePeopleSheet;
