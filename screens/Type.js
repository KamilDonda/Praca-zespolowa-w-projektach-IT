import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  useColorScheme
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import bg from "../assets/bg.png";
import darkbg from '../assets/darkBackground.png';

export default function Type({ navigation }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    back: {
      flex: 1,
    },
    arrow: {
      position: "absolute",
      left: 20,
      top: 30,
    },
    title: {
      fontSize: 42,
      marginTop: 12,
    },
    button: {
      width: 320,
      height: 50,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
      margin: 10,
      borderWidth: 1,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    list: {
      flex: 1,
      justifyContent: 'center',
      margin: 10,
      marginBottom: "40%",
    },
    name: {
      fontSize: 18,
    },
    lightThemeBackground: {
      backgroundColor: '#FAFAFA'
    },
    darkThemeBackround: 
    {
      backgroundColor: '#2D2D2D'
    },
    lightThemeTitle: {
      color: '#2D2D2D',
    },
    darkThemeTitle: {
      color: '#FAFAFA',
    },
    lightThemeButton: {
      backgroundColor: '#FAFAFA',
      borderColor: '#DBDBDB',
    },
    darkThemeButton: {
      backgroundColor: '#474747',
      borderColor: '#000000',
    },
  });

  const colorScheme = useColorScheme();
  const themeBackgroundStyle = colorScheme === 'light' ? styles.lightThemeBackground : styles.darkThemeBackround
  const themeTitleStyle = colorScheme === 'light' ? styles.lightThemeTitle : styles.darkThemeTitle
  const themeButtonStyle = colorScheme === 'light' ? styles.lightThemeButton : styles.darkThemeButton

  return (
    <ImageBackground source={colorScheme === 'light' ? bg : darkbg} style={[styles.back, themeBackgroundStyle]} resizeMode="stretch">
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={28} color={colorScheme === 'light' ? '#2D2D2D' : '#FAFAFA'} />
        </TouchableOpacity>
        <Text style={[styles.title, themeTitleStyle]}>Type</Text>

        <View style={styles.list}>

        <TouchableOpacity style={[styles.button, themeButtonStyle]}
        onPress={() => {global.TYPE = "boolean"; navigation.navigate("QuestionNumber")}}> 
            <Text style={[styles.name, themeTitleStyle]}>
                True/False
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, themeButtonStyle]}
         onPress={() => {global.TYPE = "multiple"; navigation.navigate("QuestionNumber")}}>
            <Text style={[styles.name, themeTitleStyle]}>
                A/B/C/D
            </Text>
        </TouchableOpacity> 

        <TouchableOpacity style={[styles.button, themeButtonStyle]}
         onPress={() => {global.TYPE = ""; navigation.navigate("QuestionNumber")}}>
            <Text style={[styles.name, themeTitleStyle]}>
                Any
            </Text>
        </TouchableOpacity> 

        </View>
      </View>
    </ImageBackground>
  );
}