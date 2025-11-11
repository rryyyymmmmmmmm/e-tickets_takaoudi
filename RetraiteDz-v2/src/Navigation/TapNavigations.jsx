import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from '../Screens/Home/HomeScreen';
import MessagesScreen from '../Screens/Messages/MessagesScreen';
import DoleanceScreen from '../Screens/Doleance/DoleanceScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import TicketBookingScreen from '../Screens/TicketBooking/TicketBookingScreen';
import ModalScreen from '../Screens/TicketBooking/ModalScreen';
export default function TapNavigations() {

  const _renderIcon = (routeName, selectedTab) => {
    const color = routeName === selectedTab ? '#0A77AF' : 'gray';

    switch (routeName) {
      case 'home':
        return <Entypo name="home" size={25} color={color} />;
      case 'message':
        return <Feather name="message-square" size={22} color={color} />;
      case 'doleance':
        return <MaterialCommunityIcons name="notebook" size={22} color={color} />;
      case 'profile':
        return <Ionicons name="reorder-three-outline" size={25} color={color} />;
      default:
        return null;
    }
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }) => (
    <TouchableOpacity onPress={() => navigate(routeName)} style={styles.tabbarItem}>
      {_renderIcon(routeName, selectedTab)}
    </TouchableOpacity>
  );

const Stack = createNativeStackNavigator();

  function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="TicketBookingScreen" component={TicketBookingScreen} />
       <Stack.Screen name="ModalScreen" component={ModalScreen} />
    </Stack.Navigator>
  );
}
  return (
  
      <CurvedBottomBarExpo.Navigator
        screenOptions={{ headerShown: false }}
        type="DOWN"
        height={70}
        bgColor="#f1f1f1"
        circleWidth={85}
        initialRouteName="home"
        style={styles.bottomBar}
        shadowStyle={styles.shadow}
        renderCircle={() => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Click Action')}>
              <LottieView
                autoPlay
                style={{ width: 50, height: 50 }}
                source={require('../../assets/lotties/FaceRec.json')}
              />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBarExpo.Screen
          name="home"
          position="LEFT"
          component={HomeScreen}
        />
        <CurvedBottomBarExpo.Screen
          name="message"
          position="LEFT"
          component={MessagesScreen}
        />
        <CurvedBottomBarExpo.Screen
          name="doleance"
          position="RIGHT"
          component={DoleanceScreen}
        />
        <CurvedBottomBarExpo.Screen
          name="profile"
          position="RIGHT"
          component={ProfileScreen}
        />
      </CurvedBottomBarExpo.Navigator>
    
  );
}

const styles = StyleSheet.create({

 

  shadow: {
    shadowColor: '#DDDDDD',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  btnCircleUp: {
    width: 65,
    height: 65,
    marginBottom: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A77AF',
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
