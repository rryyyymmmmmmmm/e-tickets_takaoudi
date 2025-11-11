import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  I18nManager,
  StatusBar,
  Modal,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons, Feather, FontAwesome, AntDesign ,Ionicons,MaterialIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MOTIFS = [
  { id: '1', name: 'Attestation de non perception' },
  { id: '2', name: 'Coordination' },
  { id: '3', name: "Cellule d'écoute" },
  { id: '4', name: 'Affiliation CNAS (secu)' },
  { id: '5', name: 'Correspondant sociaux' },
  { id: '6', name: 'Nouveau dossier droit direct' },
  { id: '7', name: 'Nouveau dossier droit de reversion' },
  { id: '8', name: 'Demande de Revision droit direct' },
  { id: '9', name: 'Demande de Revision droit de revision' },
  { id: '10', name: 'Demande de MAJ (Ch-taux, Famille, Adrs, Relance)' },
  { id: '11', name: 'Demande de Transfert' },
  { id: '12', name: 'Réclamation' },
  { id: '13', name: 'Prestations Familiales' },
  { id: '14', name: "Demande d'imprimés" },
  { id: '15', name: 'Attestation de Revenu' },
];

export default function TicketBookingScreen() {
  const [selectedTab, setSelectedTab] = useState('etat');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMotif, setSelectedMotif] = useState(null);

  const navigation = useNavigation();

  const ticketData = {
    delivered: 39,
    processed: 27,
    waiting: 12,
    distance: 328.6,
    waitTime: 32,
  };

  const handleMotifSelect = (motif) => {
    setSelectedMotif(motif);
  };

  const handleConfirm = () => {
    if (selectedMotif) {
      // You could use navigation or store motif here
      console.log('Motif choisi :', selectedMotif.name);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>Mon ticket</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'etat' && styles.tabActive]}
          onPress={() => setSelectedTab('etat')}
        >
          <Text style={[styles.tabText, selectedTab === 'etat' && styles.tabTextActive]}>
            État du ticket
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'historique' && styles.tabActive]}
          onPress={() => setSelectedTab('historique')}
        >
          <Feather
            name="lock"
            size={16}
            color={selectedTab === 'historique' ? '#fff' : '#777'}
            style={{ marginRight: 5 }}
          />
          <Text style={[styles.tabText, selectedTab === 'historique' && styles.tabTextActive]}>
            Historique
          </Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'etat' ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Tickets délivrés */}
          <View style={styles.mainCard}>
            <View style={styles.iconCircleBlue}>
              <MaterialCommunityIcons name="printer" size={45} color="#fff" />
            </View>
            <View>
              <Text style={styles.cardTitle}>Tickets délivrés</Text>
              <Text style={styles.cardValue}>
                {ticketData.delivered}
                <Text style={styles.cardUnit}> Tickets</Text>
              </Text>
            </View>
          </View>

          {/* Traités / En attente */}
          <View style={styles.row}>
            <View style={styles.smallCard}>
              <View style={styles.cardheader}>
                <View style={styles.iconCircleGreen}>
                  <AntDesign name="check" size={25} color="#fff" />
                </View>
                <Text style={styles.cardTitle}>Traités</Text>
              </View>
              <Text style={styles.cardValue}>{ticketData.processed}</Text>
              <Text style={styles.cardUnit}>Tickets </Text>
            </View>

            <View style={styles.smallCard}>
              <View style={styles.cardheader}>
                <View style={styles.iconCircleRed}>
                  <MaterialCommunityIcons name="timer-sand" size={25} color="#fff" />
                </View>
                <Text style={styles.cardTitle}>En attente</Text>
              </View>
              <Text style={styles.cardValue}>{ticketData.waiting}</Text>
              <Text style={styles.cardUnit}>Tickets </Text>
            </View>
          </View>

          {/* Distance */}
          <View style={styles.mainCard}>
            <View style={styles.iconCircleLocation}>
              <MaterialCommunityIcons name="map-marker" size={30} color="#fff" />
            </View>
            <View>
              <Text style={styles.cardTitle}>Distance</Text>
              <Text style={styles.cardValue}>
                {ticketData.distance}
                <Text style={styles.cardUnit}> km</Text>
              </Text>
            </View>
          </View>

          {/* Temps d’attente probable */}
          <View style={styles.mainCard}>
            <View style={styles.iconCircleClock}>
              <MaterialCommunityIcons name="clock-outline" size={30} color="#fff" />
            </View>
            <View>
              <Text style={styles.cardTitle}>Temps d'attente probable</Text>
              <Text style={styles.cardValue}>
                {ticketData.waitTime}
                <Text style={styles.cardUnit}> min</Text>
              </Text>
            </View>
          </View>

          {/* Prendre button */}
          <TouchableOpacity
            style={styles.requestButton}
            onPress={() => setModalVisible(true)}
          >
            <FontAwesome name="ticket" size={24} color="#fff" />
            <Text style={styles.requestButtonText}>Prendre</Text>
          </TouchableOpacity>

          {/* Bottom Sheet Modal */}
          <Modal
            visible={modalVisible}
            transparent
            statusBarTranslucent={true} 
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <View style={{flexDirection:'row', alignItems:'stretch'}}>                 
                 <View style={styles.pdfIconBackground}>
                <MaterialIcons 
                  name="picture-as-pdf" 
                  size={24} // Taille ajustée pour tenir dans le cercle
                  color="white" // Couleur blanche pour l'icône
                /> 
              </View>
                 <Text style={styles.modalTitle}>Mon ticket</Text>
</View>

                <FlatList
                  data={MOTIFS}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.itemButton,
                        selectedMotif?.id === item.id && styles.itemSelected,
                      ]}
                      onPress={() => handleMotifSelect(item)}
                    >
                      <Text
                        style={[
                          styles.itemText,
                          selectedMotif?.id === item.id && styles.itemTextSelected,
                        ]}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                />

                <TouchableOpacity
                  style={[
                    styles.okButton,
                    !selectedMotif && { backgroundColor: '#ccc' },
                  ]}
                  onPress={handleConfirm}
                  disabled={!selectedMotif}
                >
                  <Text style={styles.okButtonText}><Ionicons name="send" size={20} color="white" /></Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      ) : (
        <View style={styles.historyContainer}>
          <Feather name="lock" size={50} color="#777" />
          <Text style={styles.historyTitle}>Historique vide</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fc' },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 3,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 40, height: 40, marginRight: 10 },
  headerTitle: { fontSize: 20, fontFamily: 'outfit-medium', color: '#0070c0' },
  tabBar: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  tabButton: {
    backgroundColor: '#eef3f8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  tabActive: { backgroundColor: '#0070c0' },
  tabText: { fontSize: 15, color: '#555', fontWeight: '600', fontFamily: 'outfit' },
  tabTextActive: { color: '#fff', fontFamily: 'outfit' },
  scrollContent: { paddingHorizontal: 15, paddingTop: 10, paddingBottom: 70 },
  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    paddingVertical: 30,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  smallCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    width: '48%',
    alignItems: 'center',
    elevation: 3,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  cardheader: { flexDirection: 'row', marginTop: 5, marginBottom: 20 },
  cardTitle: { fontSize: 17, color: '#555', fontFamily: 'outfit-medium' },
  cardValue: { fontSize: 20, fontFamily: 'outfit', color: '#222' },
  cardUnit: { fontSize: 14, fontFamily: 'outfit', color: '#9aa1a9' },
  iconCircleBlue: { backgroundColor: '#0070c0', borderRadius: 50, padding: 15, marginRight: 50 },
  iconCircleGreen: { backgroundColor: '#2ecc71', borderRadius: 40, padding: 7, marginRight: 10 },
  iconCircleRed: { backgroundColor: '#e74c3c', borderRadius: 40, padding: 7, marginRight: 10 },
  iconCircleLocation: { backgroundColor: '#e74c3c', borderRadius: 40, padding: 10, marginRight: 15 },
  iconCircleClock: { backgroundColor: '#2ecc71', borderRadius: 40, padding: 10, marginRight: 15 },
  requestButton: {
    backgroundColor: '#005691',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignSelf: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  requestButtonText: { fontFamily: 'outfit', color: '#fff', fontSize: 17, marginHorizontal: 10 },
  historyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  historyTitle: { fontFamily: 'outfit', marginTop: 20, fontSize: 16, color: '#777' },

  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
 modalContainer: {
  backgroundColor: '#fff',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 20,
  maxHeight: '60%',
  marginBottom: 0, // add this
  paddingBottom: 0, // ensure it touches button
},

  modalTitle: {
    fontSize: 18,
    fontFamily: 'outfit-medium',
    color: '#005691',
    marginBottom: 15,
  },
  itemButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderRadius: 50, padding: 15,
    borderBottomColor: '#eee',
  },
  itemText: { fontSize: 16, color: '#333', fontFamily: 'outfit' },
  itemSelected: { backgroundColor: '#e0f0ff' },
  itemTextSelected: { color: '#005691', fontWeight: '600' },

  okButton: {
   backgroundColor: '#005691',
  width: 55,              // fixed size
  height: 55,
  borderRadius: 55 / 2,   // makes it perfectly circular
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection:'row-reverse',
  alignSelf:'flex-end',
  margintop: 15,
  marginBottom: 15,
  },
  okButtonText: { color: '#fff', fontSize: 16, fontFamily: 'outfit-medium' },

  pdfIconBackground: {
    width: 36, // Taille du cercle
    height: 36, // Taille du cercle
    borderRadius: 18, // Rend le fond rond
    backgroundColor: '#005691', // Couleur bleue
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, // Marge à droite pour séparer du texte
  },
});
