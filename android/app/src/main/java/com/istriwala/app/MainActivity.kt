package com.istriwala.app

import expo.modules.splashscreen.SplashScreenManager
import android.os.Build
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.istriwala.app.BuildConfig  // ✅ must match namespace
import expo.modules.ReactActivityDelegateWrapper

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    // Expo SplashScreen setup
    SplashScreenManager.registerOnActivity(this)
    super.onCreate(null)

    if (BuildConfig.DEBUG) {
      // Debug-only code (e.g., logging, dev tools)
    }
  }

  // Main React component name
  override fun getMainComponentName(): String = "main"

  // React Activity Delegate with New Architecture support
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return ReactActivityDelegateWrapper(
      this,
      BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, // ✅ controlled via Gradle
      object : DefaultReactActivityDelegate(
        this,
        mainComponentName,
        fabricEnabled
      ) {}
    )
  }

  // Handle Android back button behavior
  override fun invokeDefaultOnBackPressed() {
    if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
      if (!moveTaskToBack(false)) {
        super.invokeDefaultOnBackPressed()
      }
      return
    }
    super.invokeDefaultOnBackPressed()
  }
}
