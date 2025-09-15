import React from "react";
import { View, Text } from "react-native";

export default function Card({ title, subtitle }) {
  return (
    <View className="bg-white p-4 rounded-2xl shadow-md mb-4">
      <Text className="text-lg font-bold text-gray-800">{title}</Text>
      <Text className="text-gray-500">{subtitle}</Text>
    </View>
  );
}
