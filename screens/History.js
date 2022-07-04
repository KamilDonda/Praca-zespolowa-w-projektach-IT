import React from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text, ScrollView, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import bg from '../assets/bg.png';
import darkbg from '../assets/darkBackground.png';
import BottomMenu from '../components/BottomMenu';

history = {
  historyArray: [
  // przykładowy rekord dla testów
  // {
  //   id: 0,
  //   date: "12/12/2021",
  //   time: "15:00",
  //   answers: "10/10",
  //   category: "Film",
  //   difficulty: "Medium",
  // }
]
}

export default function History({ navigation }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    back: {
      flex: 1,
    },
    arrow: {
      position: 'absolute',
      left: 20,
      top: 30,
    },
    button: {
      width: 320,
      height: 70,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      borderColor: '#DBDBDB',
      borderWidth: 1,
      elevation: 5,
    },
    name: {
      fontSize: 18,
    },
    list: {
      margin: 10,
      marginTop: '18%',
      height: '52%',
    },
    title: {
      fontSize: 42,
      marginTop: 12,
    },
    row1: {
      width: 300,
      alignItems: 'center',
      flexDirection: 'row',
    },
    row2: {
      width: 300,
      alignItems: 'center',
      flexDirection: 'row',
    },
    date: {
      width: 100,
      fontSize: 17,
      marginRight: 30,
      marginLeft: 5,
    },
    time: {
      fontSize: 17,
      marginRight: 50,
    },
    result: {
      width: 60,
      fontSize: 20,
      fontWeight: "bold",
      textAlign: 'right',
    },
    category: {
      width: 210,
      fontSize: 20,
      marginLeft: 5,
      fontWeight: "bold",
    },
    difficulty: {
      width: 70,
      marginLeft: 3,
      textAlign: 'right',
      fontSize: 17,
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
    lightThemeText: {
      color: '#2D2D2D'
    },
    darkThemeText: {
      color: '#DBDBDB',
    },
    lightThemeButton: {
      backgroundColor: '#FAFAFA',
      borderColor: '#DBDBDB'
    },
    darkThemeButton: {
      backgroundColor: '#474747',
      borderColor: '#000000'
    }
  });

  loadHistory = async () => {
    try{
      if(history.historyArray.length == 0){
        if(JSON.parse(await AsyncStorage.getItem('history')) != 0){
          history.historyArray = JSON.parse(await AsyncStorage.getItem('history'));
          setHistory(history.historyArray);
        }
      }
    }catch(error){
      alert(error);
    }
  }

  const [hist, setHistory] = React.useState([]);

  React.useEffect(() => {
    loadHistory();
  }, []);

  // const clearAsync = ()=> {
  //   history.historyArray = 0;
  //   AsyncStorage.setItem('history',JSON.stringify(history.historyArray));
  // }

  const colorScheme = useColorScheme();
  const themeBackgroundStyle = colorScheme === 'light' ? styles.lightThemeBackground : styles.darkThemeBackround
  const themeTitleStyle = colorScheme === 'light' ? styles.lightThemeTitle : styles.darkThemeTitle
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText
  const themeButtonStyle = colorScheme === 'light' ? styles.lightThemeButton : styles.darkThemeButton

  const historyList = history.historyArray.map((item) => (
    <TouchableOpacity
      key = {item.id}
      style = {[styles.button, themeButtonStyle]}>
      <View style = {styles.row1}>
        <Text style = {[styles.date, themeTextStyle]}>{item.date}</Text>
        <Text style = {[styles.time, themeTextStyle]}>{item.time}</Text>
        <Text style = {[styles.result, themeTextStyle]}>{item.answers}</Text>
      </View>
      <View style = {styles.row2}>
        <Text style = {[styles.category, themeTextStyle]}>{item.category}</Text>
        <Text style = {[styles.difficulty, themeTextStyle]}>{item.difficulty}</Text>
      </View>
    </TouchableOpacity>
  ));

  return (
    <ImageBackground source={colorScheme === 'light' ? bg : darkbg} style={[styles.back, themeBackgroundStyle]} resizeMode="stretch">
      <View style={styles.container}>
        <TouchableOpacity style={styles.arrow} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={28} color={colorScheme === 'light' ? '#2D2D2D' : '#FAFAFA'} />
        </TouchableOpacity>
        <Text style={[styles.title, themeTitleStyle]}>History</Text>
        <View style={styles.list}>
          <ScrollView showsVerticalScrollIndicator={false}>{historyList}</ScrollView>
        </View>
        <BottomMenu navigation={navigation} />
      </View>
    </ImageBackground>
  );  
}
