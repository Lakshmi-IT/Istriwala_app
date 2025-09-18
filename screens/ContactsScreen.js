import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";

const ContactScreen = () => {
  const serviceAreas = [
    "Currency Nagar Vijayawada",
    "Beside CSR Kalyanamandapam, Tadepalli, Guntur District.",
  ];

  const faqs = [
    {
      question: "What is your turnaround time?",
      answer:
        "Our standard turnaround time is 24-48 hours for regular washing and ironing. Dry cleaning may take up to 72 hours depending on the garment type.",
    },
    {
      question: "Do you offer same-day service?",
      answer:
        "Yes, we offer same-day service for urgent requirements with a small additional charge. Please call us before 10 AM for same-day pickup and delivery.",
    },
    {
      question: "How do you handle delicate fabrics?",
      answer:
        "We have specialized processes for delicate fabrics including silk, wool, and designer garments. Our trained professionals ensure proper care for each fabric type.",
    },
    {
      question: "What if my clothes get damaged?",
      answer:
        "We take full responsibility for any damage caused during our service. We offer compensation or replacement as per our service guarantee policy.",
    },
  ];

  // Replace icons with local images (place these PNGs in ../assets/icons/)
  const stats = [
    { src: require("../assets/icons/happyCustomers.png"), number: "5000+", label: "Happy Customers" },
    { src: require("../assets/icons/timeline.png"), number: "24-48hrs", label: "Turnaround Time" },
    { src: require("../assets/icons/satisfaction.png"), number: "99%", label: "Satisfaction Rate" },
    { src: require("../assets/icons/whiteLocation.png"), number: "25+", label: "Service Areas" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Contact Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Contact Us</Text>
        <Text style={styles.heroSubtitle}>
          Get in touch with Andra Pradesh most trusted Ironing service. We're here to help with all your clothing care needs.
        </Text>
      </View>

      {/* Service Areas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Areas</Text>
        <Text style={styles.sectionSubtitle}>
          We currently serve these areas in Andra Pradesh with free pickup and delivery
        </Text>

        {serviceAreas.map((area, index) => (
          <View key={index} style={styles.card}>
            <Image
              source={require("../assets/icons/bluelocation.png")}
              style={{ width: 22, height: 22, resizeMode: "contain" }}
            />
            <Text style={styles.cardText}>{area}</Text>
          </View>
        ))}
      </View>

      {/* FAQs */}
      <View style={[styles.section, { backgroundColor: "#f9fafb" }]}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <Text style={styles.sectionSubtitle}>
          Quick answers to common questions about our Ironing services
        </Text>

        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqCard}>
            <Text style={styles.faqQuestion}>{faq.question}</Text>
            <Text style={styles.faqAnswer}>{faq.answer}</Text>
          </View>
        ))}
      </View>

      {/* Stats */}
      <View style={styles.section}>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <View style={styles.iconCircle}>
                <Image
                  source={stat.src}
                  style={styles.statIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.statNumber}>{stat.number}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  heroSection: {
    backgroundColor: "#042048",
    padding: 24,
    alignItems: "center",
    paddingTop: 80,
  },
  heroTitle: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  heroSubtitle: { fontSize: 16, color: "#e0e7ff", textAlign: "center" },

  section: { padding: 20 },
  sectionTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 8, textAlign: "center" },
  sectionSubtitle: { fontSize: 14, color: "black", marginBottom: 16, textAlign: "center" },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardText: { marginLeft: 8, fontSize: 16 },

  faqCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  faqQuestion: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  faqAnswer: { fontSize: 14, color: "black", lineHeight: 20 },

  statsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  statItem: { width: "45%", alignItems: "center", marginBottom: 20 },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#042048",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    overflow: "hidden",
  },
  statIcon: {
    width: 26,
    height: 26,
    tintColor: "#fff", // optional: will tint monochrome PNGs; remove if your images are colored
  },
  statNumber: { fontSize: 20, fontWeight: "bold", color: "#042048" },
  statLabel: { fontSize: 14, color: "#042048", textAlign: "center" },
});

export default ContactScreen;
