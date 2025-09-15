import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function Button({ title, onPress, color = "bg-blue-500" }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${color} px-6 py-3 rounded-2xl shadow-md`}
    >
      <Text className="text-white font-semibold text-lg text-center">{title}</Text>
    </TouchableOpacity>
  );
}
