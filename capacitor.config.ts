import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
    CapacitorHttp: {
      enabled: true,
    },
  },
  ios: {
    contentInset: "always"
  },
  server:{
    cleartext: true,
    iosScheme: 'https',
    androidScheme: 'https',
    allowNavigation: ["*"]
  },
  appId: 'com.abcd.capacitor',
  appName: 'ionicplaygoround',
  webDir: 'build',
  bundledWebRuntime: false
};

export default config;