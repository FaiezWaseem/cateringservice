import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { View, Button, DateTimePicker, Dash } from 'react-native-ui-lib';
import { width } from '../../utils/DptpPixel';
import SearchBar from '../../components/SearchPlaces';
import MapCurrent from '../../components/Map';
import getAddress from '../../utils/reverseGeocoding';
import db from '../../utils/firebase'
import Screen from '../../utils/Screens';
import Cache from '../../utils/Cache';
export default ({ navigation, route }) => {
  const { total, sub_total, items } = route.params;
  const [latlng, setLatLng] = useState({
    latitude: 0, longitude: 0
  })
  const [time, setTime] = useState('')
  const [dateTime, setDatetime] = useState('')

  const [address, setAddress] = useState()

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
  }, [latlng])


  const onCheckOut = () => {
    console.log(route.params)
    console.log(address)
    console.log(time)
    console.log(dateTime)
    const orderId = db.getKey();
    const ordererId = db.getUid();
    const orderDate = db.convertTime(db.getTimeinMilli());
    const caterarId = items[0].caterarId;
    db.fset(`order/${ordererId}/${orderId}`, {
      address,
      time,
      dateTime,
      orderDate,
      orderId,
      ordererId,
      caterarId,
      items,
      total,
      sub_total,
      status: 'Pending'
    })
    db.fset(`order/${caterarId}/${orderId}`, {
      address,
      time,
      dateTime,
      orderDate,
      orderId,
      ordererId,
      caterarId,
      items,
      total,
      sub_total,
      status: 'Pending'
    })
    Cache.setSessionValue('usercart', [], Cache.JSON)
    navigation.replace(Screen.HOME)
  }


  return (
    <View flex marginT-30 >
      <View ptop={0} position={'absolute'} zIndex={2} bg-textWhite width={'100%'} >
        <View padding-10 >
          <DateTimePicker onChange={(date) => {
            const dt = new Date(date);
            alert(`${dt.getHours()}:${dt.getMinutes()}:${dt.getMilliseconds()} ${dt.toISOString()}`)
            setTime(`${dt.getHours()}:${dt.getMinutes()}:${dt.getMilliseconds()}`)
          }} title={'Select time'} placeholder={'Please Select a Delivery Time'} mode={'time'} />
          <Dash length={width(90)} thickness={0.4} />
        </View>
        <View padding-10 >
          <DateTimePicker onChange={(date) => {
            alert(date)
            setDatetime(db.convertTime(new Date(date).getTime()))
          }} title={'Select Date'} placeholder={'Please Select a Delivery date'} mode={'date'} />
          <Dash length={width(90)} thickness={0.4} />
        </View>
        <View  >
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
      </View>
      <MapCurrent latlng={latlng} setLatLng={setLatLng} />
      <View pbottom={25} position={'absolute'} zIndex={2} width={'100%'} >
        <Button label='CHECKOUT' bg-orange onPress={onCheckOut} />
      </View>

    </View>
  );
};