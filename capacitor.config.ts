import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'react-seminari8-ea',
  webDir: 'build',
  server: {
    url: 'http://192.168.0.19:3000',
    cleartext: true
  }
};

export default config;
