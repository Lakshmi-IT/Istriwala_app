# Keep React Native classes
-keep class com.facebook.react.** { *; }
-keepclassmembers class * {
    @com.facebook.react.bridge.ReactMethod <methods>;
}

# Keep Hermes
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }

# Keep Expo modules
-keep class expo.modules.** { *; }
-keepclassmembers class expo.modules.** { *; }

# Keep RN screens/navigation
-keep class com.swmansion.** { *; }

# Ignore warnings
-dontwarn com.facebook.react.**
-dontwarn com.facebook.hermes.**
-dontwarn expo.modules.**
