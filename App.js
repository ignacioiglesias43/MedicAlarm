import React from 'react';
import Login from './src/Views/Login';
import Home from './src/Views/Home';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

const App: () => React$Node = () => {
  return (
    <>
      <PaperProvider>
        <Home />
      </PaperProvider>
    </>
  );
};

export default App;
