import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, AsyncStorage, useColorScheme } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import bg from '../assets/bg.png';
import darkbg from '../assets/darkBackground.png';

const getResultText = (correctRate) => {
  addToHistory()

  if (correctRate > 0.8) {
    return 'Well done!';
  }

  if (correctRate > 0.5) {
    return 'Not bad';
  }

  return 'Maybe next time...';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  back: {
    flex: 1,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 72,
  },
  title: {
    fontSize: 42,
    marginTop: 22,
  },
  result: {
    margin: 0,
    fontSize: 42,
    fontWeight: '500',
  },
  again: {
    fontSize: 22,
    marginTop: 22,
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
});

const Result = ({ navigation, route }) => {
  const { questionsNumber } = route.params;

  const colorScheme = useColorScheme();
  const themeBackgroundStyle = colorScheme === 'light' ? styles.lightThemeBackground : styles.darkThemeBackround
  const themeTitleStyle = colorScheme === 'light' ? styles.lightThemeTitle : styles.darkThemeTitle
  
  loadHistory = async () => {
    try{
      if(history.historyArray.length == 0){
        if(JSON.parse(await AsyncStorage.getItem('history')) != 0)
          history.historyArray = JSON.parse(await AsyncStorage.getItem('history'));
      }
    }catch(error){
      alert(error);
    }
    addToHistory()
  }

  addToHistory = () => {
    let index;

    if(history.historyArray.length == 0)
      index = 0;
    else 
      index = history.historyArray[history.historyArray.length - 1].id + 1;

    global.NAME = global.NAME.replace('Entertainment: ','');
    global.NAME = global.NAME.replace('Science: ','');

    if(global.DIFFICULTY == "")
      global.DIFFICULTY = "Any" 
    if(global.NAME == "")
      global.NAME = "Any" 
    if(global.NAME == "Japanese Anime & Manga")
      global.NAME = "Japanese Anime"
    

    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    if(day < 10)
      day = "0" + day;
    if(month < 10)
      month = "0" + month;

    let hour = new Date().getHours(); 
    let min = new Date().getMinutes();  

    if(hour < 10)
      hour = "0" + hour;
    if(min < 10)
      min = "0" + min;

    let data = {
        id: index,
        date: day + '/' + month + '/' + year,
        time: hour + ':' + min,
        answers: FINALRESULT + "/" + questionsNumber,
        category: global.NAME,
        difficulty: global.DIFFICULTY,
    };
    history.historyArray.push(data);
    AsyncStorage.setItem('history',JSON.stringify(history.historyArray));
  };

  return (
    <ImageBackground source={colorScheme === 'light' ? bg : darkbg} style={[styles.back, themeBackgroundStyle]} resizeMode="stretch">
      <View style={styles.container}>
        <Text style={[styles.title, themeTitleStyle]}>{getResultText(FINALRESULT / questionsNumber)}</Text>

        <View style={styles.section}>
          <Text style={[styles.title, themeTitleStyle]}>Your result:</Text>
          <Text style={[styles.result, themeTitleStyle]}>
            {FINALRESULT}/{questionsNumber}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.again, themeTitleStyle]}>Try again!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <EvilIcons name="redo" size={84} color={colorScheme === 'light' ? '#2D2D2D' : '#FAFAFA'} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Result;
