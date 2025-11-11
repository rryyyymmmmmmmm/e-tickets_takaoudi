import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons }from "@expo/vector-icons";

const MOTIFS_DATA = [
  "Demande de Transfert",
  "Réclamation",
  "Prestations familiales",
  "Demande d'imprimés",
  "Attestation de revenu",
  "Attestation de non-perception",
];

const MessagesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMotif, setSelectedMotif] = useState(null);
  const [activeTab, setActiveTab] = useState("enAttente");

  const handleSelect = (motif) => {
    setSelectedMotif(motif);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => handleSelect(item)}
    >
      <Text style={styles.modalItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.topHeader}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#0066FF" />
        <Text style={styles.headerTitle}>Mon ticket</Text>
      </View>

      {/* Tabs */}
      <View style={styles.statusBar}>
        <TouchableOpacity
          style={activeTab === "traites" ? styles.tabActive : styles.tabInactive}
          onPress={() => setActiveTab("traites")}
        >
          <MaterialCommunityIcons
            name="check-box-outline"
            size={20}
            color={activeTab === "traites" ? "#149A00" : "#888"}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === "traites" ? "#149A00" : "#888" },
            ]}
          >
            Traités
          </Text>
        </TouchableOpacity>

        <View style={styles.tabDivider} />

        <TouchableOpacity
          style={
            activeTab === "enAttente" ? styles.tabActive : styles.tabInactive
          }
          onPress={() => setActiveTab("enAttente")}
        >
          <MaterialCommunityIcons
            name="close-box-outline"
            size={20}
            color={activeTab === "enAttente" ? "#E91D23" : "#888"}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === "enAttente" ? "#E91D23" : "#888" },
            ]}
          >
            En attente
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.motifLabel}>
          Motif Actuel:{" "}
          <Text style={styles.motifValue}>
            {selectedMotif || "**Aucun sélectionné**"}
          </Text>
        </Text>

        <TouchableOpacity
          style={styles.openButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.openButtonText}>Ouvrir Modal Motifs</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <SafeAreaView style={{ flex: 1 }}>
              <FlatList
                data={MOTIFS_DATA}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContent}
                showsVerticalScrollIndicator={false}
              />

              <View style={styles.inputBarContainer}>
                <View style={styles.inputBar}>
                  <MaterialCommunityIcons
                    name="chevron-up"
                    size={24}
                    color="#0066FF"
                  />
                  <Text style={styles.inputBarText}>...Motif</Text>
                </View>
                <TouchableOpacity style={styles.sendButton}>
                  <MaterialCommunityIcons name="send" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F2F5F8",
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0066FF",
    marginLeft: 10,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { height: 2, width: 0 },
      },
      android: { elevation: 3 },
    }),
  },
  tabInactive: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  tabActive: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  tabText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "600",
  },
  tabDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#E0E0E0",
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
  },
  motifLabel: {
    fontSize: 18,
    color: "#555",
  },
  motifValue: {
    fontWeight: "bold",
    color: "#333",
  },
  openButton: {
    marginTop: 50,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "#0066FF",
    borderRadius: 25,
    ...Platform.select({
      ios: {
        shadowColor: "#0066FF",
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { height: 2, width: 0 },
      },
      android: { elevation: 5 },
    }),
  },
  openButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    maxHeight: "80%",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  modalItem: {
    paddingVertical: 14,
  },
  modalItemText: {
    fontSize: 18,
    color: "#222",
  },
  inputBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  inputBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5F0FF",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  inputBarText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#0066FF",
    fontWeight: "500",
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#0066FF",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MessagesScreen;
