import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, push, set, update, remove, onChildAdded  , onValue} from 'firebase/database';
import { Alert } from 'react-native';
import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId, measurementId } from '@env';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

class Database {
  constructor() {
    const firebaseConfig = {
      apiKey,
      authDomain,
      databaseURL,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
      measurementId,
    };
   this.app = initializeApp(firebaseConfig)
  //  const auth = initializeAuth(firebaseConfig, {
  //   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  // });
  }

  getUid() {
    try {
      const user = getAuth().currentUser;
      return user ? user.uid : null;
    } catch (err) {
      return null;
    }
  }

  isAuthenticated(callback) {
    onAuthStateChanged(getAuth(), callback);
  }

  signIn(email, pass) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
      .then(() => {
        Alert.alert('Login', 'Login Successful');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  }

  signOut() {
    const auth = getAuth();
    signOut(auth);
  }

  signUp(email, pass, callback , errorCallback) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass)
      .then(callback)
      .catch((error) => {
        Alert.alert('Error', error.message);
        errorCallback(error.message)
      });
  }

  fb(path) {
    return getDatabase();
  }

  getKey() {
    return push(ref(getDatabase(), 'store')).key
  }

  update(path, value) {
    update(ref(getDatabase(), path), value);
  }

  on(path, callback) {
    onChildAdded(ref(getDatabase(), path), callback);
  }
  onValue(path, callback) {
    onValue(ref(getDatabase(), path), callback);
  }

  add(path, task) {
    push(ref(getDatabase(), path), task)
  }

  fset(path, task) {
    set(ref(getDatabase(), path), task);
  }

  dlt(path, id) {
    remove(ref(getDatabase(), `${path}/${id}`));
  }

  convertTime(time) {
    const d = new Date(time);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const output = `${d.getDate()}/${months[d.getMonth()]}/${d.getFullYear()}`;
    return output;
  }

  convertTime2(time) {
    const d = new Date(time);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const output = `${d.getFullYear()}/${months[d.getMonth()]}/${d.getDate()}`;
    return output;
  }

  getTimeinMilli() {
    const d = new Date();
    return d.getTime();
  }
}

export default new Database();