import React, { useEffect, useState } from 'react';
import { ImageBackground, Dimensions, StyleSheet, Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import Bird from './components/Bird';
import Obstacles from './components/Obstacles';

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth / 2 + 30);
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0);
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const gravity = 3
  let gameTimerId;
  let obstaclesLeftTimerId;
  let obstaclesLeftTimerIdTwo;

  const obstacleWidth = 80;
  const obstacleHeight = 500;
  const gap = 200;

  // start bird falling
  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom - gravity);
      }, 30);

      return () => {
        clearInterval(gameTimerId);
      }
    }
  }, [birdBottom]);


  // start first obstacle set
  useEffect(() => {
    if (obstaclesLeft > -obstacleWidth) {
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft - 5);
      }, 30);

      return () => {
        clearInterval(obstaclesLeftTimerId);
      }
    } else {
      setObstaclesLeft(screenWidth);
      setObstaclesNegHeight(-Math.random() * 100);
      setScore(score + 1);
    }

  }, [obstaclesLeft]);

  // start second obstacle set
  useEffect(() => {
    if (obstaclesLeftTwo > -obstacleWidth) {
      obstaclesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo - 5);
      }, 30);

      return () => {
        clearInterval(obstaclesLeftTimerIdTwo);
      }
    } else {
      setObstaclesLeftTwo(screenWidth);
      setObstaclesNegHeightTwo(-Math.random() * 100);
      setScore(score + 1);
    }

  }, [obstaclesLeftTwo]);

  // check for collisions
  useEffect(() => {

    const birdContactTolerance = 30;

    let checkCollisionWithFirstSet = () => {
      const isCollisionWithFirstSet =
        ((birdBottom < (obstaclesNegHeight + obstacleHeight + birdContactTolerance) ||
          birdBottom > (obstaclesNegHeight + obstacleHeight + gap - birdContactTolerance)) &&
          (obstaclesLeft > screenWidth / 2 - birdContactTolerance && obstaclesLeft < screenWidth / 2 + birdContactTolerance)
        );
      return isCollisionWithFirstSet;
    }

    let checkCollisionWithSecondSet = () => {
      const isCollisionWithSecondSet =
        ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + birdContactTolerance) ||
          birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap - birdContactTolerance)) &&
          (obstaclesLeftTwo > screenWidth / 2 - birdContactTolerance && obstaclesLeftTwo < screenWidth / 2 + birdContactTolerance)
        );
      return isCollisionWithSecondSet;
    }

    if (checkCollisionWithFirstSet() || checkCollisionWithSecondSet()) {
      gameOver();
    }
  });

  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(obstaclesLeftTimerId);
    clearInterval(obstaclesLeftTimerIdTwo);
    setIsGameOver(true);
  };

  const jump = () => {
    if (!isGameOver && (birdBottom < screenHeight)) {
      setBirdBottom(birdBottom + 50);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <ImageBackground
          style={{ flex: 1, justifyContent: "center" }}
          source={require('./assets/background-night.png')}
          resizeMode="stretch"
        >
          {
            isGameOver && <View style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              zIndex: 1,
            }}>
              <Image source={require('./assets/gameover.png')} style={{
                width: 400,
                height: 86,
              }} />
              <Text style={{ fontSize: 80 }}> {score} </Text>
            </View>
          }
          <Bird
            birdBottom={birdBottom}
            birdLeft={birdLeft}
          />

          <Obstacles
            imgAsset={require('./assets/pipe-green.png')}
            obstaclesLeft={obstaclesLeft}
            obstacleWidth={obstacleWidth}
            obstacleHeight={obstacleHeight}
            randomBottom={obstaclesNegHeight}
            gap={gap}
          />

          <Obstacles
            imgAsset={require('./assets/pipe-red.png')}
            obstaclesLeft={obstaclesLeftTwo}
            obstacleWidth={obstacleWidth}
            obstacleHeight={obstacleHeight}
            randomBottom={obstaclesNegHeightTwo}
            gap={gap}
          />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
