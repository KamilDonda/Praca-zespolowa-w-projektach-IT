import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
  Linking
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import bg from '../assets/bg.png';
import darkbg from '../assets/darkBackground.png';
import BottomMenu from '../components/BottomMenu';

import github from '../assets/github.png';
import github_dark from '../assets/github_dark.png';
import polsl from '../assets/polsl.png';
import rms from '../assets/rms.png';

export default function About({ navigation }) {
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
    authorsStyle: {
      alignSelf: 'stretch',
      marginLeft: '10%',
      textAlign: 'left',
      fontWeight: 'bold',
      color: 'black',
      fontSize: 20,
    },
    authors: {
      marginTop: "4%",
    },
    names: {
      color: 'black',
      textAlign: 'left',
      fontSize: 20,
    },
    imageStyle: {
      width: '95%',
      height: '40%',
      resizeMode: 'contain',
      marginTop: 45,
    },
    lightThemeBackground: {
      backgroundColor: '#FAFAFA',
    },
    darkThemeBackround: {
      backgroundColor: '#2D2D2D',
    },
    lightThemeTitle: {
      color: '#2D2D2D',
    },
    darkThemeTitle: {
      color: '#FAFAFA',
    },
    logoImage: {
      justifyContent: 'flex-start',
      width: 70,
      height: 70,
    },
    logoText: {
      justifyContent: 'flex-end',
      height: 70,
      textAlignVertical: 'center',
      fontSize: 20,
      marginLeft: 20,
      maxWidth: 200,
    },
  });

  const colorScheme = useColorScheme();
  const themeBackgroundStyle =
    colorScheme === 'light' ? styles.lightThemeBackground : styles.darkThemeBackround;
  const themeTitleStyle = colorScheme === 'light' ? styles.lightThemeTitle : styles.darkThemeTitle;

  function logo(a, b, text, link) {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginHorizontal: 50,
          height: 100,
          alignItems: 'center',
          marginRight: 30,
        }}
        onPress={() => Linking.openURL(link)}
      >
        <View>
          <Image style={styles.logoImage} source={colorScheme === 'light' ? a : b} />
        </View>
        <View>
          <Text style={[styles.logoText, themeTitleStyle]}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ImageBackground
      source={colorScheme === 'light' ? bg : darkbg}
      style={[styles.back, themeBackgroundStyle]}
      resizeMode="stretch"
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.arrow} onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back-ios"
            size={28}
            color={colorScheme === 'light' ? '#2D2D2D' : '#FAFAFA'}
          />
        </TouchableOpacity>
        <Text style={[styles.title, themeTitleStyle]}>About</Text>
        <View style={{ marginHorizontal: 50, width: '100%', marginTop: "10%" }}>
          {logo(github, github_dark, 'Github', 'https://github.com/KamilDonda/QuizApp')}
          {logo(polsl, polsl, 'Silesian University of Technology', 'https://www.polsl.pl/')}
          {logo(rms, rms, 'Faculty of Applied Mathematics', 'https://www.polsl.pl/rms/')}
        </View>
        <View style={styles.authors}>
          <Text style={[styles.authorsStyle, themeTitleStyle]}> Authors: </Text>
          <Text style={[styles.names, themeTitleStyle]}>
            {' '}
            Kamil Donda Daniel Piątek {'\n'} Robert Kwoll Robert Olej{' '}
          </Text>
        </View>
        <BottomMenu navigation={navigation} />
      </View>
    </ImageBackground>
  );
}
