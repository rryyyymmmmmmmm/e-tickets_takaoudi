import React, { useState } from 'react';
import { 
  Dimensions, 
  Pressable, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import{Image} from 'expo-image'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');

const menuItems = [
  { title: 'Attestation de revenu', icon: <MaterialIcons name="picture-as-pdf" size={26} color="#facd7a" />, color: '#facd7a' },
  { title: 'Suivre mon dossier', icon: <MaterialCommunityIcons name="timeline-check" size={26} color="#00A36C" />, color: '#00A36C' },
  { title: "Mon ticket", icon: <Fontisto name="ticket" size={26} color="#0B6EC6" />, color: "#0B6EC6" },
  { title: 'Aide à domicile', icon: <FontAwesome6 name="handshake-angle" size={26} color="#00A36C" />, color: '#00A36C' },
  { title: 'Messages SMS', icon: <MaterialCommunityIcons name="message" size={26} color="#E53935" />, color: '#E53935' },
  { title: 'Doléances', icon: <MaterialCommunityIcons name="notebook" size={26} color="#E53935" />, color: '#E53935' },
  { title: 'Justificatifs', icon: <MaterialIcons name="document-scanner" size={26} color="#facd7a" />, color: '#facd7a' },
  { title: 'Carte biométrique', icon: <FontAwesome name="credit-card" size={26} color="#0B6EC6" />, color: '#0B6EC6' },
];

export default function HomeScreen() {
  console.log("➡️ HomeScreen mounted");

  const [selectedCard, setSelectedCard] = useState(null);
const navigation = useNavigation(); 
  const handlePress = (title) => {
    setSelectedCard(title);

    if (title === "Mon ticket") {
       console.log("➡️   TicketBookingScreen mounted 2");
  navigation.navigate('TicketBookingScreen');
}

  };
  

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* 🟦 Background Image */}
        <View style={styles.backgroundContainer}>
          <Image
            source={require('../../../assets/images/bg.png')}
            style={styles.headerBackground}
           
          />
        </View>

        {/* 🟨 Fixed Header Content */}
        <View style={styles.headerContent}>
          <Image
            source={require('../../../assets/images/logo2.png')}
            style={styles.logo2}
             contentFit="cover"
            
          />
          <View style={styles.textRow}>
            <View style={styles.textContainer}>
              <Text style={styles.welcomeText}>Bienvenue </Text>
              <Text style={styles.userName}>
                <MaterialCommunityIcons
                  name="alert-circle"
                  size={24}
                  color="#0B6EC6"
                  style={{ transform: [{ rotate: '180deg' }] }}
                />{' '}
                Hanaa
              </Text>
            </View>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
             contentFit="cover"
            />
          </View>
        </View>

        {/* 🟩 Cards Section */}
      <View style={styles.menuContainer}>
  {menuItems.map((item, i) => (
    <Pressable
      key={i}
      onPress={() => handlePress(item.title)}
      style={({ pressed }) => [
        styles.card,
        pressed && { backgroundColor: "#0B6EC6" },
      ]}
    >
      {({ pressed }) => (
        <>
          <View style={{ marginBottom: 8 }}>
            {item.icon}
          </View>
          <Text
            style={[
              styles.title,
              { color: pressed ? '#fff' : item.color, textAlign: 'center' },
            ]}
          >
            {item.title}
          </Text>
        </>
      )}
    </Pressable>
  ))}
</View>


        {/* Add extra spacing to show background when scrolling */}
        <View style={{ height: 180 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  backgroundContainer: {
    width: '100%',
    height: 300,
    alignSelf: 'center',
  },
  headerBackground: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 6,
  },
  headerContent: {
    marginTop: -330,
    width: '100%',
    paddingVertical:40,
    alignItems: 'center',
  },
  logo2: {
    width: 170,
    height: 80,
    marginTop: 40,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    width: '100%',
  },
  textContainer: {
    alignItems: 'flex-start',
  },
  welcomeText: {
    color: '#000',
    fontSize: 18,
    fontFamily:'outfit',
  },
  userName: {
    color: '#0B6EC6',
    fontSize: 22,
    fontFamily:'outfit',
  },
  logo: {
    width: '100',
    height: '100',
  },
  scrollContainer: {},
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: '47%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0B6EC6',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily:'outfit',
  },
});
