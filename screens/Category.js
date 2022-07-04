import React from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text, ScrollView, useColorScheme } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import bg from '../assets/bg.png';
import darkbg from '../assets/darkBackground.png';

export default function Category({ navigation }) {
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
    title: {
      fontSize: 42,
      marginTop: 12,
    },
    button: {
      width: 320,
      height: 50,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    list: {
      margin: 10,
      marginTop: '18%',
      height: '52%',
    },
    name: {
      color: '#2D2D2D',
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

  const [category, setCategory] = React.useState([]);

  const colorScheme = useColorScheme();
  const themeBackgroundStyle = colorScheme === 'light' ? styles.lightThemeBackground : styles.darkThemeBackround
  const themeTitleStyle = colorScheme === 'light' ? styles.lightThemeTitle : styles.darkThemeTitle
  const themeButtonStyle = colorScheme === 'light' ? styles.lightThemeButton : styles.darkThemeButton

  const getMovieRequest = async () => {
    const url = `https://opentdb.com/api_category.php`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.trivia_categories) {
      setCategory(responseJson.trivia_categories);
    }
  };

  React.useEffect(() => {
    getMovieRequest();
  }, []);

  const categoryList = category.sort((a, b) => a.name > b.name).map((categories) => (
    <TouchableOpacity
      key={categories.id}
      style={[styles.button, themeButtonStyle]}
      onPress={() => {
        global.CATEGORY = categories.id;
        global.NAME = categories.name;
        navigation.navigate('Difficulty');
      }}
    >
      <Text style={[styles.name, themeTitleStyle]}>
        {categories.name.search('Entertainment') === 0
          ? categories.name.replace('Entertainment: ', '')
          : categories.name.replace('Science: ', '')}
      </Text>
    </TouchableOpacity>
  ));

  return (
    <ImageBackground source={colorScheme === 'light' ? bg : darkbg} style={[styles.back, themeBackgroundStyle]} resizeMode="stretch">
      <View style={styles.container}>
        <TouchableOpacity style={styles.arrow} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={28} color={colorScheme === 'light' ? '#2D2D2D' : '#FAFAFA'} />
        </TouchableOpacity>
        <Text style={[styles.title, themeTitleStyle]}>Category</Text>
        <View style={styles.list}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={[styles.button, themeButtonStyle]}
              onPress={() => {
                global.CATEGORY = "";
                global.NAME = "";
                navigation.navigate('Difficulty');
              }}
            >
              <Text style={[styles.name, themeTitleStyle]}>Any</Text>
            </TouchableOpacity>
          {categoryList}
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}
