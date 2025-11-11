import { useEffect } from 'react';
import AppNavigation from './src/Navigation/AppNavigation';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native'

export default function App() {


 const [fontsLoaded] = useFonts({
    outfit: require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });

 /* useEffect(() => {
    if (fontsLoaded) {
      setTimeout(() => setAppIsReady(true), 2000);
    }
  }, [fontsLoaded]);*/




  return (
  
  <SafeAreaProvider style={styles.container}>
  
  <AppNavigation />
</SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:45,
    backgroundColor: '#f9f9f9',
  },});