import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './src/Views/Login';
import Home from './src/Views/Doctor/Home';
import Patients from './src/Views/Doctor/Patients';
import Register from './src/Views/Register';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator></Stack.Navigator> */}
      <Drawer.Navigator initialRouteName="Pacientes">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Pacientes" component={Patients} />
        <Drawer.Screen name="Registro" component={Register} />
        <Drawer.Screen name="Salir" component={Login} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
