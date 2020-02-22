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
import AddPatient from './src/Components/organisms/AddPatient';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
/**Descripcion: Esta funcion almacena las ventanas para agregar y ver pacientes */
function PatientsViews() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Pacientes" component={Patients} navigation />
      <Stack.Screen name="Agregar Paciente" component={AddPatient} />
    </Stack.Navigator>
  );
}
/**Descripcion: Esta funcion almacena las ventanas de Login y Registro */
function RegisterLogin() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} navigation />
      <Stack.Screen name="Registro" component={Register} />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Pacientes"
        drawerContent={props => (
          <SafeAreaView style={{flex: 1}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#afc9ff',
                padding: 10,
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
        <Stack.Screen
          name="Inicio"
          component={Home}
          icon={() => <Icon name="home" />}
        />
        <Drawer.Screen name="Pacientes" component={PatientsViews} />
        <Drawer.Screen
          name="Salir"
          component={RegisterLogin}
          options={{gestureEnabled: false}}
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
