import * as React from 'react';
import {
  View,
  Text,
  Image,
  Colors,
  Card,
  TouchableOpacity,
  Button
} from 'react-native-ui-lib';
import { ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { height } from '../../utils/DptpPixel';
import { ToastAndroid } from 'react-native';
import db from '../../utils/firebase'
import Cache from '../../utils/Cache'

export default function ({ navigation, route }) {
  const { caterar } = route.params;
  const [menuItems, setMenu] = React.useState([])
  React.useEffect(() => {
    db.on(`menu/${caterar.key}/`, (snap) => {
      setMenu(item => [snap.val(), ...item])
    })
  }, [])
  return (
    <View flex bg-textWhite>
      <Image
        source={{ uri: caterar?.imageUri }}
        style={{
          width: '100%',
          height: height(35),
        }}
      />
      <View
        width={'100%'}
        height={100}
        style={{
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          position: 'absolute',
          top: height(5),
        }}
        padding-10
        marginL-10
        backgroundColor={Colors.transparent}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}>
          <Ionicons
            name="arrow-back-circle-outline"
            size={32}
            color={Colors.orange}
          />
        </TouchableOpacity>
      </View>
      <View
        width={'100%'}
        height={height(72)}
        style={{
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          position: 'absolute',
          top: height(35) - 20,
        }}
        backgroundColor={Colors.textWhite}>
        <ScrollView>
          <Text textBlack text50 margin-10 marginB-20>
            {caterar?.username}
          </Text>
          <View row paddingL-10>
            <AntDesign name="star" size={24} color="gold" />
            <Text
              textBlack
              text70
              marginL-5
              marginR-10
              style={{ fontFamily: 'Roboto-Thin' }}>
              1.3k (reviews)
            </Text>
            <FontAwesome name="map-marker" size={24} color="black" />
            <Text
              textBlack
              text70
              marginL-5
              marginR-10
              style={{ fontFamily: 'Roboto-Thin' }}>
              {caterar?.address?.name}
            </Text>
          </View>
          <Text
            textBlack
            text80
            center
            marginT-10
            marginL-10
            marginR-10
            style={{ fontFamily: 'Roboto-Thin' }}>
            {caterar?.about}
          </Text>
          {menuItems.map(item => <MenuItem item={item} />)}
        </ScrollView>
      </View>
    </View>
  );
}

const MenuItem = ({ item }) => {
  const [qty, setqty] = React.useState(0);
  return (
    <Card
      pointerEvents="none"
      bg-textWhite
      margin-5
      padding-10
      elevation={4}
      row
      centerV
      onPress={() => console.log('pressed')}>
      <Card.Image
        source={{
          uri: item?.imageUri,
        }}
        style={{
          width: 100,
          height: 100,
        }}
      />
      <View w="100%" padding-5>
        <Text textBlack text80 style={{ fontFamily: 'Roboto-Bold' }}>
          {item?.title}
        </Text>
        <Text textBlack text80 style={{ fontFamily: 'Roboto-Thin' }}>
          {item?.description}
        </Text>
        <View row style={{ justifyContent: 'space-between' }} width={'70%'}>
          <Text textBlack text80 style={{ fontFamily: 'Roboto-Bold' }}>
            {item?.price}${' Min Qty :' + item?.minQty}
          </Text>
          <View row>
            <Button label='Add to Cart' bg-orange onPress={() => {
              let userCart =
                Cache.getSessionValue('usercart', Cache.JSON) || [];
              const exists = userCart.find(
                (i) => i.key === item.key
              );
              if (!exists) {
                item.qty = item.minQty
                userCart.push(item);
                Cache.setSessionValue('usercart', userCart, Cache.JSON);
                ToastAndroid.show('Added To Cart', ToastAndroid.LONG);
              } else {
                ToastAndroid.show('Already Added To Cart', ToastAndroid.LONG);
              }
            }} />
          </View>
        </View>
      </View>
    </Card>
  );
};
