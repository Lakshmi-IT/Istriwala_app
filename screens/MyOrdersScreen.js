import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../utils/url";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Alert } from "react-native";

import { useCallback } from "react";

export default function YourOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchOrders = async () => {
        try {
          const mobile = await AsyncStorage.getItem("mobile");
          const res = await fetch(`${BASE_URL}api/orders/my-orders/${mobile}`);
          const data = await res.json();
          if (data.success) {
            setOrders(data.orders);
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

  const handleCancelOrder = async (orderId) => {
    try {
      // Optional: show a loading state if needed
      const response = await fetch(`${BASE_URL}api/orders/cancel/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response, "response");

      const data = await response.json();

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Deleted",
          text2: "Cart Item Deleted Successfully!",
          position: "top",
        });

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, orderStatus: "CANCELLED" }
              : order
          )
        );
        // setOrders(data.orders);
      } else {
        alert("Failed to cancel order.");
      }
    } catch (error) {
      alert("Something went wrong. Try again!");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Orders</Text>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.noOrders}>You have no orders yet.</Text>

          <TouchableOpacity
            style={styles.placeOrderBtn}
            onPress={() => navigation.navigate("Place Order")} // 👈 update with your screen name
          >
            <Text style={styles.placeOrderText}>
              Click Here to Place an Order
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        orders.map((order) => (
          <View key={order._id} style={styles.orderCard}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.orderId}>Order #{order?.orderId}</Text>
              <View>
                <Text
                  style={[styles.status, getStatusStyle(order?.orderStatus)]}
                >
                  {order.orderStatus === "PENDING" &&
                    "Istriwala is processing your order"}
                  {order.orderStatus === "PICKED_UP" && "Picked Up"}
                  {order.orderStatus === "CANCELLED" && "CANCELLED"}
                  {order.orderStatus === "DELIVERED" && "Delivered"}
                </Text>
                {/* {order?.orderStatus === "PENDING" && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#ef4444",
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      width: "100%",
                      borderRadius: 8,
                      marginTop: 12,
                      alignItems: "center",
                    }}
                    onPress={() => handleCancelOrder(order._id)} // ✅ wrap in arrow function
                  >
                    <Text style={{ color: "#fff", fontWeight: "600" }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                )} */}
                {order?.orderStatus === "PENDING" && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#ef4444",
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      width: "100%",
                      borderRadius: 8,
                      marginTop: 12,
                      alignItems: "center",
                    }}
                    onPress={() => {
                      Alert.alert(
                        "Cancel Order",
                        "Are you sure you want to cancel this order?",
                        [
                          { text: "No", style: "cancel" },
                          {
                            text: "Yes",
                            onPress: () => handleCancelOrder(order._id),
                            style: "destructive",
                          },
                        ]
                      );
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "600" }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Payment & IDs */}
            <Text style={styles.text}>
              Payment: {order.paymentMethod}{" "}
              {order.paymentId ? `(ID: ${order.paymentId})` : ""}
            </Text>
            <Text style={styles.text}>
              Total Price: ₹{order?.cartId?.totalPrice}
            </Text>
            <Text style={styles.text}>
              Pickup ID: <Text style={styles.bold}>{order?.pickupId}</Text>
            </Text>
            <Text style={styles.text}>
              Delivery ID: <Text style={styles.bold}>{order?.deliveryId}</Text>
            </Text>
            <Text style={styles.text}>
              Date: {new Date(order.createdAt).toLocaleString()}
            </Text>

            {/* Items */}
            <View style={{ marginTop: 10 }}>
              <Text style={styles.subtitle}>Items:</Text>
              {Object.entries(
                order?.cartId?.items?.reduce((acc, item) => {
                  if (!acc[item.category]) acc[item.category] = [];
                  acc[item.category].push(item);
                  return acc;
                }, {})
              ).map(([category, items]) => (
                <View key={category} style={{ marginBottom: 8 }}>
                  <Text style={styles.category}>{category}</Text>
                  {items.map((item, idx) => (
                    <Text key={idx} style={styles.itemText}>
                      {item.item} ₹{item?.price} × {item.qty} = ₹
                      {item.price * item.qty}
                    </Text>
                  ))}
                </View>
              ))}
            </View>

            {/* Address */}
            {order.addressId && (
              <View style={{ marginTop: 10 }}>
                <Text style={styles.subtitle}>Delivery Address:</Text>
                <Text style={styles.text}>
                  {order.addressId.street}, {order.addressId.city},{" "}
                  {order.addressId.state} - {order.addressId.pincode}
                </Text>
              </View>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f3f3f3",
    marginTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  noOrders: {
    textAlign: "center",
    color: "#555",
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  orderId: {
    fontWeight: "600",
    fontSize: 16,
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  bold: {
    fontWeight: "600",
  },
  subtitle: {
    fontWeight: "600",
    marginBottom: 4,
  },
  category: {
    fontWeight: "700",
    borderBottomWidth: 1,
    borderBottomColor: "#6d6d6eff",
    marginBottom: 2,
    color: "#B8860B",
  },
  itemText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noOrders: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 20,
  },
  placeOrderBtn: {
    backgroundColor: "#042048", // purple like the UI
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  placeOrderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

// Helper for status colors
const getStatusStyle = (status) => {
  switch (status) {
    case "PENDING":
      return { backgroundColor: "#f9e741ff", color: "#042048" };
    case "CANCELLED":
      return { backgroundColor: "#e05c1eff", color: "#f2f4f6ff" };
    case "PICKED_UP":
      return { backgroundColor: "#FFECB3", color: "#F57C00" };
    case "DELIVERED":
      return { backgroundColor: "#d2f7d3ff", color: "#2E7D32" };
    default:
      return {};
  }
};
