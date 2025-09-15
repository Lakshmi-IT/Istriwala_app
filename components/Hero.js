import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Pressable,
  Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("window");

const categories = [
  {
    id: 1,
    name: "Men",
    image: require("../assets/men.jpg"),
    color: "#042048",
    hovercolor: "#fde047",
  },
  {
    id: 2,
    name: "Women",
    image: require("../assets/women.webp"),
    color: "#042048",
    hovercolor: "#fde047",
  },
  {
    id: 3,
    name: "kids",
    image: require("../assets/kids.webp"),
    color: "#042048",
    hovercolor: "#fde047",
  },
  {
    id: 4,
    name: "Household",
    image: require("../assets/houseHolds.webp"),
    color: "#042048",
    hovercolor: "#fde047",
  },
];

const HomeScreen = () => {
  const [active, setActive] = useState(null);
  const navigation = useNavigation();

  const openWhatsApp = () => {
    const phoneNumber = "+918125423366";
    const message = "Hello, I Need Use Your Service, Can I Get More Info!";

    let url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Make sure WhatsApp is installed on your device");
    });
  };
  return (
    <View style={[styles.container]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
        <Image
          source={require("../assets/CoverImage 2.png")}
          style={styles.banner}
        />

        {/* Categories */}
        <Text style={styles.sectionTitle}>SELECT IRONING FOR</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.categoryScroll,  { width: width - 20 }]}
        >
          {categories.map((cat) => (
            <Pressable
              key={cat.id}
              onPress={() => {
                navigation.navigate("Place Order", {
                  category: cat.name,
                });
              }}
              style={[
                styles.categoryBox,
                {
                  borderColor: active === cat.id ? cat.hovercolor : cat.color,
                },
              ]}
              onPressIn={() => setActive(cat.id)}
              onPressOut={() => setActive(null)}
            >
              <Image source={cat.image} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{cat.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Manual Order */}
        <Text style={styles.sectionTitle}>Order Now</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.callBtn}
            onPress={() => navigation.navigate("Place Order")}
          >
            <Ionicons name="cart-outline" size={20} color="#fff" />
            <Text style={styles.btnText}> Place Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.msgBtn} onPress={openWhatsApp}>
            <Ionicons name="logo-whatsapp" size={20} color="#fff" />
            <Text style={styles.btnText}> Message us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", height: "50vh" },
  header: {
    backgroundColor: "#1e3a8a",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginTop: 50,
  },
  headerText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  subText: { color: "#fff", fontSize: 14 },
  banner: {
    width: 340,
    height: 225,
    resizeMode: "fit",
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    // marginHorizontal: 16,
    marginVertical: 8,
    color: "#374151",
    marginTop: 10,
  },
  categoryScroll: {
    paddingLeft: 0,
    paddingRight: 0,
    
    display: "flex",
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems:"center"
  },
  categoryBox: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 8,
    // marginRight: 10,
    alignItems: "center",
    width: 79,
    height: 110,
  },
  categoryImage: { width: 55, height: 60, objectFit: "fill" },
  categoryText: { marginTop: 10, fontWeight: "bold", fontSize: 12 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
    // paddingHorizontal: 12,
  },
  callBtn: {
    flexDirection: "row",
    backgroundColor: "#042048",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  msgBtn: {
    flexDirection: "row",
    backgroundColor: "#042048",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
    paddingVertical: 6,
  },
  navItem: { alignItems: "center" },
  navTextActive: { fontSize: 12, color: "black", fontWeight: "bold" },
});
