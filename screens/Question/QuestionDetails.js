import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, ActivityIndicator, useColorScheme } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import he from 'he';

const styles = StyleSheet.create({
  title: {
    fontSize: 42,
    color: '#2D2D2D',
    marginTop: 22,
  },
  question: {
    margin: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    margin: 10,
    height: '52%',
  },
  name: {
    color: '#2D2D2D',
    fontSize: 18,
    textAlign: 'center',
  },
  timer: {
    marginTop: 25,
  },
  answers: {
    width: '90%',
    position: 'absolute',
    bottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lightThemeTitle: {
    color: '#2D2D2D',
  },
  darkThemeTitle: {
    color: '#FAFAFA',
  }
});

export default function QuestionDetails ({ question, answerQuestion }) {

  const colorScheme = useColorScheme();
  const themeTitleStyle = colorScheme === 'light' ? styles.lightThemeTitle : styles.darkThemeTitle
  const themeButtonStyle = colorScheme === 'light' ? '#FAFAFA' : '#474747'
  const themeBorderStyle = colorScheme === 'light' ? '#DBDBDB' : '#000000'
  const themeCorrectButtonStyle = colorScheme === 'light' ? '#00DD00' : '#007A00'
  const themeCorrectBorderStyle = colorScheme === 'light' ? '#007A00' : '#006600'
  const themeBadButtonStyle = colorScheme === 'light' ? '#FF5656' : '#E53D3D'
  const themeTimeButtonStyle = colorScheme === 'light' ? '#FF8AFF' : '#9C02C9'
  
  const [answers, setAnswers] = React.useState([])
  const [questionNumber, setQuestionNumber] = React.useState(0)
  const [bgColor,setBGColor] = React.useState([themeButtonStyle,themeButtonStyle,themeButtonStyle,themeButtonStyle])
  const [bColor, setBColor] = React.useState([themeBorderStyle,themeBorderStyle,themeBorderStyle,themeBorderStyle])
  const [stop, setStop] = React.useState(true)
  const [time, setTime] = React.useState(0)
  const [click, setClick] = React.useState(false)
  const [timer, setTimer] = React.useState()
  const [correctCounter, setCorrectCounter] = React.useState(0);
  const [incorrectCounter, setIncorrectCounter] = React.useState(0);
  global.FINALRESULT = correctCounter

  if(questionNumber === 0)
  {
    setAnswers([...question.incorrect_answers, question.correct_answer].sort(
      () => Math.random() - 0.5,
    ))
    setQuestionNumber(1)
  }

  React.useEffect(() => {
    setTimer(
        <View style={styles.timer}>
          <CountdownCircleTimer
            isPlaying={stop}
            duration={20}
            colors={[
              ['#004777', 0.4],
              ['#F7B801', 0.4],
              ['#A30000', 0.2],
            ]}
            size={120}
            onComplete={() => {
              setTime(1)
              setStop(false)
              setTimeout(() => {
                answerQuestion(false)
                setBGColor([themeButtonStyle,themeButtonStyle,themeButtonStyle,themeButtonStyle])
                setBColor([themeBorderStyle,themeBorderStyle,themeBorderStyle,themeBorderStyle])
                setQuestionNumber(0)
                setStop(true)
                setTime(0)
                setTimer()
              }, 1200);
            }}
          >
            {({ remainingTime, animatedColor }) => (
            <Animated.Text style={{ color: animatedColor, fontSize: 28}}>
              {remainingTime}
            </Animated.Text>
            )}
          </CountdownCircleTimer>
        </View>
    )
  }, [stop, timer === undefined])

  if(time === 0)
  {
    if(timer === undefined)
    {
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={100} color={colorScheme === 'light' ? '#2D2D2D' : '#FAFAFA'} />
        </View>
      )
    }
    else
    {
      return (
        <>
          <Text style={[styles.title, themeTitleStyle]}>{`Question ${question.id + 1}`}</Text>
    
          {timer && timer}
    
          <View style={styles.question}>
            <Text style={[styles.name, themeTitleStyle]}>{he.decode(question.question)}</Text>
          </View>
    
          <View style={styles.list}>
            {answers.map((answer, index) => (
              <TouchableOpacity
                key={answer}
                style={{
                  width: 320,
                  height: 50,
                  backgroundColor: bgColor[index],
                  borderRadius: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 10,
                  borderWidth: 1,
                  borderColor: bColor[index],
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                onPress={() => {
                  if(!click)
                  {
                    setClick(true)
                    setStop(false)
                    if(answer === question.correct_answer)
                    {
                      setCorrectCounter((prevState) => prevState + 1);
                      index === 0 && (setBGColor([themeCorrectButtonStyle,themeButtonStyle,themeButtonStyle,themeButtonStyle]), setBColor([themeCorrectBorderStyle,themeBorderStyle,themeBorderStyle,themeBorderStyle]))
                      index === 1 && (setBGColor([themeButtonStyle,themeCorrectButtonStyle,themeButtonStyle,themeButtonStyle]), setBColor([themeBorderStyle,themeCorrectBorderStyle,themeBorderStyle,themeBorderStyle]))
                      index === 2 && (setBGColor([themeButtonStyle,themeButtonStyle,themeCorrectButtonStyle,themeButtonStyle]), setBColor([themeBorderStyle,themeBorderStyle,themeCorrectBorderStyle,themeBorderStyle]))
                      index === 3 && (setBGColor([themeButtonStyle,themeButtonStyle,themeButtonStyle,themeCorrectButtonStyle]), setBColor([themeBorderStyle,themeBorderStyle,themeBorderStyle,themeCorrectBorderStyle]))
                    }
                    else
                    {
                      setIncorrectCounter((prevState) => prevState + 1);
                      index === 0 && (setBGColor([themeBadButtonStyle,themeButtonStyle,themeButtonStyle,themeButtonStyle]), setBColor(['#A50000',themeBorderStyle,themeBorderStyle,themeBorderStyle]))
                      index === 1 && (setBGColor([themeButtonStyle,themeBadButtonStyle,themeButtonStyle,themeButtonStyle]), setBColor([themeBorderStyle,'#A50000',themeBorderStyle,themeBorderStyle]))
                      index === 2 && (setBGColor([themeButtonStyle,themeButtonStyle,themeBadButtonStyle,themeButtonStyle]), setBColor([themeBorderStyle,themeBorderStyle,'#A50000',themeBorderStyle]))
                      index === 3 && (setBGColor([themeButtonStyle,themeButtonStyle,themeButtonStyle,themeBadButtonStyle]), setBColor([themeBorderStyle,themeBorderStyle,themeBorderStyle,'#A50000']))
                    }
                    setTimeout(() => {
                      console.log("wow: " + correctCounter)
                      answerQuestion(correctCounter)
                      setBGColor([themeButtonStyle,themeButtonStyle,themeButtonStyle,themeButtonStyle])
                      setBColor([themeBorderStyle,themeBorderStyle,themeBorderStyle,themeBorderStyle])
                      setQuestionNumber(0)
                      setStop(true)
                      setClick(false)
                      setTimer()
                    }, 1200);
                  }
                }}
              >
                <Text style={[styles.name, themeTitleStyle]}>{he.decode(answer)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.answers}>
            <Text style={[styles.name, themeTitleStyle]}>Correct: {correctCounter}/{NUMBER}</Text>
            <Text style={[styles.name, themeTitleStyle]}>Incorrect: {incorrectCounter}/{NUMBER}</Text>
          </View>
        </>
      );
    }
  }
  else
  { 
    return (
      <>
        <Text style={[styles.title, themeTitleStyle]}>{`Question ${question.id + 1}`}</Text>
  
        {timer && timer}
  
        <View style={styles.question}>
          <Text style={[styles.name, themeTitleStyle]}>{he.decode(question.question)}</Text>
        </View>
  
        <View style={styles.list}>
          {answers.map((answer) => (
            <TouchableOpacity
              key={answer}
              style={{
                width: 320,
                height: 50,
                backgroundColor: answer === question.correct_answer ? themeTimeButtonStyle : themeButtonStyle,
                borderRadius: 18,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                borderWidth: 1,
                borderColor: answer === question.correct_answer ? '#9C02C9' : themeBorderStyle,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <Text style={[styles.name, themeTitleStyle]}>{he.decode(answer)}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.answers}>
          <Text style={[styles.name, themeTitleStyle]}>Correct: {correctCounter}/{NUMBER}</Text>
          <Text style={[styles.name, themeTitleStyle]}>Incorrect: {incorrectCounter}/{NUMBER}</Text>
        </View>
      </>
    );
  }
};
