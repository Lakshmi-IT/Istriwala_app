import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../utils/url";
import { categories } from "../utils/categories";
// import Ionicons from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useRoute } from "@react-navigation/native";

export default function OrderPage() {
  const route = useRoute();
  const { category } = route.params || {};

  const [selectedCategory, setSelectedCategory] = useState(category || "Men");
  const [selectedItem, setSelectedItem] = useState("");
  // const [qty, setQty] = useState("1");

  const [qty, setQty] = useState("1"); // actual stored quantity (number)

  const [cartData, setCartData] = useState([]);

  const [fullcartDetails, setFullcartDetails] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const navigation = useNavigation();
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  const fetchProfile = async () => {
    try {
      const mobile = await AsyncStorage.getItem("mobile");
      if (!mobile) {
        console.warn("No mobile found in storage");
        return;
      }

      const res = await axios.get(`${BASE_URL}api/user/profile/${mobile}`);
      const user = res.data.user;

      if (user) {
        const formattedAddress = {
          id: user._id,
          label: "Home",
          details: `${user.hno}, ${user.street}, ${user.area}, ${user.state} - ${user.pincode}`,
        };

        setAddress([formattedAddress]);
        setSelectedAddress(formattedAddress.id);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const fetchCart = async () => {
    try {
      const mobile = await AsyncStorage.getItem("mobile");
      if (!mobile) return;
      const res = await axios.get(`${BASE_URL}api/cart/${mobile}`);
      setFullcartDetails(res.data);
      setCartData(res.data.items || []);
      setTotalAmount(res.data.totalPrice || 0);
    } catch (err) {
      console.error(err);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );
  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  // ✅ Add to cart
  const handleAddToCart = async () => {
    if (!selectedItem) return;

    const itemData = categories[selectedCategory].find(
      (i) => i.name === selectedItem
    );
    if (!itemData) return;

    const mobile = await AsyncStorage.getItem("mobile");
    if (!mobile) {
      Toast.show({
        type: "error",
        text1: "Enter Details",
        text2: "Please add profile details first!",
        position: "top",
      });
      navigation.navigate("Profile"); // ✅ Works if ProfileScreen is in navigator
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}api/cart/add/${mobile}`, {
        item: selectedItem,
        category: selectedCategory,
        qty: parseInt(qty),
        price: itemData.price,
      });

      setCartData(res.data.cart.items);
      setFullcartDetails(res.data.cart);
      setTotalAmount(res.data.cart.totalPrice);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Cart updated successfully!",
        position: "top",
      });
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Update cart qty
  const updateCartItemBackend = async (itemId, newQty) => {
    if (newQty < 1) return;

    try {
      const mobile = await AsyncStorage.getItem("mobile");
      const response = await fetch(
        `${BASE_URL}api/cart/update-item/${mobile}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemId, qty: newQty }),
        }
      );

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();

      Toast.show({
        type: "success",
        text1: "Updated",
        text2: "Cart Item Quantity Updated!",
        position: "top",
      });

      setCartData(data.cart.items);
      setFullcartDetails(data.cart);
      setTotalAmount(data.cart.totalPrice);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Something went wrong!",
        text2: "Try Again Later!",
        position: "top",
      });
      console.error(err);
    }
  };

  const handleQuantityChange = (index, delta) => {
    setCartData((prev) => {
      if (!prev || !prev[index]) return prev; // ✅ Safety check
      const updated = [...prev];
      const newQty = updated[index].qty + delta;
      if (newQty < 1) return updated;
      updated[index].qty = newQty;

      // Call backend
      updateCartItemBackend(updated[index].item, newQty);

      return updated;
    });
  };

  // ✅ Delete cart item
  const deleteCartItem = async (itemId) => {
 
    const mobile = await AsyncStorage.getItem("mobile");
  
    try {
      const res = await axios.delete(
        `${BASE_URL}api/cart/remove-item/${mobile}`,
        { data: { itemId } }
      );
     
      if (res.status === 200) {
        Toast.show({
          type: "success",
          text1: "Deleted",
          text2: "Cart Item Deleted Successfully!",
          position: "top",
        });

        setCartData(res.data.cart.items);
        setFullcartDetails(res.data.cart);
        setTotalAmount(res.data.cart.totalPrice);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Place order
  const handlePlaceOrder = async () => {
    const mobile = await AsyncStorage.getItem("mobile");
    if (!mobile) return;

    if (paymentMethod === "cod") {
      try {
        await axios.post(`${BASE_URL}api/orders/create/${mobile}`, {
          cartId: fullcartDetails?._id,
          userId: address[0]?.id,
          paymentMethod: "COD",
        });

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Order Placed successfully!",
          position: "top",
        });
        navigation.navigate("My Orders");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const isInvalidAddress =
    !address.length ||
    !address[0].details ||
    address[0].details.replace(/undefined|,|-|\s/g, "") === "";



  const totalPrice = cartData?.reduce(
    (acc, curr) => acc + curr?.price * curr?.qty,
    0
  );



  let errorMessage = "";
  if (cartData?.length === 0) {
    errorMessage =
      "Your cart is empty. Please add items before placing an order.";
  } else if (isInvalidAddress) {
    errorMessage = "Please select a valid delivery address.";
  } else if (totalPrice < 200) {
    errorMessage = "Minimum order value is ₹200.";
  }

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
      {/* Header: Category / Item / Qty / Add to Cart */}
      <View>
        <View style={styles.cartItemsSection}>
          {/* Category */}
          <Text style={styles.heading}>Select Category</Text>
          <View style={styles.border}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(val) => setSelectedCategory(val)}
              style={{ color: "#000" }}
            >
              {Object.keys(categories).map((cat) => (
                <Picker.Item key={cat} label={cat.toUpperCase()} value={cat} />
              ))}
            </Picker>
          </View>

          {/* Item */}
          <Text style={styles.heading}>Select Item</Text>
          <View style={styles.border}>
            <Picker
              selectedValue={selectedItem}
              onValueChange={(val) => setSelectedItem(val)}
              style={{ color: "#000" }}
            >
              {(categories[selectedCategory] || categories["Men"] || []).map(
                (item) => (
                  <Picker.Item
                    key={item.name}
                    label={item.name}
                    value={item.name}
                  />
                )
              )}
            </Picker>
          </View>

          {/* Qty */}
          <Text style={styles.heading}>QTY</Text>
          {/* <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={qty}
            maxLength={3} // optional
            onChangeText={(val) => {
              // allow only digits and allow empty string while typing
              const numericOnly = val.replace(/[^0-9]/g, "");
              setQty(numericOnly);
            }}
            onBlur={() => {
              // enforce minimum when user leaves input
              if (qty === "" || qty === "0") setQty("1");
            }}
          /> */}
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={qty} // stays string
            onChangeText={(val) => {
              // allow only digits
              const numericOnly = val.replace(/[^0-9]/g, "");

              // if user deletes everything, let it be empty until blur
              setQty(numericOnly);
            }}
            onBlur={() => {
              // enforce min = 1
              if (qty === "" || parseInt(qty, 10) < 1) {
                setQty("1");
              }
            }}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="cart"
                size={20}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.buttonText}>Add to Cart</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cart Items Container */}
      <Text style={styles.itemName}>Your Cart Items</Text>
      <View style={styles.cartItemsWrapper}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
        >
          {cartData.length === 0 ? (
            <View style={{ alignItems: "center", padding: 20 }}>
              <Image
                source={require("../assets/Laundry.png")}
                style={{ width: 150, height: 150, resizeMode: "contain" }}
              />
              <Text style={{ marginTop: 10, fontSize: 16, color: "#555" }}>
                Your cart is empty
              </Text>
            </View>
          ) : (
            cartData.map((item, index) => (
              <View key={index} style={styles.cartItem}>
                <View style={styles.cartItemTop}>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text
                      style={styles.itemName}
                    >{`${item?.category} ->`}</Text>
                    <Text style={styles.itemName}>{item?.item}</Text>
                  </View>
                  <Text style={styles.itemPrice}>
                    ₹{item?.price * item?.qty}
                  </Text>
                </View>

                <View style={styles.cartItemBottom}>
                  {/* Quantity Selector */}
                  <View style={styles.qtyButtons}>
                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => handleQuantityChange(index, -1)}
                    >
                      <Text style={styles.qtyButtonText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.qtyText}>{item.qty}</Text>

                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => handleQuantityChange(index, 1)}
                    >
                      <Text style={styles.qtyButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Remove Button */}
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => deleteCartItem(item?._id)}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>

      {/* Footer: Address / Payment / Place Order */}
      <Text style={styles.heading}>Delivery Address</Text>
      {address.length > 0 ? (
        address.map((addr) => (
          <TouchableOpacity
            key={addr.id}
            onPress={() => setSelectedAddress(addr.id)}
            style={[
              styles.addressBox,
              selectedAddress === addr.id && { borderColor: "#042048" },
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={[
                  styles.radioOuter,
                  selectedAddress === addr.id && styles.radioOuterSelected,
                ]}
              >
                {selectedAddress === addr.id && (
                  <View style={styles.radioInner} />
                )}
              </View>

              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontWeight: "bold" }}>{addr.label}</Text>
                <Text>{addr.details}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <TouchableOpacity
          style={styles.addAddressButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.addAddressText}>Add Address</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.heading}>Payment Method</Text>
      {/* <TouchableOpacity onPress={() => setPaymentMethod("cod")}>
        <Text style={{ color: paymentMethod === "cod" ? "blue" : "black" }}>
          Cash on Delivery
        </Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 5,
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
        }}
        onPress={() => setPaymentMethod("cod")}
      >
        {/* Circle / Checkbox */}
        <View
          style={{
            height: 20,
            width: 20,
            borderRadius: 10, // circle
            borderWidth: 2,
            borderColor: "#042048",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          {paymentMethod === "cod" && (
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#042048",
              }}
            />
          )}
        </View>

        <Text style={{ fontSize: 16 }}>Cash on Delivery</Text>
      </TouchableOpacity>

      <Text style={styles.total}>Total: ₹{totalAmount}</Text>
      {/* <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={handlePlaceOrder}
        disabled={!!errorMessage}
        style={[
          styles.button,
          !!errorMessage && { opacity: 0.5 }, // Reduce opacity if disabled
        ]}
      >
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>

      {errorMessage && (
        <Text
          style={{ color: "red", marginTop: 5, fontSize: 12, marginBottom: 20 }}
        >
          {errorMessage}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  heading: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  input: {
    borderWidth: 1,
    color: "#000",
    padding: 15,
    marginVertical: 10,
    borderColor: "#042048",
    borderRadius: 10,
  },
  border: {
    borderWidth: 1,
    borderColor: "#042048",
    borderRadius: 10,
    marginTop: 10,
  },
  cartItemsSection: {
    backgroundColor: "#fff", // must have a bg color for shadow
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Android shadow
    elevation: 50,
  },
  cartItemsWrapper: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Android
    maxHeight: 350,
  },
  cartItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 10,
  },

  cartContainer: {
    backgroundColor: "#fff", // must have a bg color for shadow
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Android shadow
    elevation: 50,
  },

  button: {
    backgroundColor: "#042048",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: { color: "white", textAlign: "center" },
  cartItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  cartItemTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563eb",
  },

  cartItemBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  qtyButtons: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingHorizontal: 5,
  },

  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#042048",
    justifyContent: "center",
    alignItems: "center",
  },

  qtyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  qtyText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
  },

  removeButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  qtyButtons: { flexDirection: "row", alignItems: "center", gap: 10 },
  addressBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  total: { fontSize: 20, fontWeight: "bold", marginVertical: 20 },
  addressBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },

  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },

  radioOuterSelected: {
    borderColor: "#042048",
  },

  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#042048",
  },

  addAddressButton: {
    backgroundColor: "#042048",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
  },

  addAddressText: {
    color: "white",
    fontWeight: "bold",
  },
});
