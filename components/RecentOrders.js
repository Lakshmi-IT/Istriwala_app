// RecentOrders.js
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BASE_URL } from "../utils/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const stats = [
  { label: "Orders", value: "12", icon: "shopping-outline", bg: "#E9F4FF" },
  { label: "Spent", value: "₹1,850", icon: "currency-inr", bg: "#E6F6EF" },
  {
    label: "Savings",
    value: "₹200",
    icon: "piggy-bank-outline",
    bg: "#FFF6E5",
  },
];

const statusColors = {
  success: { bg: "#E6F6EF", text: "#2B9A57" },
  warning: { bg: "#FFF3DB", text: "#D08A00" },
  info: { bg: "#EAF6FF", text: "#1976D2" },
};

const OrderCard = ({ item }) => {
  const st = statusColors[item.statusType] || statusColors.info;
  return (
    <>
      <View style={styles.orderCard}>
        <View style={styles.orderLeft}>
          <View style={[styles.iconWrap, { backgroundColor: item.iconBg }]}>
            <Icon name="iron-outline" size={22} color="#333" />
          </View>
          <View style={{ marginLeft: 14, flex: 1 }}>
            <Text style={styles.orderId}>{item.orderId || "ORD-000"}</Text>
            <Text style={styles.orderTitle}>{"Ironing"}</Text>

            <View style={styles.statusRow}>
              <View style={[styles.statusPill, { backgroundColor: st.bg }]}>
                <Text style={[styles.statusText, { color: st.text }]}>
                  {item.orderStatus || "create Order"}
                </Text>
              </View>
              <Text style={styles.dateText}>
                {item?.createdAt
                  ? new Date(item.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.amountWrap}>
          <Text style={styles.amountText}>
            ₹{item?.cartId?.totalPrice || 0}
          </Text>
        </View>
      </View>
    </>
  );
};

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  console.log(amount, "amount");

  useFocusEffect(
    useCallback(() => {
      const fetchOrders = async () => {
        try {
          const mobile = await AsyncStorage.getItem("mobile");
          const res = await fetch(`${BASE_URL}api/orders/my-orders/${mobile}`);
          const data = await res.json();
          if (data.success) {
            setOrders(data.orders);
            setAmount(data.totalAmount);
          }
        } catch (err) {
          console.error("Failed to load orders:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }, []) // ✅ wrapped in useCallback
  );

  const canceledOrders = orders?.filter(
    (items) => items.orderStatus === "CANCELLED"
  );
  const Delivered = orders?.filter(
    (items) => items.orderStatus === "DELIVERED"
  );
  const pending = orders?.filter((items) => items.orderStatus === "PENDING");



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ padding: 5, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {orders.length > 0 && <Text style={styles.header}>Recent Orders</Text>}
        <View style={{ marginTop: 8 }}>
          {orders?.slice(0, 3).map((o, index) => (
            <OrderCard key={index} item={o} />
          ))}
        </View>

        <Text style={[styles.header, { marginTop: 28 }]}>Orders History</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 15,
          }}
        >
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View
                style={[styles.statIconWrap, { backgroundColor: "#E6F6EF" }]}
              >
                <Icon name="currency-inr" size={22} color="#333" />
              </View>
              <Text style={styles.statValue}>{amount || 0}</Text>
              <Text style={styles.statLabel}>SPENT</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View
                style={[styles.statIconWrap, { backgroundColor: "#E6F6EF" }]}
              >
                <Icon name="shopping-outline" size={22} color="#333" />
              </View>
              <Text style={styles.statValue}>{orders?.length || 0}</Text>
              <Text style={styles.statLabel}>ORDERS</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View
                style={[styles.statIconWrap, { backgroundColor: "#E6F6EF" }]}
              >
                <Icon name="truck-check-outline" size={22} color="#333" />
              </View>
              <Text style={styles.statValue}>{Delivered?.length || 0}</Text>
              <Text style={styles.statLabel}>DELIVERED</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View
                style={[styles.statIconWrap, { backgroundColor: "#E6F6EF" }]}
              >
                <Icon name="clock-outline" size={22} color="#333" />
              </View>
              <Text style={styles.statValue}>{pending?.length || 0}</Text>
              <Text style={styles.statLabel}>PENDING</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View
                style={[styles.statIconWrap, { backgroundColor: "#E6F6EF" }]}
              >
                <Icon name="cancel" size={22} color="#333" />
              </View>
              <Text style={styles.statValue}>
                {canceledOrders?.length || 0}
              </Text>
              <Text style={styles.statLabel}>CANCELLED</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const shadowStyle = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
  },
  android: {
    elevation: 6,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#121212",
    marginBottom: 0,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    ...shadowStyle,
  },
  orderLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  orderId: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  orderTitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  dateText: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  amountWrap: {
    marginLeft: 8,
  },
  amountText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  // Stats
  statsRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#fff",
    width: (width - 20 * 2 - 20) / 3, // three cards with spacing
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: "center",
    ...shadowStyle,
  },
  statIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  statLabel: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 4,
  },
});
