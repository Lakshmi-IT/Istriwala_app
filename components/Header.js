import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { Ionicons } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";

import { Navigation } from "lucide-react-native";

export default function Header({ onMenuPress }) {
  return (
    <View
      style={{
        height: 80,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          marginTop: 35,
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left - Menu Icon */}
        <TouchableOpacity onPress={onMenuPress}>
          <Image
            source={require("../assets/icons/menubar.png")}
            style={{ width: 35, height: 22, resizeMode: "contain" }}
          />
          {/* <Image name="menu-outline" size={25} color="#042048" /> */}
        </TouchableOpacity>

        {/* Center - Logo */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/logobanner.jpeg")}
            style={{ width: 160, height: 50, resizeMode: "contain" }}
          />
        </View>

        {/* Right - Notifications & Call */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Image
              source={require("../assets/icons/notification.png")}
              style={{ width: 30, height: 22, resizeMode: "contain" }}
            />
            {/* <Ionicons name="notifications" size={20} color="#042048" /> */}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL("tel:+918125423366")}
          >
            <Image
              source={require("../assets/icons/call.png")}
              style={{ width: 30, height: 22, resizeMode: "contain" }}
            />
            {/* <Ionicons name="call" size={20} color="#042048" /> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
