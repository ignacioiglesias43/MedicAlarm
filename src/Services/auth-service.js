import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export default {
  signUp(email, password) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        return 'Registro exitoso';
      })
      .catch(error => {
        return error.toString();
      });
  },
  signIn(email, password) {
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return 1;
      })
      .catch(error => {
        return error;
      });
  },
  registerUser(email, password, phone, name, lastName, userType) {
    let authRegister = this.signUp(email, password);
    if (authRegister === 'Registro exitoso') {
      firestore()
        .collection('users')
        .add({
          email: email,
          last_name: lastName,
          name: name,
          phone: phone,
          type: userType,
        })
        .then(() => {
          return 'Registro exitoso';
        })
        .catch(error => {
          return error;
        });
    } else {
      return authRegister;
    }
  },
  getUserType(email) {
    return firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(data => {
        console.log(data.docs[0]._data.type); //Así se obtiene el tipo de usuario
      })
      .catch(error => {
        console.log(error);
      });
  },
  logOut() {
    return auth()
      .signOut()
      .then(() => {
        console.log('sign-out');
      })
      .catch(error => {
        console.log(error);
      });
  },
};
