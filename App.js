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
/**Vistas del Doctor */
import Login from './src/Views/Login';
import Home from './src/Views/Doctor/Home';
import MyData from './src/Components/organisms/EditPersonalInfo';
import Patients from './src/Views/Doctor/Patients';
import Register from './src/Views/Register';
import AddPatient from './src/Components/organisms/AddPatient';
import PrescriptionScreen from './src/Views/Doctor/Prescriptions';
import AddPrescription from './src/Components/organisms/AddPrescription';
import EditPrescription from './src/Components/organisms/EditPrescription';
import AddAppointment from './src/Components/organisms/AddAppointment';
import AppointmentsScreen from './src/Views/Doctor/Appointments';
import EditAppointment from './src/Components/organisms/EditAppointment';
/**Termina Vistas del Doctor */

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

/**Descripcion: Almacena las ventanas de inicio y editar datos del Dr */
function DoctorHome() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} navigation />
      <Stack.Screen name="EditPersonalInfo" component={MyData} navigation />
    </Stack.Navigator>
  );
}

/**Descripcion: Esta funcion almacena las ventanas para agregar y ver pacientes */
function PatientsViews() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Pacientes" component={Patients} navigation />
      <Stack.Screen name="AddPaciente" component={AddPatient} />
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

/**Descripcion: Almacena las ventanas de recetas */
function Prescriptions() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Recetas" component={PrescriptionScreen} navigation />
      <Stack.Screen name="AddReceta" component={AddPrescription} />
      <Stack.Screen name="EditReceta" component={EditPrescription} />
    </Stack.Navigator>
  );
}

/**Descripcion: Almacena las ventanas de recetas */
function Appointments() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Citas" component={AppointmentsScreen} navigation />
      <Stack.Screen name="AddCita" component={AddAppointment} navigation />
      <Stack.Screen name="EditCita" component={EditAppointment} navigation />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
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
        <Drawer.Screen name="Inicio" component={DoctorHome} />
        <Drawer.Screen name="Pacientes" component={PatientsViews} />
        <Drawer.Screen name="Recetas" component={Prescriptions} />
        <Drawer.Screen name="Citas" component={Appointments} />
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
