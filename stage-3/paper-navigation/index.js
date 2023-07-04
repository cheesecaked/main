import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './App';
import { ScrollView } from 'react-native-gesture-handler';

export default function Main() {
  return (

    <PaperProvider>
      <App />
    </PaperProvider>
  
  );
}

AppRegistry.registerComponent(appName, () => Main);