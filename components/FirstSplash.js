import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

export default function FirstSplash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish(); // call App.js to hide splash
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/istriwalaLogo.png")}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07294e", // same as your splash bg
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200, // adjust size
    height: 200,
    borderRadius: 30, // rounded corners instead of circle
    resizeMode: "contain", // keeps proportions
  },
});
