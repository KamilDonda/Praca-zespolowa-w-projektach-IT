import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  useColorScheme,
  StatusBar,
  BackHandler,
  Alert,
} from 'react-native';

import bg from '../assets/bg.png';
import darkbg from '../assets/darkBackground.png';
import logo from '../assets/logo.png';
import whiteLogo from '../assets/whiteLogo.png';
import BottomMenu from '../components/BottomMenu';

export default function Home({ navigation }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    back: {
      flex: 1,
    },
    button: {
      width: 250,
      height: 48,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
    },
    text: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
    logo: {
      width: 290,
      height: 175,
      marginTop: 185,
    },
    lightThemeBackground: {
      backgroundColor: '#FAFAFA',
    },
    darkThemeBackround: {
      backgroundColor: '#2D2D2D',
    },
    lightThemeButton: {
      backgroundColor: '#FF5656',
    },
    darkThemeButton: {
      backgroundColor: '#CC8406',
    },
  });

  const colorScheme = useColorScheme();
  const themeBackgroundStyle =
    colorScheme === 'light' ? styles.lightThemeBackground : styles.darkThemeBackround;
  const themeButtonStyle = colorScheme === 'light' ? styles.lightThemeButton : styles.darkThemeButton;

  const startButton = (
    <TouchableOpacity
      style={[styles.button, themeButtonStyle]}
      onPress={() => navigation.navigate('Category')}
    >
      <Text style={styles.text}>Start</Text>
    </TouchableOpacity>
  );

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  return (
    <ImageBackground
      source={colorScheme === 'light' ? bg : darkbg}
      style={[styles.back, themeBackgroundStyle]}
      resizeMode="stretch"
    >
      <StatusBar translucent={false} />
      <View style={styles.container}>
        <View>
          <Image source={colorScheme === 'light' ? logo : whiteLogo} style={styles.logo} />
        </View>
        <View>{startButton}</View>
        <BottomMenu navigation={navigation} />
      </View>
    </ImageBackground>
  );
}
