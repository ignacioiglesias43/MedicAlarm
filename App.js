import * as React from 'react';
import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  createAppContainer,
  createSwitchNavigator,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Configuration from './src/Views/Configuration';
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
import MedicinesScreen from './src/Views/Doctor/Medicines';
import EditMedicine from './src/Components/organisms/EditMedicine';
import AddMedicine from './src/Components/organisms/AddMedicine';
/**Termina Vistas del Doctor */

/**Vistas del Paciente */
import HomePatient from './src/Views/Patient/HomePatient';
import Alarms from './src/Views/Patient/Alarms';
import AddAlarm from './src/Components/organisms/AddAlarm';
import EditAlarmScreen from './src/Components/organisms/EditAlarms';
import TrustedContact from './src/Views/Patient/TrustedContact';
import AddTrustedContact from './src/Components/organisms/AddContact';
import EditTrustedContact from './src/Components/organisms/EditContact';
import PatientAppointments from './src/Views/Patient/PatientAppointments';
import Monitoring from './src/Views/Patient/Monitoring';
import AddTrackingAlarm from './src/Components/organisms/AddTrackingAlarm';
import PatientPrescriptions from './src/Views/Patient/PatientPrescriptions';
/**Termina Vistas del Paciente */
/**Drawers */
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

/**Ventanas de DR */
/**Descripcion: Almacena las ventanas de inicio y editar datos del Dr */
function DoctorHome(userData) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        navigation
        initialParams={{data: userData}}
      />
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

/**Descripcion: Almacena las vistas de medicamentos */
function Medicines() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Medicamentos"
        component={MedicinesScreen}
        navigation
      />
      <Stack.Screen name="AddMedicine" component={AddMedicine} navigation />
      <Stack.Screen name="EditMedicine" component={EditMedicine} navigation />
    </Stack.Navigator>
  );
}
/**Termina Ventanas de DR */

/**Ventanas de todos */
/**Descripcion: Esta funcion almacena las ventanas de Login y Registro */
function AuthLogin(callBack) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        navigation
        initialParams={{callBack: callBack}}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name="Registro"
        component={Register}
        initialParams={{callBack: callBack}}
        options={{gestureEnabled: false}}
        navigation
      />
    </Stack.Navigator>
  );
}

/**Termina ventanas de todos */

/**Iinicia Ventanas de Paciente */
/**Descripcion: Almacena las ventanas de inicio y editar datos del paciente */
function PatientHome() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomePatient} navigation />
      <Stack.Screen name="EditPersonalInfo" component={MyData} />
    </Stack.Navigator>
  );
}
/**Descripcion: Almacena ventanas de Alarmas */
function AlarmViews() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Alarms" component={Alarms} navigation />
      <Stack.Screen name="AddAlarm" component={AddAlarm} />
      <Stack.Screen name="EditAlarm" component={EditAlarmScreen} />
    </Stack.Navigator>
  );
}
/**Descripcion: Almacena ventanas de Contactos de confianza */
function TrustedContactViews() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="TrustedContact"
        component={TrustedContact}
        navigation
      />
      <Stack.Screen name="AddContacto" component={AddTrustedContact} />
      <Stack.Screen name="EditContact" component={EditTrustedContact} />
    </Stack.Navigator>
  );
}

/**Descripcion: Almacena ventanas de citas médicas del paciente */
function PatientAppointmentsViews() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="PatientAppointments"
        component={PatientAppointments}
        navigation
      />
      <Stack.Screen name="EditCita" component={EditAppointment} />
    </Stack.Navigator>
  );
}

/**Descripcion: Almacena vistas de seguimiento del paciente */
function MonitoringViews() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Monitoring" component={Monitoring} navigation />
      <Stack.Screen name="AddTrackingAlarm" component={AddTrackingAlarm} />
    </Stack.Navigator>
  );
}
/**Termina Ventanas de Paciente */

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      isSignedIn: false,
    };
  }
  callBack(userData, isSignedIn) {
    this.setState({userData: userData, isSignedIn: isSignedIn});
  }
  getUserData() {
    return this.state.userData;
  }
  render() {
    return (
      <NavigationContainer>
        {this.state.isSignedIn ? (
          <>
            <Drawer.Navigator
              initialRouteName="Inicio"
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
                      <Text style={{fontSize: 25, color: '#FF7058'}}>
                        Alarm
                      </Text>
                    </View>
                  </View>
                  <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                  </DrawerContentScrollView>
                </SafeAreaView>
              )}>
              <Drawer.Screen
                name="Inicio"
                children={() => DoctorHome(this.state.userData)}
              />
              {this.state.userData.data.type === 'doctor' && (
                <>
                  <Drawer.Screen name="Pacientes" component={PatientsViews} />
                  <Drawer.Screen name="Recetas" component={Prescriptions} />
                  <Drawer.Screen name="Medicamentos" component={Medicines} />
                  <Drawer.Screen name="Citas" component={Appointments} />
                </>
              )}
              {this.state.userData.data.type === 'patient' && (
                <>
                  <Drawer.Screen name="Alarmas" component={AlarmViews} />
                  <Drawer.Screen
                    name="Contactos de Confianza"
                    component={TrustedContactViews}
                  />
                  <Drawer.Screen
                    name="Recetas"
                    component={PatientPrescriptions}
                  />
                  <Drawer.Screen
                    name="Citas"
                    component={PatientAppointmentsViews}
                  />
                  <Drawer.Screen
                    name="Seguimiento"
                    component={MonitoringViews}
                  />
                </>
              )}
              <Drawer.Screen
                name="Configuracion"
                component={Configuration}
                initialParams={{
                  callBack: this.callBack.bind(this),
                  data: this.getUserData.bind(this),
                }}
              />
            </Drawer.Navigator>
          </>
        ) : (
          AuthLogin(this.callBack.bind(this))
        )}
      </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
  },
});
