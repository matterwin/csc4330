import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { useSelector } from 'react-redux';
import { ROUTES, COLORS } from '../../constants';
import { FONTS } from "../../constants";
import Icon from 'react-native-vector-icons/Ionicons';
import CurrentEventsList from "../../components/Profile/CurrentEventsList";

const ProfileScreen = ({ navigation }) => {
  const user = useSelector(state => state.user);

  return (
    <>
    <ScrollView>
        <View style={styles.container}>
          <View style={styles.statsContainer}>
            <View style={styles.textCircle}>
              <Icon name="person" size={18} color={COLORS.primary}/>
              <Text>4 Friends</Text>
            </View>
            <View style={styles.textCircle}>
              <Icon name="body" size={18} color={COLORS.primary}/>
              <Text>23 Hobbies</Text>
            </View>
            <View style={styles.textCircle}>
              <Icon name="bonfire" size={18} color={COLORS.primary}/>
              <Text>12 Events</Text>
            </View>
          </View>

          <View>
            <Text style={styles.descText}>some bullshit i tell yeah</Text>
          </View>

          <View>
            <Text style={styles.title}>Location</Text>
            <Text style={styles.descText}>West Virginia, USA</Text>
          </View>

          <View>
            <Text style={styles.title}>Current Events</Text>
            <CurrentEventsList navigation={navigation}/>
          </View>
    
        </View>
        </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgColor,
    // padding: 10,
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 20,
    width: '100%',
  },
  statsContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'flex-start',
    alignItems: 'center'
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
    alignItems: 'center'
  },
  title: {
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: FONTS.Poppins_500,
    fontSize: 15,
  },
  descText: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
  },
  text: {
    fontFamily: FONTS.Poppins_400,
    fontSize: 14,
  },
  joinedDateContainer: {
    marginTop: 'auto',
    marginBottom: 90,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  joinedDate: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap:10
  }
});

export default ProfileScreen;