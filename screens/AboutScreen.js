import React from "react";
import { ScrollView, View, Text, StyleSheet, Linking } from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      {/* About Us */}
      <Text style={styles.heading}>About Us</Text>
      <Text style={styles.paragraph}>
        Istriwala is your trusted partner for hassle-free ironing and steam ironing services, right at your doorstep. 
        We make it easy for customers to schedule and book professional ironing with just a few taps.
      </Text>
      <Text style={styles.paragraph}>
        Our mission is to save your time and deliver crisp, neatly pressed clothes without the stress of doing it yourself. 
        With a focus on quality, punctuality, and customer satisfaction, Istriwala ensures your clothes are handled with care and convenience.
      </Text>
      <Text style={styles.paragraph}>
        Whether it’s your daily wear, office formals, or special outfits, Istriwala provides reliable ironing solutions to keep you looking your best—always on time, always professional.
      </Text>

      {/* About Istriwala */}
      <Text style={styles.heading}>About Istriwala</Text>
      <Text style={styles.paragraph}>
        Istriwala is a doorstep ironing and steam ironing service that brings convenience and quality to your daily life. Customers can easily book services through our mobile app and enjoy neatly pressed clothes delivered on time, every time.
      </Text>
      <Text style={styles.paragraph}>
        We are committed to delivering professional, reliable, and affordable ironing solutions, ensuring your clothes are handled with the utmost care.
      </Text>
      <Text style={styles.paragraph}>
        Istriwala is owned and operated by:
        {"\n"} MOKSHAGNA ENTERPRISES PRIVATE LIMITED
        {"\n"} CIN: U28264AP2025PTC120138
        {"\n"} Based in Vijayawada (Urban), Krishna – 520008, Andhra Pradesh, India.
      </Text>
      <Text style={styles.paragraph}>
        Our mission is to make everyday chores simpler through technology and trusted service, helping you look your best without the hassle.
      </Text>

      {/* FAQ */}
      <Text style={styles.heading}>Frequently Asked Questions (FAQ)</Text>

      <Text style={styles.subHeading}>1. What is Istriwala?</Text>
      <Text style={styles.paragraph}>
        Istriwala is a doorstep ironing and steam ironing service where customers can book services through our mobile app. 
        Our trained staff pick up your clothes, iron them with care, and deliver them back neatly pressed within the scheduled time.
      </Text>

      <Text style={styles.subHeading}>2. How does the service work?</Text>
      <Text style={styles.paragraph}>
        1. Book a Service – Select ironing or steam ironing in the app, and Book Your Order.{"\n"}
        2. Handover Clothes – Our delivery partner will collect your clothes.{"\n"}
        3. Get Freshly Ironed Clothes – Clothes will be returned within the promised time.
      </Text>

      <Text style={styles.subHeading}>3. What are your operating hours?</Text>
      <Text style={styles.paragraph}>
        Our services are available 7 days a week, from 7:00 AM to 9:00 PM. 
        You can place orders anytime through the app, and our team will process them during operating hours.
      </Text>

      <Text style={styles.subHeading}>4. What types of ironing do you offer?</Text>
      <Text style={styles.paragraph}>
        ● Regular Ironing – Clothes pressed using high-quality dry irons.{"\n"}
        ● Steam Ironing – Clothes ironed with steam to remove wrinkles more effectively and ensure fabric safety.
      </Text>

      <Text style={styles.subHeading}>5. How much does the service cost?</Text>
      <Text style={styles.paragraph}>
        ● Prices vary depending on garment type and service chosen.{"\n"}
        ● The price list is available inside the app before confirming your booking.{"\n"}
        ● No hidden charges. Taxes, if applicable, will be shown at checkout.
      </Text>

      <Text style={styles.subHeading}>6. How long does it take to return my clothes?</Text>
      <Text style={styles.paragraph}>
        ● Standard delivery: Within 24 hours (depending on order size).{"\n"}
        ● Express delivery: Same-day or within a few hours (available at extra cost).
      </Text>

      <Text style={styles.subHeading}>7. What payment methods are available?</Text>
      <Text style={styles.paragraph}>
        We accept multiple payment options for customer convenience:{"\n"}
        ● UPI (Google Pay, PhonePe, Paytm, etc.){"\n"}
        ● Debit/Credit Cards{"\n"}
        ● Net Banking{"\n"}
        ● Cash on Delivery (COD)
      </Text>

      <Text style={styles.subHeading}>8. What if my clothes get damaged or lost?</Text>
      <Text style={styles.paragraph}>
        ● Our team takes utmost care while handling clothes.{"\n"}
        ● Istriwala is not responsible for pre-existing damage, fabric defects, or color bleeding.{"\n"}
        ● In rare cases of damage or loss caused during service, our team will review the issue and provide compensation as per company policy.
      </Text>

      <Text style={styles.subHeading}>9. Do you handle delicate or special fabrics?</Text>
      <Text style={styles.paragraph}>
        Yes, but customers are requested to inform us in advance for delicate materials like silk, linen, or designer wear. We recommend steam ironing for sensitive fabrics.
      </Text>

      <Text style={styles.subHeading}>10. How do I contact customer support?</Text>
      <Text style={styles.paragraph}>
        You can contact us anytime for support, complaints, or feedback:{"\n"}
        📞 <Text style={styles.link} onPress={() => Linking.openURL("tel:+918125423366")}>+91 8125423366</Text>{"\n"}
        ✉️ <Text style={styles.link} onPress={() => Linking.openURL("mailto:istriwala3366@gmail.com")}>istriwala3366@gmail.com</Text>
      </Text>

      <Text style={styles.subHeading}>11. Is my data safe with Istriwala?</Text>
      <Text style={styles.paragraph}>
        Yes. We respect your privacy. All personal details (name, phone, address, payment info) are secured and used only for providing services. Please refer to our Privacy Policy for more details.
      </Text>

      <Text style={styles.subHeading}>12. Can I track my order?</Text>
      <Text style={styles.paragraph}>
        Yes. Once your order is placed, you can track its status (pickup, in-process, delivery) directly in the app. Notifications are sent at every stage.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 15,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
    color: "#042048",
    textAlign:"center"
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
    color: "#000",
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
    marginBottom: 10,
  },
  link: {
    color: "#2563eb",
    textDecorationLine: "underline",
  },
});
