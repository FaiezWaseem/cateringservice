import { useEffect, useState } from 'react'
import { View, Button } from "react-native-ui-lib"
import SearchBar from "../../../components/SearchPlaces"
import MapCurrent from "../../../components/Map"
import getAddress from '../../../utils/reverseGeocoding'
import Screen from '../../../utils/Screens'
import db from '../../../utils/firebase'
// import firebase from 'firebase'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default ({ route, navigation }) => {
  const [latlng, setLatLng] = useState({
    latitude: 42.3600825, longitude: -71.0588801
  })
  const {
    username,
    email,
    password,
    about,
    tag,
    imageUri
  } = route.params

  const [address, setAddress] = useState(null)

  useEffect(() => {
    getAddress(latlng.latitude, latlng.longitude)
      .then(data => {
        setAddress({
          latitude: data.results[0].geometry.location.lat,
          longitude: data.results[0].geometry.location.lng,
          address: data.results[0].formatted_address,
          name: data.results[0].formatted_address,
        })
      })
    db.isAuthenticated((user) => {
      console.log(user)
      if (user) {
        navigation.replace(Screen.CATERAR_HOME)
        AsyncStorage.setItem('isCaterar', "true")
      }
    })
  }, [latlng])
  const onPress = () => {
    console.log(route.params, address, latlng)
    db.signUp(email, password, () => {
      const userid = db.getUid();
      alert(userid)
      db.fset(`user/caterar/${userid}`, {
        username,
        email,
        password,
        about,
        tag,
        imageUri,
        address
      })
      console.log('user created')
      AsyncStorage.setItem('isCaterar', "true")
      // navigation.replace(Screen.CATERAR_HOME)
    })
  }
  return <View flex marginT-30 >

    <View ptop={25} position={'absolute'} zIndex={2} width={'100%'}  >
      <SearchBar placeholder={"Delivery Address"} onSearch={(place) => {
        setLatLng({
          latitude: place.latitude,
          longitude: place.longitude
        })
        console.log(place.name)
        console.log(place.address)
        setAddress(place)
      }} />
    </View>

    <MapCurrent latlng={latlng} setLatLng={setLatLng} />

    <View pbottom={25} position={'absolute'} zIndex={2} width={'100%'} >
      <Button label='CONTINUE' bg-orange onPress={onPress} />
    </View>
  </View>
}