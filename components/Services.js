import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import pickupImage from "../assets/pickupanddelivery.jpeg";
import hygieneImage from "../assets/hygiene-process.jpeg";
import deliveryImage from "../assets/on-time-delivery.png";
import pricingImage from "../assets/affordable.jpeg";
import satisfactionImage from "../assets/customer-satisfaction.jpeg";

const services = [
  {
    iconName: "car-outline",
    title: "Doorstep Pickup & Delivery",
    description:
      "We pick up and deliver your clothes right at your doorstep for ultimate convenience.",
    image: pickupImage,
    features: [
      "Free pickup",
      "On-time delivery",
      "Hassle-free process",
      "Service at your doorstep",
    ],
  },
  {
    iconName: "shield-checkmark",
    title: "Very Hygienic Process",
    description:
      "All clothes are cleaned using hygienic, safe, and fabric-friendly methods.",
    image: hygieneImage,
    features: ["Sanitized equipment", "Fabric care", "Fresh results"],
  },
  {
    iconName: "time",
    title: "On-Time Delivery",
    description:
      "We value your time and ensure your clothes are ready exactly when promised.",
    image: deliveryImage,
    features: [
      "24-48 hour turnaround",
      "Express options",
      "Reliable service",
      "Timely updates",
    ],
  },
  {
    iconName: "cash",
    title: "Affordable Pricing",
    description:
      "Enjoy premium Ironing services at budget-friendly prices with no hidden costs.",
    image: pricingImage,
    features: [
      "Transparent rates",
      "Multiple plans",
      "Value for money",
      "Flexible options",
    ],
  },
  {
    iconName: "thumbs-up",
    title: "Customer Satisfaction Guaranteed",
    description:
      "We prioritize your satisfaction with every Ironing, Pickup, and delivery.",
    image: satisfactionImage,
    features: [
      "Quality assurance",
      "Dedicated support",
      "Personalized care",
      "Trusted by customers",
    ],
  },
];

const Services = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <Icon name={item.iconName} color="#042048" size={24} />
        </View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.features}>
        {item.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingVertical: 20 }}
    >
      <View style={styles.headerSection}>
        <Text style={styles.sectionTitle}>Our Services</Text>
        <Text style={styles.sectionSubtitle}>
          We provide reliable, hygienic, and affordable Ironing services
          tailored to your needs.
        </Text>
      </View>

      <FlatList
        data={services}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        scrollEnabled={false} // prevent nested scroll warning
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb", paddingHorizontal: 5 },
  headerSection: { marginBottom: 0, alignItems: "center" },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#111827",
    textAlign: "center",
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    maxWidth: 300,
    marginBottom:15
  },
  list: { paddingBottom: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: { width: "100%", height: 180 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  iconWrapper: {
    backgroundColor: "#e0f2fe",
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  title: { fontSize: 18, fontWeight: "bold", flexShrink: 1 },
  description: { padding: 12, color: "#374151", fontSize: 14 },
  features: { paddingHorizontal: 12, paddingBottom: 12 },
  featureItem: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#042048",
    marginRight: 8,
  },
  featureText: { fontSize: 14, color: "#374151" },
});

export default Services;
