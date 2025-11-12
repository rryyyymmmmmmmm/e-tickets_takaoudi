// src/Navigation/AppNavigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 💡 Importer DoleanceScreen
import DoleanceScreen from '../Screens/Doleance/DoleanceScreen'; 
import TapNavigations from './TapNavigations';
import TicketBookingScreen from '../Screens/TicketBooking/TicketBookingScreen';
import TicketScreen from '../Screens/TicketBooking/TicketScreen';
import ModalScreen from '../Screens/TicketBooking/ModalScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      
      <Stack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName="Doleance"
      >
        
        <Stack.Screen name="Doleance" component={DoleanceScreen} /> 
        <Stack.Screen name="MainTabs" component={TapNavigations} />
     
        <Stack.Screen name="TicketScreen" component={TicketScreen} />
        <Stack.Screen name="ModalScreen" component={ModalScreen} />
        <Stack.Screen name="TicketBookingScreen" component={TicketBookingScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}