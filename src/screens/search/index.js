import * as React from 'react';
import {
  View,
  Text,
  TextField,
  Card,
  Colors,
  Button,
} from 'react-native-ui-lib';
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { width } from '../../utils/DptpPixel';
import firebase from '../../utils/firebase';
import Cache from '../../utils/Cache';
import Screen from '../../utils/Screens'

export default function ({ navigation }) {
  const [ Caterars , setCaterars ] = React.useState([])
  const [temp, setTemp] = React.useState([])
  const [search, setSearch] = React.useState('')
  const address = Cache.getSessionValue('current_user_address' , Cache.JSON) || {};
   
  React.useEffect(()=>{
    if(search.length > 2){
      setCaterars(Caterars.filter( item =>  {
          if(item?.username.toLowerCase().includes(search.toLocaleLowerCase())){
              return item
          }
      }))
      // console.log(Restaurants.filter( item => item?.username.toLowerCase().includes(search.toLocaleLowerCase())))
    }else{
      setCaterars(temp)
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
        <Text textBlack>{address?.name?.split(',')?.[1]?.substr(0 , 6)+'..'}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Caterars.map(item => <MenuItem  caterar={item} navigation={navigation} />)}
      </ScrollView>
    </View>
  );
}

const MenuItem = ({ caterar , navigation }) => {

  return (
    <Card
      pointerEvents="none"
      backgroundColor={Colors.white}
      margin-5
      padding-10
      elevation={4}
      row
      centerV
      onPress={() => navigation.push(Screen.CATERINGVIEW , { 
        caterar
      })}>
      <Card.Image
        source={{
          uri: caterar?.imageUri,
        }}
        style={{
          width: 100,
          height: 100,
        }}
      />
      <View w="100%" padding-5>
        <Text textBlack text80 style={{ fontFamily: 'Roboto-Bold' }}>
          {caterar?.username}
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
            {caterar?.address?.name}
          </Text>
        </View>
        <View row style={{ justifyContent: 'space-between' }} width={'70%'}>
          <Text
            textBlack
            text80
            style={{ fontFamily: 'Roboto-Thin', maxWidth: '60%' }}>
            {caterar?.tag}
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
