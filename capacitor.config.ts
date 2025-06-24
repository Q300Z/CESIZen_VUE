import type {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'local.cesi.cesizen',
  appName: 'CESIZen',
  webDir: 'dist',
  loggingBehavior: 'production',
  zoomEnabled:true,
  android: {
    adjustMarginsForEdgeToEdge: 'auto',
  }
};

export default config;
