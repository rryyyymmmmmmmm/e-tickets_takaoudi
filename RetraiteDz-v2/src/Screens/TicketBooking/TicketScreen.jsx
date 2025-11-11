import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = Math.min(300, width * 0.92);
const CIRCLE_SIZE = Math.round(CARD_WIDTH * 0.27); // responsive circle size

export default function TicketScreen() {
  // exemple de données
  const agence = "LAGHOUAT";
  const date = "06/11/2025";
  const heure = "09:07:20";

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Image
             source={require('../../../assets/images/logo.png')}    
                       style={styles.headerLogo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Mon ticket</Text>
      </View>

      {/* Ticket card */}
      <View style={[styles.card, { width: CARD_WIDTH }]}>
        {/* Top blue block */}
        <View style={styles.topBlue}>
          {/* filigrane logo à droite */}
          <Image
             source={require('../../../assets/images/logo.png')}    
                         style={styles.filigrane}
            resizeMode="contain"
          />

          {/* Info box inside blue */}
          <View style={styles.topInfo}>
            <Text style={styles.topLabel}>Agence : <Text style={styles.topValue}>{agence}</Text></Text>
            <Text style={styles.topLabel}>Date : <Text style={styles.topValue}>{date}</Text></Text>
            <View style={styles.hourRow}>
              <Text style={[styles.topLabel, ]}>Heure :    <Text style={[styles.topValue, styles.hourValue]}>{heure}</Text></Text>
             
            </View>
          </View>
        </View>

        {/* Notches (demi-circles) */}
        <View style={styles.notches}>
          <View style={styles.notchLeft} />
          <View style={styles.notchRight} />
        </View>

        {/* Bottom white area */}
        <View style={styles.bottomWhite}>
          {/* Optionally show agence/date again or other content */}

          {/* Title / ticket number / distance */}
          <View style={styles.rowBetween}>
            <View style={{ flex: 1 }}>
              <View style={styles.titleRow}>
                <MaterialCommunityIcons name="ticket-percent" size={18} />
                <Text style={styles.sectionTitle}>  Votre tour</Text>
              </View>
              <Text style={styles.ticketNumber}>040</Text>
            </View>

            <View style={styles.locationBlock}>
              <MaterialCommunityIcons name="map-marker" size={40} color="#EF6C63" />
              <Text style={styles.distance}>328.6 KM</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* First progress circle (File d'attente) */}
          <View style={styles.progressBlock}>
            <ProgressCircle
              size={CIRCLE_SIZE}
              strokeWidth={12}
              progress={0.35}
              color="#F55C47"
              text="013"
            />
            <Text style={styles.progressLabel}>
              <MaterialCommunityIcons name="account-group" size={14} color="#F55C47" />{" "}
              File d'attente
            </Text>
          </View>

          {/* small divider */}
          <View style={[styles.divider, { marginVertical: 18 }]} />

          {/* Second progress circle (Temps d'attente) */}
          <View style={styles.progressBlock}>
            <ProgressCircle
              size={CIRCLE_SIZE}
              strokeWidth={12}
              progress={0.7}
              color="#5E60CE"
              text="00:31"
            />
            <Text style={styles.progressLabel}>
                <MaterialCommunityIcons name="timer-sand" size={25} color="#5E60CE" />
             
              Temps d'attente
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

/* Progress circle component */
function ProgressCircle({
  size = 200,
  strokeWidth = 10,
  progress = 0.5,
  color = "#F55C47",
  text = "00",
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size}>
        {/* background circle */}
        <Circle
          stroke="#D7DFE3"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* progress arc */}
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>

      {/* center text */}
      <View style={[styles.circleTextContainer, { width: size, height: size }]}>
        <Text style={[styles.circleText]}>{text}</Text>
      </View>
    </View>
  );
}

/* Styles */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 50 : 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
     paddingVertical: 15,
     marginBottom:20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 3,
  },
  headerLogo: {
    width: 42,
    height: 42,
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: "left",
    fontSize: 22,
    color: "#0070c0",
    fontFamily:"outfit-medium"
  },

  card: {
    borderRadius: 18,
    overflow: "visible",
    // shadow
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 3 },
    }),
  },

  topBlue: {
    backgroundColor: "#74CCF0", // bleu CNR amélioré
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
    position: "relative",
    overflow: "hidden", 
  },
  filigrane: {
    position: "absolute",
    right: -60,
    top: -50,
    width: "82%",
    height: "250%",
    opacity: 0.5,
  },
  topInfo: {
    zIndex: 2,
  },
  topLabel: {
    color: "#000",
    fontSize: 17,
    marginBottom: 10,
    fontFamily:"outfit-medium"
  },
  topValue: {
    color: "#000",
    fontFamily:"outfit-medium"
  },
  hourRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  hourValue: {
    fontSize: 17,
    fontFamily:"outfit-medium",
  },

  notches: {
    height: 0,
    // ensure notches overlay between top and bottom
    position: "relative",
    backgroundColor: "transparent",
  },
  notchLeft: {
    position: "absolute",
    left: -14,
    top: -14,
    width: 28,
    height: 28,
    borderRadius: 28,
    backgroundColor: "#fff",
    zIndex: 5,
    borderWidth: 2, // <--- **AJOUTEZ UNE BORDURE** de la même couleur que le fond pour cacher la petite ligne grise
    borderColor: "#fff",
  },
  notchRight: {
    position: "absolute",
    right: -14,
    top: -14,
    width: 28,
    height: 28,
    borderRadius: 28,
    backgroundColor: "#fff",
    zIndex: 5,
    borderWidth: 2, // <--- **AJOUTEZ UNE BORDURE** de la même couleur que le fond
    borderColor: "#fff",
  },

  bottomWhite: {
    backgroundColor: "#f0f0f0ff",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 16,
    color: "#333",
    fontFamily:"outfit"
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ticketNumber: {
    fontSize: 54,
    color: "#2E2B39",
    fontFamily:"outfit-medium",
    marginTop: 6,
  },

  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationBlock: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  distance: {
    marginTop: 6,
    fontFamily:"outfit-medium",
    color: "#222",
  },

  divider: {
    height: 1,
    backgroundColor: "#d3d3d8ff",
    marginTop: 10,
    marginBottom: 10,
  },

  progressBlock: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressLabel: {
    marginTop: 12,
    fontSize: 15,
    color: "#333",
    fontFamily:"outfit-medium",
  },

  circleTextContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  circleText: {
    fontSize: 18,
    fontFamily:"outfit-medium",
    color: "#2E2B39",
  },
});
