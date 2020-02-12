import React from 'react';
import Login from './src/Views/Login';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider as PaperProvider} from 'react-native-paper';

const App: () => React$Node = () => {
  return (
    <>
      <PaperProvider>
        <Login />
      </PaperProvider>
    </>
  );
};

export default App;
