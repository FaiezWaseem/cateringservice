import * as React from 'react';
import {
  View,
  Text,
  TextField,
  Card,
  TouchableOpacity,
  Colors,
} from 'react-native-ui-lib';
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Screen from '../../utils/Screens';
import db from '../../utils/firebase'

import { width } from '../../utils/DptpPixel';
const ICON_SIZE = 38;
const category = [
  {
    icon: (
      <MaterialCommunityIcons name="egg-fried" size={ICON_SIZE} color="black" />
    ),
    label: 'breakfast',
  },
  {
    icon: (
      <MaterialCommunityIcons
        name="food-steak"
        size={ICON_SIZE}
        color="black"
      />
    ),
    label: 'steak',
  },
  {
    icon: (
      <MaterialCommunityIcons name="pizza" size={ICON_SIZE} color="black" />
    ),
    label: 'Pizza',
  },
  {
    icon: (
      <MaterialCommunityIcons
        name="food-fork-drink"
        size={ICON_SIZE}
        color="black"
      />
    ),
    label: 'drinks',
  },
  {
    icon: (
      <MaterialCommunityIcons
        name="food-hot-dog"
        size={ICON_SIZE}
        color="black"
      />
    ),
    label: 'Hot Dogs',
  },
];

export default ({ navigation }) => {
  const [ Caterars , setCaterars ] = React.useState([])
  React.useEffect(()=>{
   db.on('user/caterar/' , (snap)=>{
    const caterar = snap.val();
    setCaterars( item => [ { ...caterar ,key  : snap.key} , ...item]);
   })
  },[])
  return (
    <View flex marginT-30 bg-textWhite>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View row center style={{ justifyContent: 'space-between' }}>
          <Text text50 margin-10 marginT-30 marginB-30 orange>
            Welcome Back
          </Text>
          <TouchableOpacity
            marginR-20
            onPress={() => navigation.push(Screen.CART)}>
            <FontAwesome5
              name="cart-arrow-down"
              size={24}
              color={Colors.orange}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.push(Screen.SEARCH)}>
          <View
            style={{
              backgroundColor: '#eee',
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              marginBottom: 10,
              marginHorizontal: 10,
            }}
            width={'95%'}>
            <EvilIcons name="search" size={24} color="black" />
            <Text
              style={{
                fontWeight: '600',
                color: 'grey',
                width: width(60),
              }}>
              {' '}
              Search around you
            </Text>
            <Entypo name="location-pin" size={24} color="black" />
            <Text textBlack>Nc,USA</Text>
          </View>
        </TouchableOpacity>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {category.map((i) => (
              <CategoryCard data={i} />
            ))}
          </ScrollView>
        </View>
        <View row style={{ justifyContent: 'space-between' }}>
          <Text
            marginL-20
            marginV-20
            text40
            style={{ fontFamily: 'Roboto-Medium' }}>
            New in Town
          </Text>
          <TouchableOpacity onPress={() => {
            navigation.push(Screen.LISTING ,{
              Caterars
            })
          }} >
            <Text
              marginV-20
              marginR-10
              orange
              text80
              style={{ fontFamily: 'Roboto-Medium' }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Caterars
              .map((i) => (
                <CaterarCard navigation={navigation} caterar={i} />
              ))}
          </ScrollView>
        </View>
        <View row style={{ justifyContent: 'space-between' }}>
          <Text
            marginL-20
            marginV-20
            text40
            style={{ fontFamily: 'Roboto-Medium' }}>
            Best Rated
          </Text>
          <TouchableOpacity onPress={() => {
            navigation.push(Screen.LISTING , {
              Caterars
            })
          }} >
            <Text
              marginV-20
              marginR-10
              orange
              text80
              style={{ fontFamily: 'Roboto-Medium' }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Caterars
              .map((i) => (
                <CaterarCard navigation={navigation} caterar={i}  />
              ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
const CaterarCard = ({ navigation  , caterar}) => {
  return (
    <Card
      style={{ marginBottom: 10, marginRight: 20, marginLeft: 10 }}
      onPress={() => navigation.push(Screen.CATERINGVIEW , { 
        caterar
      })}>
      <Card.Section
        imageSource={{
          uri: caterar?.imageUri ,
        }}
        imageStyle={{ width: width(75), height: 180 }}
      />
      <View padding-10>
        <Text style={{ fontFamily: 'Poppin-Bold' }}>{caterar?.username}</Text>
        <View row marginV-5>
          <AntDesign name="star" size={18} color={Colors.orange} />
          <Text
            marginH-5
            textBlack
            text80
            style={{ fontFamily: 'Roboto-Thin' }}>
            4.3
          </Text>
          <AntDesign name="tag" size={18} color={Colors.orange} />
          <Text
            marginL-5
            textBlack
            text80
            style={{ fontFamily: 'Roboto-Thin' }}>
            {caterar?.tag}
          </Text>
        </View>
        <View row marginV-5>
          <Entypo name="pin" size={20} color={Colors.orange} />
          <Text
            marginH-5
            textBlack
            text80
            style={{ fontFamily: 'Roboto-Thin' }}>
            {caterar?.address?.name}
          </Text>
        </View>
        <View row marginV-5 style={{ justifyContent: 'space-between' }}>
          <Text
            marginH-5
            textBlack
            text80
            style={{ fontFamily: 'Roboto-Bold' }}>
            min order : 25$
          </Text>
          <Text
            marginH-5
            textBlack
            text80
            style={{ fontFamily: 'Roboto-Bold' }}>
            Delivery : 15$
          </Text>
        </View>
      </View>
    </Card>
  );
};
const CategoryCard = ({ data }) => {
  return (
    <View center margin-10 height={80}>
      {data.icon}
      <Text text90 style={{ fontFamily: 'Poppin-Regular' }} marginV-5>
        {data.label}
      </Text>
    </View>
  );
};
