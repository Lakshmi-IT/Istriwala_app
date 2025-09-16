


// import React, { useEffect, useState } from "react";
// import { Platform, Text, View } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
// } from "@react-navigation/drawer";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// // import Ionicons from "react-native-vector-icons/Ionicons";
// import { Ionicons } from '@expo/vector-icons';
// import { StatusBar } from "expo-status-bar";
// import Toast from "react-native-toast-message";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Custom components
// import Header from "./components/Header";
// import FirstSplash from "./components/FirstSplash";
// import SecondSplash from "./components/SecondSplash";

// // Screens
// import HomeScreen from "./screens/HomeScreen";
// import PlaceOrderScreen from "./screens/PlaceOrderScreen";
// import ProfileScreen from "./screens/ProfileScreen";
// import MyOrdersScreen from "./screens/MyOrdersScreen";
// import ContactsScreen from "./screens/ContactsScreen";
// import PriceScreen from "./screens/PriceScreen";
// import AboutScreen from "./screens/AboutScreen";
// import PrivacyPolicyScreen from "./screens/PrivacyPolicyScreen";
// import TermsandConditionScreen from "./screens/TermsandConditionScreen";

// const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();

// // -------------------- Home Stack --------------------
// function HomeStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="HomeMain" component={HomeScreen} />
//       <Stack.Screen name="PriceScreen" component={PriceScreen} />
//     </Stack.Navigator>
//   );
// }

// // -------------------- Bottom Tabs --------------------
// function BottomTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarIcon: ({ color, size }) => {
//           let iconName;
//           if (route.name === "Home") iconName = "home-outline";
//           else if (route.name === "Place Order") iconName = "cube-outline";
//           else if (route.name === "My Orders") iconName = "cart-outline";
//           else if (route.name === "Help") iconName = "help-circle-outline";
//           else if (route.name === "Profile") iconName = "person-outline";
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "#2563eb",
//         tabBarInactiveTintColor: "#000000",
//         tabBarStyle: {
//           height: 100,
//           paddingBottom: 10,
//           paddingTop: 5,
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeStack} />
//       <Tab.Screen name="Place Order" component={PlaceOrderScreen} />
//       <Tab.Screen name="My Orders" component={MyOrdersScreen} />
//       <Tab.Screen name="Help" component={ContactsScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// }

// // -------------------- Custom Drawer --------------------
// function CustomDrawerContent(props) {
//   const [mobile, setMobile] = useState("");
//   const [name, setName] = useState("");

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const storedMobile = await AsyncStorage.getItem("mobile");
//         const storedName = await AsyncStorage.getItem("name");

//         if (storedMobile) setMobile(storedMobile);
//         if (storedName) setName(storedName);
//       } catch (error) {
//         console.error("Error fetching AsyncStorage data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <DrawerContentScrollView {...props}>
//       <View
//         style={{
//           backgroundColor: "#042048",
//           padding: 20,
//           borderRadius: 10,
//           flexDirection: "row",
//           width: "100%",
//           gap: 15,
//           marginBottom: 20,
//           alignItems: "center",
//         }}
//       >
//         <Ionicons
//           name="person-circle-outline"
//           size={60}
//           color="#fff"
//           style={{ marginBottom: 10 }}
//         />
//         <View>
//           <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
//             Welcome {name}!
//           </Text>
//           <Text style={{ color: "#fff", fontSize: 12 }}>{mobile}</Text>
//         </View>
//       </View>

//       <DrawerItemList {...props} />
//     </DrawerContentScrollView>
//   );
// }

// // -------------------- App --------------------
// export default function App() {
//   const [showFirstSplash, setShowFirstSplash] = useState(true);
//   const [showSecondSplash, setShowSecondSplash] = useState(false);

//   useEffect(() => {
//     // First splash for 1s
//     const firstTimer = setTimeout(() => {
//       setShowFirstSplash(false);
//       setShowSecondSplash(true);
//     }, 1000);

//     // Second splash for 2s
//     const secondTimer = setTimeout(() => {
//       setShowSecondSplash(false);
//     }, 2000); // 1s + 2s

//     return () => {
//       clearTimeout(firstTimer);
//       clearTimeout(secondTimer);
//     };
//   }, []);

//   if (showFirstSplash) return <FirstSplash />;
//   if (showSecondSplash) return <SecondSplash />;

//   return (
//     <NavigationContainer>
//       <Drawer.Navigator
//         drawerContent={(props) => <CustomDrawerContent {...props} />}
//         screenOptions={{
//           header: ({ navigation }) => (
//             <View>
//               <StatusBar translucent backgroundColor="#fff" style="dark" />
//               <View
//                 style={{
//                   height:
//                     Platform.OS === "android" ? StatusBar.currentHeight : 44,
//                   backgroundColor: "#fff",
//                 }}
//               />
//               <Header onMenuPress={() => navigation.openDrawer()} />
//             </View>
//           ),
//           drawerActiveTintColor: "#2563eb",
//           drawerInactiveTintColor: "#000",
//           drawerLabelStyle: { fontSize: 15, fontWeight: "600" },
//         }}
//       >
//         <Drawer.Screen
//           name="MainDrawer"
//           component={BottomTabs}
//           options={{
//             drawerLabel: "Home",
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="home-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="AboutUs"
//           component={AboutScreen}
//           options={{
//             drawerLabel: "About Us",
//             drawerIcon: ({ color, size }) => (
//               <Ionicons
//                 name="information-circle-outline"
//                 size={size}
//                 color={color}
//               />
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="ProfileDrawer"
//           component={ProfileScreen}
//           options={{
//             drawerLabel: "Profile",
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="person-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="PlaceOrder"
//           component={PlaceOrderScreen}
//           options={{
//             drawerLabel: "Place Order",
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="cart-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="OrdersDrawer"
//           component={MyOrdersScreen}
//           options={{
//             drawerLabel: "My Orders",
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="cart-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="PriceList"
//           component={PriceScreen}
//           options={{
//             drawerLabel: "Price List",
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="cash-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="HelpDrawer"
//           component={ContactsScreen}
//           options={{
//             drawerLabel: "Help & Support",
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="help-circle-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="Privacy Policy"
//           component={PrivacyPolicyScreen}
//           options={{
//             drawerLabel: "Privacy Policy",
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="document-text-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="Tearms and conditions"
//           component={TermsandConditionScreen}
//           options={{
//             drawerLabel: "Terms and conditions",
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="reader-outline" size={size} color={color} />
//             ),
//           }}
//         />
//       </Drawer.Navigator>
//       <Toast />
//     </NavigationContainer>
//   );
// }


import React, { useEffect, useState } from "react";
import { Platform, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Custom components
import Header from "./components/Header";
import FirstSplash from "./components/FirstSplash";
import SecondSplash from "./components/SecondSplash";

// Screens
import HomeScreen from "./screens/HomeScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MyOrdersScreen from "./screens/MyOrdersScreen";
import ContactsScreen from "./screens/ContactsScreen";
import PriceScreen from "./screens/PriceScreen";
import AboutScreen from "./screens/AboutScreen";
import PrivacyPolicyScreen from "./screens/PrivacyPolicyScreen";
import TermsandConditionScreen from "./screens/TermsandConditionScreen";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// -------------------- Small Image Icon component --------------------
function IconImage({ source, size = 20, tintColor, style, resizeMode = "contain" }) {
  // If you pass a remote uri object ({ uri: '...' }), tintColor will not work on Android.
  const tintStyle = tintColor ? { tintColor } : null;
  return (
    <Image
      source={source}
      style={[{ width: size, height: size, resizeMode }, tintStyle, style]}
    />
  );
}

// -------------------- Home Stack --------------------
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="PriceScreen" component={PriceScreen} />
    </Stack.Navigator>
  );
}

// helper to map route to local icons (replace with your actual paths)
const TAB_ICONS = {
  Home: {
    default: require("./assets/icons/home.png"),
    active: require("./assets/icons/home.png"),
  },
  "Place Order": {
    default: require("./assets/icons/placeorder.png"),
    active: require("./assets/icons/placeorder.png"),
  },
  "My Orders": {
    default: require("./assets/icons/orders.png"),
    active: require("./assets/icons/orders.png"),
    // active: require("./assets/icons/myorders-active.png"),

  },
  Help: {
    default: require("./assets/icons/help.png"),
    active: require("./assets/icons/help.png"),
  },
  Profile: {
    default: require("./assets/icons/profile.png"),
    active: require("./assets/icons/profile.png"),
  },
};

const DRAWER_ICONS = {
  Home: require("./assets/icons/home.png"),
  AboutUs: require("./assets/icons/about.png"),
  ProfileDrawer: require("./assets/icons/profile.png"),
  PlaceOrder: require("./assets/icons/placeorder.png"),
  OrdersDrawer: require("./assets/icons/orders.png"),
  PriceList: require("./assets/icons/money.png"),
  HelpDrawer: require("./assets/icons/help.png"),
  "Privacy Policy": require("./assets/icons/privacyplcy.png"),
  "Tearms and conditions": require("./assets/icons/tandc.png"),
};

// -------------------- Bottom Tabs --------------------
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const icons = TAB_ICONS[route.name];
          if (!icons) return null;
          // If you use separate active images, prefer them; otherwise tint the default image
          const src = focused && icons.active ? icons.active : icons.default;
          // tintColor is passed by tabBar options; if your images are full-color, do not tint
          return <IconImage source={src} size={size ?? 20} tintColor={color} />;
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
        <IconImage
          source={require("./assets/icons/profile.png")}
          size={60}
          style={{ borderRadius: 30, overflow: "hidden" }}
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
  const [showFirstSplash, setShowFirstSplash] = useState(true);
  const [showSecondSplash, setShowSecondSplash] = useState(false);

  useEffect(() => {
    // First splash for 1s
    const firstTimer = setTimeout(() => {
      setShowFirstSplash(false);
      setShowSecondSplash(true);
    }, 1000);

    // Second splash for 2s
    const secondTimer = setTimeout(() => {
      setShowSecondSplash(false);
    }, 2000); // 1s + 2s

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(secondTimer);
    };
  }, []);

  if (showFirstSplash) return <FirstSplash />;
  if (showSecondSplash) return <SecondSplash />;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation }) => ({
          header: () => (
            <View>
              <StatusBar translucent backgroundColor="#fff" style="dark" />
              <View
                style={{
                  height: Platform.OS === "android" ? StatusBar.currentHeight : 44,
                  backgroundColor: "#fff",
                }}
              />
              <Header onMenuPress={() => navigation.openDrawer()} />
            </View>
          ),
          drawerActiveTintColor: "#2563eb",
          drawerInactiveTintColor: "#000",
          drawerLabelStyle: { fontSize: 15, fontWeight: "600" },
        })}
      >
        <Drawer.Screen
          name="MainDrawer"
          component={BottomTabs}
          options={{
            drawerLabel: "Home",
            drawerIcon: ({ color, size }) => (
              <IconImage source={DRAWER_ICONS.Home} size={size ?? 20} tintColor={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="AboutUs"
          component={AboutScreen}
          options={{
            drawerLabel: "About Us",
            drawerIcon: ({ color, size }) => (
              <IconImage source={DRAWER_ICONS.AboutUs} size={size ?? 20} tintColor={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="ProfileDrawer"
          component={ProfileScreen}
          options={{
            drawerLabel: "Profile",
            drawerIcon: ({ color, size }) => (
              <IconImage source={DRAWER_ICONS.ProfileDrawer} size={size ?? 20} tintColor={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="PlaceOrder"
          component={PlaceOrderScreen}
          options={{
            drawerLabel: "Place Order",
            drawerIcon: ({ color, size }) => (
              <IconImage source={DRAWER_ICONS.PlaceOrder} size={size ?? 20} tintColor={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="OrdersDrawer"
          component={MyOrdersScreen}
          options={{
            drawerLabel: "My Orders",
            drawerIcon: ({ color, size }) => (
              <IconImage source={DRAWER_ICONS.OrdersDrawer} size={size ?? 20} tintColor={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="PriceList"
          component={PriceScreen}
          options={{
            drawerLabel: "Price List",
            drawerIcon: ({ color, size }) => (
              <IconImage source={DRAWER_ICONS.PriceList} size={size ?? 20} tintColor={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="HelpDrawer"
          component={ContactsScreen}
          options={{
            drawerLabel: "Help & Support",
            drawerIcon: ({ color, size }) => (
              <IconImage source={DRAWER_ICONS.HelpDrawer} size={size ?? 20} tintColor={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Privacy Policy"
          component={PrivacyPolicyScreen}
          options={{
            drawerLabel: "Privacy Policy",
            drawerIcon: ({ color, size }) => (
              <IconImage source={DRAWER_ICONS["Privacy Policy"]} size={size ?? 20} tintColor={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Tearms and conditions"
          component={TermsandConditionScreen}
          options={{
            drawerLabel: "Terms and conditions",
            drawerIcon: ({ color, size }) => (
              <IconImage source={DRAWER_ICONS["Tearms and conditions"]} size={size ?? 20} tintColor={color} />
            ),
          }}
        />
      </Drawer.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
