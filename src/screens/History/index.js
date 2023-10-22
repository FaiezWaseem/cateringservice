import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Colors
} from 'react-native-ui-lib';
import { FlatList } from 'react-native';
import Screen from '../../utils/Screens';
import firebase from '../../utils/firebase';
export default ({ navigation }) => {
  const [items, setItem] = useState([])
  useEffect(() => {
    firebase.on(`history/${firebase.getUid()}`, (snap) => {
      console.log(snap.val().status)
      setItem(order => [snap.val(), ...order]);
    })
  }, [])
  return <View flex marginT-30 bg-white  >
    <Text marginL-10 marginV-10 text30 orange  >History</Text>
    <FlatList
      data={items}
      renderItem={({ item }) => <HistoryCard navigation={navigation} order={item} />}
    />
  </View>
}

const HistoryCard = ({ navigation, order }) => {
  return <View
    padding-10
    borderRadius={8}
    backgroundColor={Colors.white}>
    <Image
      source={{
        uri: order?.items?.[0]?.imageUri,
      }}
      style={{
        width: '100%',
        height: 200,
        borderRadius: 8
      }}
    />
    <View row>
      <Text style={{ fontFamily: 'Poppin-Medium' }}>Order# </Text>
      <Text style={{ fontFamily: 'Poppin-Regular' }}>{order.orderId}</Text>
    </View>
    <View row style={{ justifyContent: 'space-between' }}>
      <View row>
        <Text style={{ fontFamily: 'Poppin-Medium' }}>Order Date: </Text>
        <Text style={{ fontFamily: 'Poppin-Regular' }}>{order.orderDate}</Text>
      </View>
      <View row>
        <Text style={{ fontFamily: 'Poppin-Medium' }}>Bill : </Text>
        <Text style={{ fontFamily: 'Poppin-Regular' }}>{order.total}$</Text>
      </View>
    </View>
    <View row>
      <Text style={{ fontFamily: 'Poppin-Medium' }}>Order Status: </Text>
      <Text style={{ fontFamily: 'Poppin-Regular' }}>{order.status}</Text>
    </View>
    <View row>
      <Text style={{ fontFamily: 'Poppin-Medium' }}>Caterar : </Text>
      <Text style={{ fontFamily: 'Poppin-Regular' }}>Papa Jhons</Text>
    </View>
    <View row>
      <Text style={{ fontFamily: 'Poppin-Medium' }}>Address : </Text>
      <Text style={{ fontFamily: 'Poppin-Regular' }}>
        {order?.address?.address}
      </Text>
    </View>
    <View row>
      <Text style={{ fontFamily: 'Poppin-Medium' }}>
        Delivery Date :{' '}
      </Text>
      <Text style={{ fontFamily: 'Poppin-Regular' }}>{order.dateTime}</Text>
    </View>
    <View row>
      <Text style={{ fontFamily: 'Poppin-Medium' }}>Delivery : </Text>
      <Text style={{ fontFamily: 'Poppin-Regular' }}>20$</Text>
    </View>
    <View row>
      <Text style={{ fontFamily: 'Poppin-Medium' }}>Total Amount : </Text>
      <Text style={{ fontFamily: 'Poppin-Regular' }}>{order.total}$</Text>
    </View>
    <View row spread >
      <Button label='reorder' bg-orange ></Button>
      <Button label='Give feedback' bg-orange onPress={() => {
        navigation.push(Screen.REVIEW , {
          order
        })
      }} ></Button>
    </View>
  </View>
}