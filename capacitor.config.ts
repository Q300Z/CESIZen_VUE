import type {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'local.cesi.cesizen',
  appName: 'CESIZen',
  webDir: 'dist',
  android: {
    adjustMarginsForEdgeToEdge: 'auto',
  }
};

export default config;
