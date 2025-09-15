import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";

export default function TermsandConditionScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* Terms & Conditions */}
      <Text style={styles.heading}>Terms and Conditions</Text>
      <Text style={styles.paragraph}>
        Welcome to Istriwala. By downloading, installing, or using our app and services, you agree to the following terms and conditions:
      </Text>

      <Text style={styles.subHeading}>1. Service Usage</Text>
      <Text style={styles.paragraph}>
        • Istriwala provides ironing and steam ironing services through bookings made on the app.{"\n"}
        • Customers are responsible for providing clothes in good condition and free from damage or stains.{"\n"}
        • Service availability may vary depending on location.
      </Text>

      <Text style={styles.subHeading}>2. Booking & Payments</Text>
      <Text style={styles.paragraph}>
        • All bookings must be made through the app.{"\n"}
        • Prices are displayed before confirming the order.{"\n"}
        • Payments can be made online or via other available options as shown in the app.{"\n"}
        • Once a booking is confirmed, cancellation or rescheduling may be subject to our policies.
      </Text>

      <Text style={styles.subHeading}>3. Liability</Text>
      <Text style={styles.paragraph}>
        • While we take utmost care, Istriwala is not liable for damages caused due to pre-existing wear, tear, or fabric defects.{"\n"}
        • In case of service-related issues, please contact our support team for assistance.
      </Text>

      <Text style={styles.subHeading}>4. User Responsibilities</Text>
      <Text style={styles.paragraph}>
        • Users must provide accurate contact details and pickup/delivery addresses.{"\n"}
        • Misuse of the app, fraudulent bookings, or abusive behavior may result in account suspension.
      </Text>

      <Text style={styles.subHeading}>5. Privacy</Text>
      <Text style={styles.paragraph}>
        • We value your privacy. User information is collected only for providing services and will not be shared with third parties without consent, except as required by law.
      </Text>

      <Text style={styles.subHeading}>6. Modifications</Text>
      <Text style={styles.paragraph}>
        • Istriwala reserves the right to update these terms and conditions at any time. Updates will be notified within the app.
      </Text>

      <Text style={styles.subHeading}>7. Contact Us</Text>
      <Text style={styles.paragraph}>
        • For any queries, complaints, or feedback, please contact us at:{"\n"}
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
    marginBottom:30
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#042048",
    textAlign:"center"
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
