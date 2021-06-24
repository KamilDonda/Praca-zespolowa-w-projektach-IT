import React from 'react';
import { View, ImageBackground, Text, Image, StyleSheet, ActivityIndicator, useColorScheme } from 'react-native';

import { getQuestions } from '../../services';
import QuestionDetails from './QuestionDetails';
import bg from '../../assets/bg.png';
import darkbg from '../../assets/darkBackground.png';
import logo from '../../assets/logo.png';
import whiteLogo from '../../assets/whiteLogo.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  back: {
    flex: 1,
  },
  title: {
    fontSize: 42,
    marginTop: 22,
  },
  logo: {
    width: 290,
    height: 175,
    marginTop: 185,
  },
  text: {
    fontSize: 18,
    maxWidth: '80%',
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

const Question = ({ navigation }) => {
  const [questions, setQuestions] = React.useState([]);
  const [currentQuestionId, setCurrentQuestionId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [message, setMessage] = React.useState('Download data in progress...');

  const colorScheme = useColorScheme();
  const themeBackgroundStyle = colorScheme === 'light' ? styles.lightThemeBackground : styles.darkThemeBackround
  const themeTitleStyle = colorScheme === 'light' ? styles.lightThemeTitle : styles.darkThemeTitle

  React.useEffect(() => {
    getQuestions(CATEGORY, NUMBER, DIFFICULTY, TYPE).then((res) => validationRequest(res));
  }, []);

  function validationRequest(res) {
    if (res.response_code === 0) {
      setQuestions(res.results.map((question, index) => ({ ...question, id: index })));
      setCurrentQuestionId(0);
      setIsLoading(false);
    } else if (res.response_code === 1) {
      setMessage('Error! No Results!');
    } else if (res.response_code == 2) {
      setMessage('Error! Invalid Parameter!');
    }
  }

  const answerQuestion = () => {
    if (questions.length - 1 <= currentQuestionId) {
      // navigation.pop()
      navigation.navigate('Result', { questionsNumber: questions.length });
      return;
    }

    setCurrentQuestionId((prevState) => prevState + 1);
  };

  return (
    <ImageBackground source={colorScheme === 'light' ? bg : darkbg} style={[styles.back, themeBackgroundStyle]} resizeMode="stretch">
      <View style={styles.container}>
        {isLoading ? (
          <>
            <View>
              <Image source={colorScheme === 'light' ? logo : whiteLogo} style={styles.logo} />
            </View>
            <View style={styles.horizontal}>
              <ActivityIndicator size={100} color={colorScheme === 'light' ? '#2D2D2D' : '#FAFAFA'} />
            </View>
            <View>
              <Text style={[styles.text, themeTitleStyle]}>{message}</Text>
            </View>
          </>
        ) : (
          <QuestionDetails question={questions[currentQuestionId]} answerQuestion={answerQuestion} />
        )}
      </View>
    </ImageBackground>
  );
};

export default Question;
