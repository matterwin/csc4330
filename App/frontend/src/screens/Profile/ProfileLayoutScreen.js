import React, { useRef, useState } from 'react';
import { Animated, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view'
import UserImageIcon from '../../components/Upload/UserImageIcon';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, FONTS } from "../../constants"; 
import * as Haptics from 'expo-haptics';
import ActualFriendsList from '../../components/Friend/ActualFriendsList';
import YourEventList from '../../components/Profile/YourEventList';
import HobbiesList from '../../components/Profile/HobbiesList';

const HEADER_HEIGHT = 250

const EVENTS = [0, 1, 2, 3, 4];
const HOBBIES = [0, 1, 2, 3, 4];
const FRIENDS = [0, 1, 2, 3, 4];
const identity = (v) => v + ''

const Header = ({ navigation }) => {
  const [isPressed, setIsPressed] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleOnTouchStart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsPressed(true);
    navigation.navigate("EditProfileScreen");
  };

  const handleOnTouchEnd = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsPressed(false);
  };


  return (
    <View style={ styles.header } >
        <UserImageIcon url={user.profilePic} width={130} height={130}/>
        <Text style={styles.realName}>{user.realName}</Text>
        <View
          style={[ styles.editBtn, { backgroundColor: isPressed ? COLORS.darkgrey : COLORS.grey },]}
          onTouchStart={handleOnTouchStart}
          onTouchEnd={handleOnTouchEnd}
        >
            <Text style={styles.btnText}>Edit Profile</Text>
        </View>
    </View>
  );
}

const ProfileLayoutScreen = ({ navigation }) => {
  const renderEventList = () => <YourEventList navigation={navigation} />;
  const renderHobbiesList = () => <HobbiesList navigation={navigation}/>;
  const renderFriendsList = () => <ActualFriendsList navigation={navigation}/>;

  const onRefresh = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const [key, setKey] = useState(0);

  const tabBar = props => (
    <MaterialTabBar
      {...props}
      indicatorStyle={{ backgroundColor: COLORS.primaryLight, height: 5, borderRadius: '50%' }}
      style={{ backgroundColor: COLORS.bgColor }}
      labelStyle={{ fontFamily: FONTS.Poppins_600 }}
    />
  );

  return (
    <Tabs.Container
      renderHeader={() => <Header navigation={navigation} />}
      renderTabBar={tabBar}
    >
      <Tabs.Tab name="Events">
        <Tabs.FlatList
          data={[1]}
          renderItem={renderEventList}
          keyExtractor={(item, index) => index.toString()}
          style={{ backgroundColor: COLORS.bgColor }}
          key={key}
          refreshControl={
            <RefreshControl 
              colors={['black']}
              tintColor={COLORS.primary}
              style={{ backgroundColor: COLORS.bgColor }}
              size={"default"}
              onRefresh={onRefresh} 
            />
          }
        />
      </Tabs.Tab>
      <Tabs.Tab name="Hobbies">
        <Tabs.FlatList
          data={[1]}
          renderItem={renderHobbiesList}
          keyExtractor={(item, index) => index.toString()}
          style={{ backgroundColor: COLORS.bgColor }}
          key={key}
          refreshControl={
            <RefreshControl 
              colors={['black']}
              tintColor={COLORS.primary}
              style={{ backgroundColor: COLORS.bgColor }}
              size={"default"}
              onRefresh={onRefresh} 
            />
          }
        />
      </Tabs.Tab>
      <Tabs.Tab name="Friends" label={"Friends"}>
        <Tabs.FlatList
          data={[1]}
          renderItem={renderFriendsList}
          keyExtractor={(item, index) => index.toString()}
          style={{ backgroundColor: COLORS.bgColor }}
          key={key}
          refreshControl={
            <RefreshControl 
              colors={['black']}
              tintColor={COLORS.primary}
              style={{ backgroundColor: COLORS.bgColor }}
              size={"default"}
              onRefresh={onRefresh} 
            />
          }
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.bgColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  title: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  card: {
    height: 100,
    backgroundColor: '#E6DDC4',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  subtitle: {
    color: '#181D31',
    fontWeight: 'bold',
  },
  realName: {
    fontFamily: FONTS.Poppins_500,
    fontSize: 15,
    marginTop: 20
  },
  editBtn: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    width: '100%',
    marginTop: 10,
  },
  btnText: {
    fontFamily: FONTS.Poppins_600,
    color: '#fff',
    fontSize: 15,
  },
})

export default ProfileLayoutScreen;
