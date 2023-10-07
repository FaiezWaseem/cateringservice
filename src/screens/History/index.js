import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Colors
} from 'react-native-ui-lib';
import { FlatList } from 'react-native';
import Screen from '../../utils/Screens';

export default ({ navigation }) => {
  const [items, setItem] = React.useState([])
  return <View flex marginT-30 onLayout={() => {
    setItem([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
  }} >
    <Text marginL-10 text30 orange >History</Text>
    <FlatList
      data={items}
      renderItem={({ item }) => <HistoryCard navigation={navigation} />}
    />
  </View>
}

const HistoryCard = ({ navigation }) => {
  return <View
    padding-10
    borderRadius={8}
    backgroundColor={Colors.white}>
    <Image
      source={{
        uri: 'https://raw.githubusercontent.com/FaiezWaseem/food-recipe/master/src/assets/images/recipes/spagetti.png',
      }}
      style={{
        width: '100%',
        height: 200,
        borderRadius: 8
      }}
    />
    <View row>
      <Text style={{ fontFamily: 'Poppin-Medium' }}>Order# </Text>
      <Text style={{ fontFamily: 'Poppin-Regular' }}>x11-4k6kl</Text>
    </View>
    <View row style={{ justifyContent: 'space-between' }}>
      <View row>
        <Text style={{ fontFamily: 'Poppin-Medium' }}>Order Date: </Text>
        <Text style={{ fontFamily: 'Poppin-Regular' }}>21/9/23</Text>
      </View>
      <View row>
        <Text style={{ fontFamily: 'Poppin-Medium' }}>Bill : </Text>
        <Text style={{ fontFamily: 'Poppin-Regular' }}>100$</Text>
      </View>
    </View>
    <View row>
      <Text style={{ fontFamily: 'Poppin-Medium' }}>Order Status: </Text>
      <Text style={{ fontFamily: 'Poppin-Regular' }}>Approve</Text>
    </View>
    <View row>
      <Text style={{ fontFamily: 'Poppin-Medium' }}>Caterar : </Text>
      <Text style={{ fontFamily: 'Poppin-Regular' }}>Papa Jhons</Text>
    </View>
    <View row>
      <Text style={{ fontFamily: 'Poppin-Medium' }}>Address : </Text>
      <Text style={{ fontFamily: 'Poppin-Regular' }}>
        101 arch Street Boston , USA
      </Text>
    </View>
    <View row>
      <Text style={{ fontFamily: 'Poppin-Medium' }}>
        Delivery Date :{' '}
      </Text>
      <Text style={{ fontFamily: 'Poppin-Regular' }}>23/9/23</Text>
    </View>
    <View row>
      <Text style={{ fontFamily: 'Poppin-Medium' }}>Delivery : </Text>
      <Text style={{ fontFamily: 'Poppin-Regular' }}>20$</Text>
    </View>
    <View row>
      <Text style={{ fontFamily: 'Poppin-Medium' }}>Total Amount : </Text>
      <Text style={{ fontFamily: 'Poppin-Regular' }}>120$</Text>
    </View>
    <View row spread >
      <Button label='reorder' bg-orange ></Button>
      <Button label='Give feedback' bg-orange onPress={() => {
        navigation.push(Screen.REVIEW)
      }} ></Button>
    </View>
  </View>
}