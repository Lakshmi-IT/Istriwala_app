import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../utils/url";
import Toast from "react-native-toast-message";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const mobile = await AsyncStorage.getItem("mobile");
        if (!mobile) return;

        const res = await axios.get(`${BASE_URL}api/user/profile/${mobile}`);
        setUser(res.data.user);
        setForm(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async () => {
    // Required fields list
    const requiredFields = {
      userName: "User Name",
      mobile: "Mobile Number",
      hno: "House / Door No.",
      street: "Street",
      area: "Area",
      pincode: "Pincode",
      state: "State",
    };

    // Loop through required fields and check
    for (let key in requiredFields) {
      if (!form[key] || form[key].trim() === "") {
        Toast.show({
          type: "error",
          text1: "Required Field",
          text2: `${requiredFields[key]} is required`,
          position: "top",
        });
        return; // stop submission
      }
    }

    // Additional validation for mobile and pincode
    if (form.mobile.length !== 10) {
      Toast.show({
        type: "error",
        text1: "Invalid Mobile",
        text2: "Mobile Number must be 10 digits",
        position: "top",
      });
      return;
    }

    if (form.pincode.length !== 6) {
      Toast.show({
        type: "error",
        text1: "Invalid Pincode",
        text2: "Pincode must be 6 digits",
        position: "top",
      });
      return;
    }

    // ✅ If all validations pass → submit
    try {
      const res = await axios.post(`${BASE_URL}api/user/register`, form, {
        headers: { "Content-Type": "application/json" },
      });

      setUser(res.data);
      setIsEditing(false);
      await AsyncStorage.setItem("mobile", res?.data?.user?.mobile || "");
      await AsyncStorage.setItem("name", res?.data?.user?.userName || "");

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Profile updated successfully!",
        position: "top",
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update profile.",
        position: "top",
      });
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     console.log(BASE_URL, "BASE_URL");
  //     const res = await axios.post(`${BASE_URL}api/user/register`, form, {
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     console.log(res, "res");

  //     setUser(res.data);
  //     setIsEditing(false);
  //     await AsyncStorage.setItem("mobile", res?.data?.user?.mobile || "");
  //     await AsyncStorage.setItem("name", res?.data?.user?.userName || "");
  //     Toast.show({
  //       type: "success",
  //       text1: "Success",
  //       text2: "Profile updated successfully!",
  //       position: "top",
  //     });
  //   } catch (err) {
  //     console.log(BASE_URL, "BASE_URL");
  //     Toast.show({
  //       type: "error",
  //       text1: "Error",
  //       text2: "Failed to update profile.",
  //       position: "top",
  //     });
  //     // Alert.alert("Error", "Failed to update profile.");
  //     // console.error(err);
  //   }
  // };

  // 🌍 Autofill location using GPS + Reverse Geocoding
  const fillWithCurrentLocation = async () => {
    try {
      setLoadingLocation(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Permission Denied, Location permission is required.",
          position: "top",
        });
        // Alert.alert("Permission Denied", "Location permission is required.");
        setLoadingLocation(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = loc.coords;

      const res = await axios.get(
        `${BASE_URL}api/user/reverse-geocode?lat=${latitude}&lon=${longitude}`
      );

      const addr = res.data.address || {};
      setForm((prev) => ({
        ...prev,
        hno: addr.house_number || "",
        street: addr.road || addr.neighbourhood || "",
        area: addr.suburb || addr.village || addr.town || addr.city || "",
        pincode: addr.postcode || "",
        state: addr.state || "",
        country: addr.country || "",
        lat: latitude || 0,
        lng: longitude || 0,
      }));

      // Alert.alert("Success", "📍 Location fetched successfully!");
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Success,📍 Location fetched successfully!",
        position: "top",
      });
    } catch (error) {
      console.error("Location error:", error);
      // Alert.alert("Error", "❌ Failed to fetch location details");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error, ❌ Failed to fetch location details",
        position: "top",
      });
    } finally {
      setLoadingLocation(false);
    }
  };

  // if (!user) {
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size="large" color="#2563eb" />
  //     </View>
  //   );
  // }

  const fetchLocationFromPincode = async (pincode) => {
    try {
      const res = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = res.data[0];

      if (data.Status === "Success" && data.PostOffice?.length > 0) {
        const postOffice = data.PostOffice[0];
        console.log(postOffice, "postOffice");
        setForm((prev) => ({
          ...prev,
          area: postOffice.District || prev.area,
          state: postOffice.State || prev.state,
        }));
        Toast.show({
          type: "success",
          text1: "📍 Location detected",
          text2: `${postOffice.District}, ${postOffice.State}`,
          position: "top",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Invalid Pincode",
          text2: "Please Enter a Valid Pincode.",
          position: "top",
        });

        setForm((prev) => ({ ...prev, area: "", state: "" }));
      }
    } catch (error) {
      console.error("Pincode API error:", error);
      Toast.show({
        type: "error",
        text1: "Filed",
        text2: "Failed to fetch location from ",
        position: "top",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80} // adjust if header overlaps
    >
      <ScrollView style={styles.container}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Welcome to Your Profile</Text>
          <Text style={styles.heroSubtitle}>
            Manage your personal details, update your contact information, and
            track your activity. Keep your profile up to date for a smoother
            experience.
          </Text>
        </View>

        <View style={styles.card}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>👤 Profile Settings</Text>
            {!isEditing ? (
              <TouchableOpacity
                onPress={() => setIsEditing(true)}
                style={styles.editBtn}
              >
                <Text style={styles.editBtnText}>Edit</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setForm(user);
                  setIsEditing(false);
                }}
                style={styles.cancelBtn}
              >
                <Text style={styles.editBtnText}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* User Name + Mobile */}
          <View style={styles.row}>
            <View style={styles.field}>
              <Text style={styles.label}>User Name</Text>
              <TextInput
                style={styles.input}
                value={form?.userName || ""}
                onChangeText={(val) => handleChange("userName", val)}
                editable={isEditing}
                placeholder="Enter Your Name"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Mobile</Text>
              <TextInput
                style={styles.input}
                value={form?.mobile || ""}
                keyboardType="numeric"
                placeholder="Enter Mobile Number"
                maxLength={10}
                onChangeText={(val) =>
                  handleChange("mobile", val.replace(/\D/g, "").slice(0, 10))
                }
                editable={isEditing}
              />
            </View>
          </View>

          {/* Address Section */}
          <View style={styles.rowBetween}>
            <Text style={styles.subHeader}>Address</Text>
            {isEditing && (
              <TouchableOpacity
                onPress={fillWithCurrentLocation}
                disabled={loadingLocation}
                style={styles.locationBtn}
              >
                <Text style={styles.locationBtnText}>
                  {loadingLocation ? "Fetching..." : "Use My Location"}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* House / Street */}
          <View style={styles.row}>
            <View style={styles.field}>
              <Text style={styles.label}>House / Door No.</Text>
              <TextInput
                style={styles.input}
                value={form?.hno || ""}
                placeholder="Enter H.NO / Flat No"
                onChangeText={(val) => handleChange("hno", val)}
                editable={isEditing}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Street</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Your Street"
                value={form?.street || ""}
                onChangeText={(val) => handleChange("street", val)}
                editable={isEditing}
              />
            </View>
          </View>

          {/* Area & Pincode */}
          <View style={styles.row}>
            <View style={styles.field}>
              <Text style={styles.label}>Area</Text>
              <TextInput
                style={styles.input}
                value={form?.area || ""}
                placeholder="Enter Area"
                onChangeText={(val) => handleChange("area", val)}
                editable={isEditing}
              />
            </View>
            {/* <View style={styles.field}>
            <Text style={styles.label}>Pincode</Text>
            <TextInput
              style={styles.input}
              value={form?.pincode || ""}
              keyboardType="numeric"
              maxLength={6}
              placeholder="Enter Pincode"
              onChangeText={(val) =>
                handleChange("pincode", val.replace(/\D/g, "").slice(0, 6))
                
              }
              editable={isEditing}
            />
          </View> */}
            <View style={styles.field}>
              <Text style={styles.label}>Pincode</Text>
              <TextInput
                style={styles.input}
                value={form?.pincode || ""}
                keyboardType="numeric"
                maxLength={6}
                placeholder="Enter Pincode"
                editable={isEditing}
                onChangeText={(val) => {
                  // allow only numbers and max 6 digits
                  const numericVal = val.replace(/\D/g, "").slice(0, 6);
                  setForm({ ...form, pincode: numericVal });

                  // auto-fetch when 6 digits are entered
                  if (numericVal.length === 6) {
                    fetchLocationFromPincode(numericVal);
                  }
                }}
              />
            </View>
          </View>

          {/* State */}
          <View style={styles.field}>
            <Text style={styles.label}>State</Text>
            <TextInput
              style={styles.input}
              value={form?.state || ""}
              placeholder="Enter State"
              onChangeText={(val) => handleChange("state", val)}
              editable={isEditing}
            />
          </View>

          {/* Save Button */}
          {isEditing && (
            <TouchableOpacity onPress={handleSubmit} style={styles.saveBtn}>
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    // padding: 16,
  },
  heroSection: {
    backgroundColor: "#042048",
    padding: 24,
    alignItems: "center",
    paddingTop: 80,
    textAlign: "center",
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  heroSubtitle: { fontSize: 16, color: "#e0e7ff", textAlign: "center" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold" },

  editBtn: {
    backgroundColor: "#042048",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cancelBtn: {
    backgroundColor: "gray",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editBtnText: { color: "#fff", fontWeight: "600" },

  row: {
    flexDirection: "col",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  field: { flex: 1, marginHorizontal: 4, marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    fontSize: 14,
    color: "#000",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  subHeader: { fontSize: 16, fontWeight: "600" },

  locationBtn: {
    backgroundColor: "green",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  locationBtnText: { color: "#fff", fontWeight: "600" },

  saveBtn: {
    backgroundColor: "green",
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
  },
  saveBtnText: { color: "#fff", fontWeight: "600", textAlign: "center" },
});

export default ProfileScreen;
