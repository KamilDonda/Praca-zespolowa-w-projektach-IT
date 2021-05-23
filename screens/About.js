import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Background from "../assets/background.jsx";
import BottomMenu from "../components/BottomMenu";

export default function About({navigation}) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
        <Background />
        <Text>About</Text>
        <BottomMenu navigation={navigation}/>
    </View>
  );
}
