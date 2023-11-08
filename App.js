import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // screens
import MainScreen from './src/screens/Home';
import SplashScreen from './src/screens/Splash';
import SigninScreen from './src/screens/Auth/SignIn';
import RegisterScreen from './src/screens/Auth/Register';
import MapScreen from './src/screens/Map'
import CateringView from './src/screens/CateringDetail'
import SearchScreen from './src/screens/search'
import CartScreen from './src/screens/CartScreen'
import CheckOutScreen from './src/screens/Checkout'
import EditProfile from './src/screens/EditProfile';
import Listing from './src/screens/Listing';
import History from './src/screens/History';
import Review from './src/screens/Review';
import CaterarSigin from './src/screens/Caterar/Auth/SignIn'
import CaterarRegister from './src/screens/Caterar/Auth/Register'
import CaterarHome from './src/screens/Caterar/Home/'
import CaterarCreateMenu from './src/screens/Caterar/AddMenu'
import CaterarAddress from './src/screens/Caterar/Auth/Address'
import CaterarViewOrder from './src/screens/Caterar/ViewOrder'
// screen keys
import Screen from './src/utils/Screens';

import configureDesignSystem from './src/presets';
import { useFonts } from 'expo-font';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { PermissionsAndroid } from "react-native"

const requestReadPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "File Accesss Permission",
        message:
          "This App needs File Accesses Permission In Order To Function Properly",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can Read File");
    } else {
      console.log("permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};
const requestWritePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "File Accesss Permission",
        message:
          "This App needs File Write Accesses Permission In Order To Function Properly",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can write file");
    } else {
      console.log("permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};


const Stack = createNativeStackNavigator();
// initializing  default theme Config
configureDesignSystem();


const App = () => {

  // React.useEffect(()=>{
  //   requestWritePermission();
  //   requestReadPermission();
  // },[])
  // loading fonts
  const [fontsLoaded , error] = useFonts({
    'Poppin-Bold': require('./src/assets/fonts/poppins/Poppins-Bold.ttf'),
    'Poppin-ExtraBold': require('./src/assets/fonts/poppins/Poppins-ExtraBold.ttf'),
    'Poppin-ExtraLight': require('./src/assets/fonts/poppins/Poppins-ExtraLight.ttf'),
    'Poppin-Light': require('./src/assets/fonts/poppins/Poppins-Light.ttf'),
    'Poppin-Medium': require('./src/assets/fonts/poppins/Poppins-Medium.ttf'),
    'Poppin-Regular': require('./src/assets/fonts/poppins/Poppins-Regular.ttf'),
    'Poppin-SemiBold': require('./src/assets/fonts/poppins/Poppins-SemiBold.ttf'),
    'Poppin-Thin': require('./src/assets/fonts/poppins/Poppins-Thin.ttf'),
    'Roboto-Bold': require('./src/assets/fonts/roboto/Roboto-Bold.ttf'),
    'Roboto-Light': require('./src/assets/fonts/roboto/Roboto-Light.ttf'),
    'Roboto-Medium': require('./src/assets/fonts/roboto/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./src/assets/fonts/roboto/Roboto-Regular.ttf'),
    'Roboto-Thin': require('./src/assets/fonts/roboto/Roboto-Thin.ttf'),
  });
  if(!fontsLoaded){
    return <SplashScreen />
  }
  if(error){
    alert(error)
  } 
  return (
    <SafeAreaView style={{ flex : 1}}>
      <KeyboardAvoidingView style={{ flex : 1}}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={Screen.SIGNIN}
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name={Screen.HOME} component={MainScreen} />
            <Stack.Screen name={Screen.CATERINGVIEW} component={CateringView} />
            <Stack.Screen name={Screen.SIGNIN} component={SigninScreen} />
            <Stack.Screen name={Screen.REGISTER} component={RegisterScreen} />
            <Stack.Screen name={Screen.MAP} component={MapScreen} />
            <Stack.Screen name={Screen.SEARCH} component={SearchScreen} />
            <Stack.Screen name={Screen.CART} component={CartScreen} />
            <Stack.Screen name={Screen.CHECKOUT} component={CheckOutScreen} />
            <Stack.Screen name={Screen.EDITPROFILE} component={EditProfile} />
            <Stack.Screen name={Screen.LISTING} component={Listing} />
            <Stack.Screen name={Screen.HISTORY} component={History} />
            <Stack.Screen name={Screen.REVIEW} component={Review} />
            <Stack.Screen name={Screen.CATERAR_REGISTER} component={CaterarRegister} />
            <Stack.Screen name={Screen.CATERAR_SIGNIN} component={CaterarSigin} />
            <Stack.Screen name={Screen.CATERAR_HOME} component={CaterarHome} />
            <Stack.Screen name={Screen.CATERAR_CREATE_MENU} component={CaterarCreateMenu} />
            <Stack.Screen name={Screen.CATERAR_ADDRESS} component={CaterarAddress} />
            <Stack.Screen name={Screen.CATERAR_VIEW_ORDER} component={CaterarViewOrder} />
          </Stack.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


// const App = () => <></>

export default App;
