import React from 'react';
import {
  View,
  Text,
  Button,
  Avatar,
  Colors,
  Dash,
  TouchableOpacity,
  Card,
} from 'react-native-ui-lib';
import { width, height } from '../../utils/DptpPixel';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView , Alert } from 'react-native';
import Screen from '../../utils/Screens'
import Cache from '../../utils/Cache'

const MAIN_IMAGE =
  'https://raw.githubusercontent.com/FaiezWaseem/food-recipe/master/src/assets/images/recipes/spagetti.png';

  function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }
  function removeItemAtIndex(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }
  const Total = (data) => {
    let temp = 0;
    data.map((e) => {
      const price = e.price / e.minQty;
      let sub_total = parseFloat(e.qty) * parseFloat(price);
      const current_total = parseFloat(temp + sub_total);
      temp = current_total;
    });
    return temp;
  };

export default ({ navigation }) => {
    const [items, setItems] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    let userCart = Cache.getSessionValue('usercart', Cache.JSON) || [];
    setItems(userCart);
    console.log(userCart)
  }, []);
  React.useEffect(() => {
    setTotal(Total(items));
  }, [items]);
  return (
    <View marginT-30 flex bg-textWhite>
      <View row center padding-10 style={{ justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={()=>navigation.pop()} >
          <Ionicons
            name="arrow-back-circle-outline"
            size={32}
            color={Colors.orange}
          />
        </TouchableOpacity>
        <Text style={{ fontFamily: 'Poppin-Bold' }}>Your Cart</Text>
        <View></View>
      </View>
      <ScrollView>
        <View center paddingV-10 backgroundColor={'rgba(255,146,67,0.5)'}>
          <Text
            grey10
            style={{
              fontFamily: 'Poppin-Thin',
            }}>
            Minimum Order Total of 100$
          </Text>
        </View>
        {items.map((i) => (
          <CartItem item={i} items={items} setItems={setItems} />
        ))}
      </ScrollView>
      <Card
        width={'100%'}
        height={height(25)}
        style={{
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
        }}
        backgroundColor={'rgba(255,146,67,0.5)'}>
        <View
          row
          style={{ justifyContent: 'space-between' }}
          padding-10
          marginT-5>
          <Text style={{ fontFamily: 'Roboto-Regular' }}>Sub Total</Text>
          <Text>{total}$</Text>
        </View>
        <View row style={{ justifyContent: 'space-between' }} padding-10>
          <Text style={{ fontFamily: 'Roboto-Regular' }}>Delivery Fee</Text>
          <Text>20$</Text>
        </View>
        <View row style={{ justifyContent: 'space-between' }} padding-10>
          <Text style={{ fontFamily: 'Roboto-Bold' }}>Total</Text>
          <Text style={{ fontFamily: 'Roboto-Bold' }}>{total + 20}$</Text>
        </View>
        <Button label="CheckOut" bg-orange onPress={()=> {
          if(total+20 >= 100){
            navigation.push(Screen.CHECKOUT , { 
              items,
              sub_total : total ,
              total : total + 20
            })
          }
        }} />
      </Card>
    </View>
  );
};

const CartItem = ({ item , items , setItems}) => {
  const [qty, setqty] = React.useState(item?.qty);
  return (
    <Card
      pointerEvents="none"
      bg-textWhite
      margin-5
      padding-10
      elevation={4}
      row
      centerV
      onPress={() => console.log('pressed')}
      onLongPress={()=>{
        Alert.alert('Delete' , 'Are sure you want to Remove this item?' , [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => {
            const index = items.findIndex(
              (listItem) => listItem.key === item.key
            );
            const newList = removeItemAtIndex(items, index);
            setItems(newList);
            Cache.setSessionValue('usercart', newList, Cache.JSON);
          }},
        ])
      }}
      >
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
            {item?.price}$
          </Text>
          <View row>
            <TouchableOpacity
              onPress={() => {
                setqty(qty === item?.minQty ? item?.minQty : qty - 1);
                const index = items.findIndex(
                  (listItem) => listItem.key === item.key
                );
                const exists = items.find(
                  (i) => i.key === item.key
                );
                if (exists) {
                  if (item.qty > 1 &&  item?.qty !== item?.minQty) {
                    item.qty -= 1;
                    const newList = replaceItemAtIndex(items, index, item);
                    setItems(newList);
                    Cache.setSessionValue(
                      'usercart',
                      newList,
                      Cache.JSON
                    );
                  }
                }
              }}>
              <AntDesign name="minuscircle" size={20} color={Colors.orange} />
            </TouchableOpacity>
            <Text
              marginH-10
              textBlack
              text80
              style={{ fontFamily: 'Roboto-Bold' }}>
              {qty}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setqty(qty === item?.maxQty ? item?.maxQty : qty + 1);
                const index = items.findIndex(
                  (listItem) => listItem.key === item.key
                );
                const exists = items.find(
                  (i) => i.key === item.key
                );
                if (exists) {
                  if(qty !== item?.maxQty){
                    item.qty += 1;
                    const newList = replaceItemAtIndex(items, index, item);
                    setItems(newList);
                    Cache.setSessionValue('usercart', newList, Cache.JSON);
                  }
                }
              }}>
              <AntDesign name="pluscircle" size={20} color={Colors.orange} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );
};
