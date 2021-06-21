import React from 'react';
import { View, ImageBackground, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

import { getQuestions } from '../../services';
import bg from '../../assets/bg.png';
import QuestionDetails from './QuestionDetails';
import Logo from '../../assets/logo.png';

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
    color: '#2D2D2D',
    marginTop: 22,
  },
  question: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 120,
    width: '100%',
    padding: 16,
  },
  button: {
    width: 320,
    height: 50,
    backgroundColor: '#FAFAFA',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#DBDBDB',
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
    height: '52%',
  },
  name: {
    color: '#2D2D2D',
    fontSize: 18,
  },
  logo: {
    width: 290,
    height: 175,
    marginTop: 185,
  },
  text: {
    color: 'black',
    fontSize: 18,
    maxWidth: '80%',
  },
});

const Question = ({ navigation }) => {
  const [questions, setQuestions] = React.useState([]);
  const [currentQuestionId, setCurrentQuestionId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [message, setMessage] = React.useState('Download data in progress...');
  const [correctCounter, setCorrectCounter] = React.useState(0);

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

  const answerQuestion = (isCorrect) => {
    if (isCorrect) {
      setCorrectCounter((prevState) => prevState + 1);
    }

    if (questions.length - 1 <= currentQuestionId) {
      navigation.pop()
      navigation.navigate('Result', { result: correctCounter, questionsNumber: questions.length });
      return;
    }

    setCurrentQuestionId((prevState) => prevState + 1);
  };

  return (
    <ImageBackground source={bg} style={styles.back} resizeMode="stretch">
      <View style={styles.container}>
        {isLoading ? (
          <>
            <View>
              <Image source={Logo} style={styles.logo} />
            </View>
            <View style={styles.horizontal}>
              <ActivityIndicator size={100} color="#999999" />
            </View>
            <View>
              <Text style={styles.text}>{message}</Text>
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
