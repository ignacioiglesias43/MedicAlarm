import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  NativeModules,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Configuration from './src/Views/Configuration';
/**Vistas del Doctor */
import Login from './src/Views/Login';
import ResetPassword from './src/Views/ResetPassword';
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
import Alarms from './src/Views/Patient/Alarms';
import AddAlarm from './src/Components/organisms/AddAlarm';
import EditAlarmScreen from './src/Components/organisms/EditAlarms';
import TrustedContact from './src/Views/Patient/TrustedContact';
import AddTrustedContact from './src/Components/organisms/AddContact';
import EditTrustedContact from './src/Components/organisms/EditContact';
import PatientAppointments from './src/Views/Patient/PatientAppointments';
import Monitoring from './src/Views/Patient/Monitoring';
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
function PatientsViews(userData) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Pacientes"
        component={Patients}
        navigation
        initialParams={{data: userData}}
      />
      <Stack.Screen name="AddPaciente" component={AddPatient} />
    </Stack.Navigator>
  );
}

/**Descripcion: Almacena las ventanas de recetas */
function Prescriptions(userData) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Recetas"
        component={PrescriptionScreen}
        navigation
        initialParams={{data: userData}}
      />
      <Stack.Screen name="AddReceta" component={AddPrescription} />
      <Stack.Screen name="EditReceta" component={EditPrescription} />
    </Stack.Navigator>
  );
}

/**Descripcion: Almacena las ventanas de citas */
function Appointments(userData) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Citas"
        component={AppointmentsScreen}
        initialParams={{data: userData}}
        navigation
      />
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
    <NavigationContainer>
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
          name="ResetPassword"
          component={ResetPassword}
          options={{gestureEnabled: false}}
          navigation
        />
        <Stack.Screen
          name="Registro"
          component={Register}
          initialParams={{callBack: callBack}}
          options={{gestureEnabled: false}}
          navigation
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**Termina ventanas de todos */

/**Iinicia Ventanas de Paciente */
/**Descripcion: Almacena ventanas de Alarmas */
function AlarmViews(userData) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Alarms"
        component={Alarms}
        navigation
        initialParams={{data: userData}}
      />
      <Stack.Screen name="AddAlarm" component={AddAlarm} />
      <Stack.Screen name="EditAlarm" component={EditAlarmScreen} />
    </Stack.Navigator>
  );
}
/**Descripcion: Almacena ventanas de Contactos de confianza */
function TrustedContactViews(userData) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="TrustedContact"
        component={TrustedContact}
        initialParams={{data: userData}}
        navigation
      />
      <Stack.Screen name="AddContacto" component={AddTrustedContact} />
      <Stack.Screen name="EditContact" component={EditTrustedContact} />
    </Stack.Navigator>
  );
}

/**Descripcion: Almacena ventanas de citas médicas del paciente */
function PatientAppointmentsViews(userData) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="PatientAppointments"
        component={PatientAppointments}
        navigation
        initialParams={{data: userData}}
      />
    </Stack.Navigator>
  );
}

/**Descripcion: Almacena vistas de seguimiento del paciente */
function MonitoringViews(userData) {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Monitoring"
        component={Monitoring}
        navigation
        initialParams={{data: userData}}
      />
    </Stack.Navigator>
  );
}
/**Termina Ventanas de Paciente */
const sendDirectSms = async (phone, message) => {
  const DirectSms = NativeModules.DirectSms;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      {
        title: 'MedicAlarm SMS Permission',
        message:
          'MedicAlarm necesita acceder a sus mensajes ' +
          'para poder avisar a sus contactos de confianza.',
        buttonNegative: 'Cancelar',
        buttonPositive: 'Aceptar',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      DirectSms.sendDirectSms(phone, message);
    } else {
      console.log('SMS permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
/* const requestPermissions = async => {
  try {
    const granted = await PermissionsAndroid.requestMultiple()
  } catch (e) {}
}; */
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      isSignedIn: false,
      visible: true,
    };
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log('TOKEN:', token);
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification.userInfo.trustedContact);
        if (notification.action === 'Listo') {
          //TODO: Generar nueva alarma para dar continuidad
          console.log(notification.notificationId);
          PushNotification.clearLocalNotification(notification.notificationId);
        } else if (notification.action === 'Posponer') {
          if (notification.userInfo.monitoring) {
            sendDirectSms(
              notification.userInfo.trustedContact.phone,
              `MedicAlarm: ${
                notification.userInfo.user.data.name
              } olvidó tomar su medicamento`,
            );
            ToastAndroid.showWithGravity(
              'Se avisará a su contacto de confianza.',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
          PushNotification.clearLocalNotification(notification.notificationId);
          PushNotification.localNotificationSchedule({
            title: 'Continuar con su tratamiento',
            userInfo: {
              user: notification.userInfo.user,
              trustedContact: notification.userInfo.trustedContact,
              monitoring: notification.userInfo.monitoring,
              subject: notification.userInfo.subject,
              frequency: notification.userInfo.frequency,
            },
            color: 'red',
            ongoing: true,
            vibration: 300,
            autoCancel: false,
            importance: 'max',
            actions: '["Listo", "Posponer"]',
            message: notification.message,
            soundName: 'clock.mp3',
            date: new Date(Date.now() + 300000), //Cada 5 minutos
          });
        }
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }
  componentDidMount() {
    // PushNotification.cancelAllLocalNotifications();
  }
  callBack(userData, isSignedIn) {
    this.setState({
      userData: userData,
      isSignedIn: isSignedIn,
    });
  }
  getUserData() {
    return this.state.userData;
  }
  render() {
    return this.state.isSignedIn ? (
      <NavigationContainer>
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
                  <Text
                    style={{
                      fontSize: 25,
                      color: 'white',
                    }}>
                    Medic
                  </Text>
                  <Text
                    style={{
                      fontSize: 25,
                      color: '#FF7058',
                    }}>
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
              <Drawer.Screen
                name="Pacientes"
                children={() => PatientsViews(this.state.userData)}
              />
              <Drawer.Screen
                name="Recetas"
                children={() => Prescriptions(this.state.userData)}
              />
              <Drawer.Screen name="Medicamentos" component={Medicines} />
              <Drawer.Screen
                name="Citas"
                children={() => Appointments(this.state.userData)}
              />
            </>
          )}
          {this.state.userData.data.type === 'patient' && (
            <>
              <Drawer.Screen
                name="Alarmas"
                children={() => AlarmViews(this.state.userData)}
              />
              <Drawer.Screen
                name="Contactos de Confianza"
                children={() => TrustedContactViews(this.state.userData)}
              />
              <Drawer.Screen
                name="Recetas"
                component={PatientPrescriptions}
                initialParams={{
                  data: this.state.userData,
                }}
              />
              <Drawer.Screen
                name="Citas"
                children={() => PatientAppointmentsViews(this.state.userData)}
              />
              <Drawer.Screen
                name="Seguimiento"
                children={() => MonitoringViews(this.state.userData)}
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
      </NavigationContainer>
    ) : (
      AuthLogin(this.callBack.bind(this))
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
