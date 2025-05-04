import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'local.cesi.cesizen',
  appName: 'CESIZen',
  webDir: 'dist',
  android: {
    adjustMarginsForEdgeToEdge: 'auto',
  },
  server: {
    cleartext: true,
    androidScheme: 'http',
  },
};

export default config;
