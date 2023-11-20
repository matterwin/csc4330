import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView, TextInput, KeyboardAvoidingView, Keyboard } from "react-native";
import { useSelector } from 'react-redux';
import { ROUTES, COLORS } from '../constants';
import { FONTS } from "../constants";
import * as Haptics from 'expo-haptics';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateEventOptionalScreen = ({ navigation, route }) => {
    const {
        title,
        place,
        iImage,
        privacyType
    } = route.params;

    const [desc, setDesc] = useState('');
    const [location, setLocation] = useState('');
    const [dateAndTime, setDateAndTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const currentDate = new Date();
    const dateString = currentDate.toISOString().split('T')[0];

    const handleInputChange = (text, field) => {
        switch (field) {
            case 'desc':
                setDesc(text);
                break;
            case 'location':
                setLocation(text);
                break;
            case 'privacy':
                setDateAndTime(text);
                break;
            default:
            break;
        }
    }

    const handleNextPage = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        // api call to submit event
    }

    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', paddingBottom: 500}}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.title}>Description</Text>
                            <TextInput
                                style={[styles.input, { height: 100 }]}
                                value={desc}
                                onChangeText={(text) => handleInputChange(text, 'desc')}
                                textAlignVertical="top"
                                multiline
                                numberOfLines={5}
                                onKeyPress={(event) => {
                                    if (event.nativeEvent.key === 'Enter') {
                                      Keyboard.dismiss();
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.title}>Address</Text>
                            <TextInput
                                style={styles.input}
                                value={location}
                                onChangeText={(text) => handleInputChange(text, 'location')}
                            />
                        </View>
                        <View style={styles.timeContainer}>
                                <Text style={[styles.title, { paddingRight: 0 }]}>Time</Text>
                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    value={location}
                                    onChangeText={(text) => handleInputChange(text, 'location')}
                                />
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 5, marginBottom: 10 }}>
                                <Text style={styles.title}>Date</Text>
                                <Text style={styles.time}>{selectedDate}</Text>
                            </View>
                            <Calendar
                                initialDate={dateString}
                                minDate={dateString}
                                onDayPress={(day) => {
                                    setSelectedDate(day.dateString);
                                }}
                                markedDates={{
                                    [selectedDate]: { selected: true, marked: true, selectedColor: COLORS.primary },
                                }}
                                disableAllTouchEventsForDisabledDays
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ display: 'flex', flex: 0, backgroundColor: COLORS.bgColor, alignItems: 'center' }}>
                <Text style={[styles.title, { fontSize: 14, fontFamily: FONTS.Poppins_400, marginBottom: 5 }]}>Everything is optional here</Text>
                <View style={styles.btnContainer} onTouchStart={handleNextPage}>
                    <View style={[ styles.sendBtn, { backgroundColor: COLORS.primaryLight }]}>
                        <Text style={styles.btnText}>Post Event</Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgColor,
    flex: 1,
  },
  infoContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.greySuperLight,
    paddingVertical: 15,
    paddingBottom: 0,
  },
  timeContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.greySuperLight,
    paddingVertical: 5,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnContainer: {
    width: "100%",
    paddingHorizontal: 10,
    position: 'relative',
    bottom: 0,
    paddingBottom: 100,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  sendBtn: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  textCircle: {
    padding: 10,
    borderRadius: "100%",
    borderWidth: 1,
    borderColor: COLORS.greySuperLight,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 10
  },
  btnText: {
      fontFamily: FONTS.Poppins_600,
      color: '#fff',
      fontSize: 15,
  },
  title: {
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: FONTS.Poppins_500,
    fontSize: 16,
  },
  descText: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
  },
  profText: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 20,
  },
  profSubText: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 13,
    fontWeight: 400,
    marginBottom: 20,
  },
  text: {
    fontFamily: FONTS.Poppins_400,
    fontSize: 14,
  },
  input: {
    height: 40,
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 500,
    paddingLeft: 10,
    paddingRight: 10,
  },
  time: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 500,
  },
  nameAndPicContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginBottom: 5
  },
  username: {
      fontSize: 14,
      fontFamily: FONTS.Poppins_500
  },
});

export default CreateEventOptionalScreen;