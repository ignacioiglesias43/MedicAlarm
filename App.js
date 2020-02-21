import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  Icon,
} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
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
      <Drawer.Navigator
        initialRouteName="Inicio"
        drawerContent={props => (
          <SafeAreaView style={{flex: 1}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#afc9ff',
              }}>
              <Image
                source={require('./src/img/logo.png')}
                style={{height: 60, width: 60}}
              />
              <View style={styles.title}>
                <Text style={{fontSize: 25, color: 'white'}}>Medic</Text>
                <Text style={{fontSize: 25, color: '#FF7058'}}>Alarm</Text>
              </View>
            </View>
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          </SafeAreaView>
        )}>
        <Drawer.Screen
          name="Inicio"
          component={Home}
          icon={() => <Icon name="home" />}
        />
        <Drawer.Screen name="Pacientes" component={Patients} />
        <Drawer.Screen
          name="Salir"
          component={Login}
          options={{gestureEnabled: false}}
        />
        <Drawer.Screen
          name="Registro"
          component={Register}
          options={{
            gestureEnabled: false,
            drawerLabel: () => null,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
  },
});
