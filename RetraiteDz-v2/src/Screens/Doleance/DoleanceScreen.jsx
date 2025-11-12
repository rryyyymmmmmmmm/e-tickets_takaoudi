import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// ⚠️ Assurez-vous que le chemin vers votre fichier JSON est correct
import users from "../../../assets/Data/users.json"; 

// ✅ Schéma de Validation (Aucun changement nécessaire ici)
const loginValidationSchema = yup.object().shape({
  numPension: yup
    .string()
    .length(9, "Numéro de pension doit contenir exactement 9 caractères")
    .matches(
      /^[A-Z0-9]+$/,
      "Numéro doit contenir des lettres majuscules et/ou des chiffres seulement"
    )
    .required("Numéro de pension obligatoire"),
  password: yup
    .string()
    .min(6, "Mot de passe doit être ≥ 6 caractères")
    .required("Mot de passe obligatoire"),
});

export default function DoleanceScreen() {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const formik = useFormik({
    initialValues: { numPension: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      // 1. Chercher l'utilisateur
      const userFound = users.find(
        (u) =>
          u.pension_number === values.numPension &&
          u.password === values.password
      );

      // 2. Vérification des identifiants
      if (!userFound) {
        Alert.alert("Erreur", "Numéro de pension ou mot de passe incorrect");
        return;
      }

      // 3. Connexion réussie : mettre à jour et sauvegarder l'utilisateur
      const userData = { ...userFound, has_logged_in: true };
      await AsyncStorage.setItem("currentUser", JSON.stringify(userData));

      // 4. Afficher l'alerte et naviguer
      if (userFound.has_logged_in) {
        Alert.alert(
          "Bienvenue à nouveau 👋",
          `Heureux de vous revoir ${userFound.first_name}!`,
          [
            {
              text: "OK",
              // ✅ Navigation vers les onglets principaux (MainTabs contient Home)
              onPress: () => navigation.navigate("MainTabs"),
            },
          ]
        );
      } else {
        Alert.alert(
          "Succès ✅",
          `Bienvenue ${userFound.first_name} ${userFound.last_name}`,
          [
            {
              text: "OK",
              // ✅ Navigation vers les onglets principaux (MainTabs contient Home)
              onPress: () => navigation.navigate("MainTabs"), 
            },
          ]
        );
      }
    },
  });

  return (
    <LinearGradient
      colors={["#DFF3FF", "#BCE6FF", "#A8DFFF"]}
      style={styles.container}
    >
      <Image
        source={require("../../../assets/images/logo2DD.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Pension number input */}
      {formik.touched.numPension && formik.errors.numPension && (
        <Text style={styles.errorText}>{formik.errors.numPension}</Text>
      )}
      <View style={styles.inputContainer}>
        <Ionicons name="person" size={22} color="#0B6EC6" />
        <TextInput
          style={styles.input}
          placeholder="Numéro de pension"
          placeholderTextColor="#777"
          keyboardType="default"
          autoCapitalize="characters"
          value={formik.values.numPension}
          onChangeText={(text) =>
            formik.setFieldValue("numPension", text.toUpperCase())
          }
          onBlur={formik.handleBlur("numPension")}
        />
      </View>

      {/* Password input */}
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={24} color="#0B6EC6" />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#777"
          secureTextEntry={!passwordVisible}
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={passwordVisible ? "eye" : "eye-off"}
            size={22}
            color="#0B6EC6"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot password */}
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.forgot}>Mot de passe oublié?</Text>
      </TouchableOpacity>

      {/* Login button */}
      <TouchableOpacity
        style={styles.button}
        onPress={formik.handleSubmit}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      {/* Register */}
      <TouchableOpacity
        // ⚠️ Assurez-vous d'avoir un écran "RegisterScreen" dans votre navigation
        onPress={() => navigation.navigate("RegisterScreen")} 
        activeOpacity={0.7}
      >
        <Text style={styles.register}>
          Vous n'avez pas de compte?{" "}
          <Text style={{ color: "#0B6EC6" }}>Créer</Text>
        </Text>
      </TouchableOpacity>

      {/* Bottom icons */}
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.circle} activeOpacity={0.8}>
          <Fontisto name="calculator" size={24} color="#0B6EC6" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.circle} activeOpacity={0.8}>
          <Ionicons name="location-sharp" size={24} color="red" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.circle} activeOpacity={0.8}>
          <Text style={styles.faqText}>FAQ</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "50%",
    height: "30%",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "80%",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginBottom: 10,
    elevation: 3,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontFamily: "outfit",
  },
  forgot: {
    color: "#0B6EC6",
    fontFamily: "outfit",
    marginBottom: 18,
    alignSelf: "flex-end",
    left: 60,
  },
  button: {
    backgroundColor: "#0B6EC6",
    width: "80%",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "outfit-medium",
  },
  register: {
    marginBottom: 25,
    fontSize: 13,
    fontFamily: "outfit",
    color: "#444",
  },
  bottomRow: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 70,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  faqText: {
    color: "#0B6EC6",
    fontFamily: "outfit-medium",
  },
  errorText: {
    color: "red",
    marginBottom: 5,
    alignSelf: "flex-start",
    marginLeft: 55,
    fontFamily: "outfit",
  },
});