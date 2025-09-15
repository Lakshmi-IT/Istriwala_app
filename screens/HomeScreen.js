import { View, ScrollView } from "react-native";
import React from "react";
import Hero from "../components/Hero";

import RecentOrders from "../components/RecentOrders";

export default function HomeScreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 8 }}
    >
      <Hero />
      <RecentOrders />
      {/* <Services />
      <WhyChooseUs/> */}
    </ScrollView>
  );
}
