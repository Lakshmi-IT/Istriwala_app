import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { categories } from "../utils/categories";

// Define tabs with keys matching your categories object
const tabs = [
  { key: "Men", label: "Men", icon: require("../assets/men.jpeg") },
  { key: "Women", label: "Women", icon: require("../assets/women.jpeg") },
  { key: "kids", label: "Kids", icon: require("../assets/kids.jpeg") },
  {
    key: "Household",
    label: "Households",
    icon: require("../assets/houseHolds.jpeg"),
  },
];

export default function PriceScreen() {
  const [activeTab, setActiveTab] = useState("Men"); // Default tab

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Image source={tab.icon} style={styles.tabIcon} />
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.key && styles.activeTabLabel,
              ]}
            >
              {tab.label} ({categories[tab.key].length - 1})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Price List */}
      <FlatList
        data={categories[activeTab].slice(1)} // Use your categories object
        keyExtractor={(item, index) => index.toString()} // No id in your data
        renderItem={({ item }) => (
          <View style={styles.priceItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>₹{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

// ---------------- Styles ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom:10
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  tab: {
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#2563eb",
  },
  tabIcon: {
    width: 40,
    height: 40,
    marginBottom: 3,
  },
  tabLabel: {
    fontSize: 14,
    color: "#555",
  },
  activeTabLabel: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  priceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemName: {
    fontSize: 16,
    color: "#333",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
