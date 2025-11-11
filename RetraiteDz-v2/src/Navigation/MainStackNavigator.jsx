// src/navigation/MainStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TapNavigations from './TapNavigations';



const Stack = createNativeStackNavigator();
//      <Stack.Screen name="MainTabs" component={TapNavigations} />

export default function MainStackNavigator() {
  console.log("➡️ MainStackNavigator mounted");
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    </Stack.Navigator>
  );
}
