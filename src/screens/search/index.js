import * as React from 'react';
import {
  View,
  Text,
  TextField,
  Card,
  TouchableOpacity,
  Colors,
  Button,
} from 'react-native-ui-lib';
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { width } from '../../utils/DptpPixel';
import firebase from '../../utils/firebase';
const MAIN_IMAGE =
  'https://raw.githubusercontent.com/FaiezWaseem/food-recipe/master/src/assets/images/recipes/spagetti.png';

export default function ({ navigation }) {
  const [ Caterars , setCaterars ] = React.useState([])
  const [temp, setTemp] = React.useState([])
  const [search, setSearch] = React.useState('')

  React.useEffect(()=>{
    if(search.length > 2){
      setCaterars(Restaurants.filter( item =>  {
          if(item?.username.toLowerCase().includes(search.toLocaleLowerCase())){
              return item
          }
      }))
      // console.log(Restaurants.filter( item => item?.username.toLowerCase().includes(search.toLocaleLowerCase())))
    }else{
      setRestaurants(temp)
    }
  },[search])
  React.useEffect(()=>{
   firebase.on('user/caterar/' , (snap)=>{
    const caterar = snap.val();
    setCaterars( item => [ { ...caterar ,key  : snap.key} , ...item]);
    setTemp( item => [ { ...caterar ,key  : snap.key} , ...item]);
   })
  },[])
  return (
    <View padding-10 flex bg-textWhite marginT-30 >
      <View
        style={{
          backgroundColor: '#eee',
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          marginBottom: 10,
        }}
        width={'100%'}>
        <EvilIcons name="search" size={24} color="black" />
        <TextField
          placeholder={'find catering service near you'}
          value={search}
          onChangeText={setSearch}
          style={{
            backgroundColor: '#eee',
            fontWeight: '600',
            color: '#000',
            width: width(60),
          }}
        />
        <Entypo name="location-pin" size={24} color="black" />
        <Text textBlack>Nc,USA</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Caterars.map(item => <MenuItem />)}
      </ScrollView>
    </View>
  );
}

const MenuItem = () => {

  return (
    <Card
      pointerEvents="none"
      backgroundColor={Colors.white}
      margin-5
      padding-10
      elevation={4}
      row
      centerV
      onPress={() => console.log('pressed')}>
      <Card.Image
        source={{
          uri: MAIN_IMAGE,
        }}
        style={{
          width: 100,
          height: 100,
        }}
      />
      <View w="100%" padding-5>
        <Text textBlack text80 style={{ fontFamily: 'Roboto-Bold' }}>
          Papa Jhon's
        </Text>
        <View row marginV-5>
          <AntDesign name="star" size={18} color={'gold'} />
          <Text
            marginH-5
            textBlack
            text80
            style={{ fontFamily: 'Roboto-Thin' }}>
            4.3
          </Text>
          <AntDesign name="warning" size={18} color={'gold'} />
          <Text
            marginL-5
            textBlack
            text80
            style={{ fontFamily: 'Roboto-Thin' }}>
            working days mon- fri
          </Text>
        </View>
        <View row style={{ justifyContent: 'space-between' }} width={'70%'}>
          <Text
            textBlack
            text80
            style={{ fontFamily: 'Roboto-Thin', maxWidth: '60%' }}>
            King of FastFoods
          </Text>
          <View row>
            <Button
              label={'View'}
              textWhite
              size={Button.sizes.medium}
              backgroundColor={Colors.orange}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};
