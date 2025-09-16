import React, { useEffect } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";

export default function SecondSplash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish(); // tell App.js to hide splash
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <ImageBackground
      source={require("../assets/second_splash.png")}
      style={styles.background}
    >
      <View style={styles.overlay}></View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover", // fills screen
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
