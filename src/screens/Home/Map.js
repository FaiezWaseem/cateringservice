import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
import {
  Dialog,
  PanningProvider,
  Colors,
  View,
  Text,
  Card
} from 'react-native-ui-lib';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Screen from '../../utils/Screens';
import firebase from '../../utils/firebase';

export default ({ navigation }) => {
  const [isDialogVisible, setDialogVisible] = React.useState(false);
  const [caterar , setCaterar] = React.useState({});
  const [markers, setCaterars] = React.useState([])
  React.useEffect(() => {
    firebase.on('user/caterar/', (snap) => {
      const caterar = snap.val();
      setCaterars(item => [{
        caterar,
        latitude: caterar?.address?.latitude,
        longitude: caterar?.address?.longitude,
        title: caterar?.username,
        description: caterar?.about,
        key: snap?.key
      }, ...item]);
    })
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: caterar?.[0]?.latitude ?? 37.78825,
          longitude: caterar?.[0]?.longitude ?? -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
          latitude: caterar?.[0]?.latitude ?? 37.78825,
          longitude: caterar?.[0]?.longitude ?? -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {markers.map((mark) => {
          return (
            <Marker
              coordinate={mark}
              title={mark.title}
              description={mark.description}
              pinColor="black"
              draggable={true}
              onDragEnd={(e) => {
                props.setLatLng(e.nativeEvent.coordinate);
              }}
              onPress={() => {
                setCaterar(mark);
                setDialogVisible(!isDialogVisible);
              }}
            />
          );
        })}
      </MapView>
      <Dialog
        visible={isDialogVisible}
        onDismiss={() => setDialogVisible(!isDialogVisible)}
        panDirection={PanningProvider.Directions.DOWN}>
        <Card
          style={{ marginBottom: 10, marginRight: 20, marginLeft: 10 }}
          onPress={() => navigation.push(Screen.CATERINGVIEW , {
            caterar : { ...caterar?.caterar , key : caterar?.key}
          })}>
          <Card.Section
            imageSource={{
              uri: caterar?.caterar?.imageUri,
            }}
            imageStyle={{ width: '100%', height: 180 }}
          />
          <View padding-10>
            <Text style={{ fontFamily: 'Poppin-Bold' }}>{caterar.title}</Text>
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
                {caterar?.caterar?.tag}
              </Text>
            </View>
            <View row marginV-5>
              <Entypo name="pin" size={20} color={Colors.orange} />
              <Text
                marginH-5
                textBlack
                text80
                style={{ fontFamily: 'Roboto-Thin' }}>
                {caterar?.caterar?.address?.name}
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
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
