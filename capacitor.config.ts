
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f6a7ed333332465497fde4b3f2cad9c2',
  appName: 'sadaqah-rewards-hub',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    url: 'https://f6a7ed33-3332-4654-97fd-e4b3f2cad9c2.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#16a34a",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#ffffff"
    },
    StatusBar: {
      style: 'dark'
    }
  }
};

export default config;
