import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Privacy Policy */}
      <Text style={styles.heading}>Privacy Policy</Text>
      <Text style={styles.paragraph}>
        Istriwala ("we," "our," or "us") respects your privacy and is committed
        to protecting the personal information you share with us. This Privacy
        Policy explains how we collect, use, and safeguard your information when
        you use our mobile application and services.
      </Text>

      <Text style={styles.subHeading}>1. Information We Collect</Text>
      <Text style={styles.paragraph}>
        • Personal Information: Name, phone number, address, and payment details
        when you create an account or place a booking.{"\n"}• Usage Information:
        App activity, service history, and preferences to improve user
        experience.{"\n"}• Location Data: If enabled, to provide accurate pickup
        and delivery services.
      </Text>

      <Text style={styles.subHeading}>2. How We Use Your Information</Text>
      <Text style={styles.paragraph}>
        • To process and manage bookings.{"\n"}• To communicate about orders,
        offers, and updates.{"\n"}• To improve our services and user experience.
        {"\n"}• To comply with legal and regulatory requirements.
      </Text>

      <Text style={styles.subHeading}>3. Sharing of Information</Text>
      <Text style={styles.paragraph}>
        • We do not sell or rent your personal information.{"\n"}• Information
        may be shared with trusted service partners only for fulfilling your
        order.{"\n"}• We may disclose information if required by law or to
        protect the rights and safety of our users and services.
      </Text>

      <Text style={styles.subHeading}>4. Data Security</Text>
      <Text style={styles.paragraph}>
        • We use appropriate technical and organizational measures to protect
        your data from unauthorized access, loss, or misuse.{"\n"}• However, no
        method of transmission over the internet is 100% secure, and we cannot
        guarantee absolute security.
      </Text>

      <Text style={styles.subHeading}>5. User Rights</Text>
      <Text style={styles.paragraph}>
        • You can access, update, or delete your personal information from your
        account settings.{"\n"}• You may opt out of receiving promotional
        messages at any time.
      </Text>

      <Text style={styles.subHeading}>6. Children’s Privacy</Text>
      <Text style={styles.paragraph}>
        • Our services are not intended for users under the age of 13. We do not
        knowingly collect personal data from children.
      </Text>

      <Text style={styles.subHeading}>7. Changes to Privacy Policy</Text>
      <Text style={styles.paragraph}>
        • We may update this Privacy Policy from time to time. Updates will be
        posted in the app and are effective once published.
      </Text>

      <Text style={styles.subHeading}>8. Contact Us</Text>
      <Text style={styles.paragraph}>
        • If you have any questions about this Privacy Policy or our data
        practices, please contact us:{"\n"}
        📧 istriwala3366@gmail.com{"\n"}
        📞 91 8125423366
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 30,
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#042048",
    textAlign: "center",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: "#333",
  },
});
