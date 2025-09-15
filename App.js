import React, { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

// Custom Header
import Header from "./components/Header";

// Screens
import HomeScreen from "./screens/HomeScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MyOrdersScreen from "./screens/MyOrdersScreen";
import ContactsScreen from "./screens/ContactsScreen";
import PriceScreen from "./screens/PriceScreen";
import AboutScreen from "./screens/AboutScreen";
import LegalScreen from "./screens/PrivacyPolicyScreen";
import PrivacyPolicyScreen from "./screens/PrivacyPolicyScreen";
import TermsandConditionScreen from "./screens/TermsandConditionScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// -------------------- Home Stack (includes PriceScreen) --------------------
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="PriceScreen" component={PriceScreen} />
    </Stack.Navigator>
  );
}

// -------------------- Bottom Tabs --------------------
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Place Order") iconName = "cube-outline";
          else if (route.name === "My Orders") iconName = "cart-outline";
          else if (route.name === "Help") iconName = "help-circle-outline";
          else if (route.name === "Profile") iconName = "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#000000",
        tabBarStyle: {
          height: 100,
          paddingBottom: 10,
          paddingTop: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Place Order" component={PlaceOrderScreen} />
      <Tab.Screen name="My Orders" component={MyOrdersScreen} />
      <Tab.Screen name="Help" component={ContactsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// -------------------- Custom Drawer --------------------
function CustomDrawerContent(props) {
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedMobile = await AsyncStorage.getItem("mobile");
        const storedName = await AsyncStorage.getItem("name");

        console.log(name, mobile);

        if (storedMobile) setMobile(storedMobile);
        if (storedName) setName(storedName);
      } catch (error) {
        console.error("Error fetching AsyncStorage data:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          backgroundColor: "#042048",
          padding: 20,
          borderRadius: 10,
          flexDirection: "row",
          width: "100%",
          gap: 15,
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <Ionicons
          name="person-circle-outline"
          size={60}
          color="#fff"
          style={{ marginBottom: 10 }}
        />
        <View>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Welcome {name}!
          </Text>
          <Text style={{ color: "#fff", fontSize: 12 }}>{mobile}</Text>
        </View>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

// -------------------- App --------------------
export default function App() {
  // const [appIsReady, setAppIsReady] = useState(false);

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       await SplashScreen.preventAutoHideAsync();
  //       await new Promise((resolve) => setTimeout(resolve, 1000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       setAppIsReady(true);
  //     }
  //   }
  //   prepare();
  // }, []);

  // useEffect(() => {
  //   if (appIsReady) SplashScreen.hideAsync();
  // }, [appIsReady]);

  // if (!appIsReady) return null;
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Prevent splash screen from auto-hiding
        await SplashScreen.preventAutoHideAsync();

        // Simulate loading for 3 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      // Hide the splash screen once app is ready
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // Keep splash screen visible until app is ready
  if (!appIsReady) return null;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          header: ({ navigation }) => (
            <View>
              <StatusBar translucent backgroundColor="#fff" style="dark" />
              <View
                style={{
                  height:
                    Platform.OS === "android" ? StatusBar.currentHeight : 44,
                  backgroundColor: "#fff",
                }}
              />
              <Header onMenuPress={() => navigation.openDrawer()} />
            </View>
          ),
          drawerActiveTintColor: "#2563eb",
          drawerInactiveTintColor: "#000",
          drawerLabelStyle: { fontSize: 15, fontWeight: "600" },
        }}
      >
        <Drawer.Screen
          name="MainDrawer"
          component={BottomTabs}
          options={{
            drawerLabel: "Home",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="AboutUs"
          component={AboutScreen}
          options={{
            drawerLabel: "About Us",
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="information-circle-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="ProfileDrawer"
          component={ProfileScreen}
          options={{
            drawerLabel: "Profile",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="PlaceOrder"
          component={PlaceOrderScreen}
          options={{
            drawerLabel: "Place Order",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="OrdersDrawer"
          component={MyOrdersScreen}
          options={{
            drawerLabel: "My Orders",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="PriceList"
          component={PriceScreen}
          options={{
            drawerLabel: "Price List",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="cash-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="HelpDrawer"
          component={ContactsScreen}
          options={{
            drawerLabel: "Help & Support",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="help-circle-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Privacy Policy"
          component={PrivacyPolicyScreen}
          options={{
            drawerLabel: "Privacy Policy",
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="document-text-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Tearms and conditions"
          component={TermsandConditionScreen}
          options={{
            drawerLabel: "Tearms and conditions",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="reader-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
