import {
  View,
  Text,
  Button,
  Avatar,
  Colors,
  Dash,
  TouchableOpacity,

} from 'react-native-ui-lib';
import { width, height } from '../../utils/DptpPixel';
import { MaterialIcons } from '@expo/vector-icons';
import Screen from '../../utils/Screens';
import db from '../../utils/firebase';
import React from 'react';

export default ({ navigation }) => {
  const [ user  , setUser ] = React.useState({});
  React.useEffect(()=>{
   db.onValue(`user/${db.getUid()}` , (snap)=>{
    setUser(snap.val())
    console.log(snap.val())
   })
  },[]) 
  return (
    <View marginT-30 flex bg-textWhite>
      <View height={height(30)} bg-orange center>
        <View row>
         <View bg-orange40 height={100} width={100} center br100   >
          <Text textWhite text10BL  >{user?.username?.charAt(0)}</Text>
         </View>
          <View center marginL-10 >
            <Text textWhite style={{ fontFamily: 'Poppin-Bold' }}>
              {user?.username}
            </Text>
            <Text textWhite style={{ fontFamily: 'Poppin-Bold' }}>
              {user?.email}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={() => {
        navigation.push(Screen.EDITPROFILE, {
          user
        })
      }} >
        <View padding-5>
          <View padding-10 row style={{ justifyContent: 'space-between' }}>
            <Text>Edit Profile</Text>
            <MaterialIcons name="arrow-right" size={24} color="black" />
          </View>
          <Dash vertical thickness={'100%'} length={1} color={Colors.grey40} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.push(Screen.HISTORY)
      }} >
        <View padding-5>
          <View padding-10 row style={{ justifyContent: 'space-between' }}>
            <Text>History</Text>
            <MaterialIcons name="arrow-right" size={24} color="black" />
          </View>
          <Dash vertical thickness={'100%'} length={1} color={Colors.grey40} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View padding-5>
          <View padding-10 row style={{ justifyContent: 'space-between' }}>
            <Text>Report/Complain</Text>
            <MaterialIcons name="arrow-right" size={24} color="black" />
          </View>
          <Dash vertical thickness={'100%'} length={1} color={Colors.grey40} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        db.signOut()
        navigation.replace(Screen.SIGNIN)
      }} >
        <View padding-5>
          <View padding-10 row style={{ justifyContent: 'space-between' }}>
            <Text>LogOut</Text>
            <MaterialIcons name="arrow-right" size={24} color="black" />
          </View>
          <Dash vertical thickness={'100%'} length={1} color={Colors.grey40} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
