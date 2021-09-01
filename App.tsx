import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Animated, Image } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view'

export default function App() {

  const [isLoadingDone, setIsLoadingDone] = React.useState(false)
  const [loadingProgress, setLoadingProgress] = React.useState(new Animated.Value(0))

  React.useEffect(() => {
    Animated.timing(loadingProgress, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
      delay: 400
    }).start(() => {
      setIsLoadingDone(true);
    })
  }, [])

  const colorLayer = <View style={[StyleSheet.absoluteFill, { backgroundColor: "#7F23D9" }]} />
  const whiteLayer = <View style={[StyleSheet.absoluteFill, { backgroundColor: "#FFF" }]} />

  const imageScale = {
    transform: [
      {
        scale: loadingProgress.interpolate({
          inputRange: [0, 15, 100],
          outputRange: [0.1, 0.06, 16]
        })
      }
    ]
  }

  const labelStyle = {
    transform: [
      {
        scale: loadingProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.777],
          // extrapolate: 'clamp',
        }),
      },
    ],
  }

  const opacity = {
    opacity: loadingProgress.interpolate({
      inputRange: [0, 25, 50],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
  }

  const img = require("./assets/twt.png");

  return (
    <View style={{ flex: 1 }}>
      {colorLayer}
      <MaskedView style={{ flex: 1 }} maskElement={
        <View style={{
          // backgroundColor: 'transparent',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {/* <Animated.Text
            style={[{
              fontSize: 60,
              color: 'black',
              fontWeight: 'bold',
            }]}
            >
            Basic Mask
          </Animated.Text> */}
          <Animated.Image source={img} style={[{ width: 500, height: 500 }, imageScale]} />
        </View>
      }>
        {whiteLayer}
        <Animated.View style={[opacity, styles.centered]}>
          <Text> Your app goes here !! </Text>
        </Animated.View>
      </MaskedView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
