import React from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Use Ionicons, adjust icon names accordingly

const features = [
  {
    iconName: "car-outline", // Ionicons equivalent
    title: "Free Pickup & Delivery",
    description:
      "We collect and deliver your clothes right to your doorstep at no extra cost.",
  },
  {
    iconName: "time",
    title: "Fast Service",
    description:
      "Quick turnaround time of 24-48 hours for all regular Ironing services.",
  },
  {
    iconName: "shield-checkmark",
    title: "Safe & Secure",
    description:
      "Your clothes are handled with care and tracked throughout the entire process.",
  },
  {
    iconName: "trophy",
    title: "Quality Guaranteed",
    description:
      "We use premium products and techniques to ensure the best results every time.",
  },
  {
    iconName: "people",
    title: "Expert Team",
    description:
      "Our experienced professionals know how to handle all types of fabrics and stains.",
  },
  {
    iconName: "thumbs-up",
    title: "100% Satisfaction",
    description:
      "We're not happy until you're completely satisfied with our service.",
  },
];

const WhyChooseUs = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <Icon name={item.iconName} size={24} color="#042048" />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.sectionTitle}>Why Choose IstriWala?</Text>
        <Text style={styles.sectionSubtitle}>
          We're committed to providing the best ironing experience with
          professional care and convenience
        </Text>
      </View>

      <FlatList
        data={features}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        numColumns={1} // keep it fixed for this render
        key={1} // force remount if numColumns changes dynamically
        contentContainerStyle={{ paddingBottom: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 0,
    backgroundColor: "#f9fafb",
  },
  headerSection: {
    marginBottom: 20,
    alignItems: "center",
  },
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
  },
  card: {
    flex: 1,
    backgroundColor: "#042048",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  iconWrapper: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#d1d5db",
  },
});

export default WhyChooseUs;
