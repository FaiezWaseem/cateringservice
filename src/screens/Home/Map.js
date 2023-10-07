import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
import {
  Dialog,
  PanningProvider,
  Colors,
  View,
  Text,
  Card,
  TouchableOpacity,
} from 'react-native-ui-lib';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Screen from '../../utils/Screens';

export default ({ navigation }) => {
  const [isDialogVisible, setDialogVisible] = React.useState(false);
  const markers = [
    {
      latitude: 37.78825,
      longitude: -122.4324,
      title: 'Cafe 1',
      description: 'Cafe 1 description',
    },
    {
      latitude: 37.75825,
      longitude: -122.4321,
      title: 'Cafe 2',
      description: 'Cafe 2 description',
    },
    {
      latitude: 37.76825,
      longitude: -122.4322,
      title: 'Cafe 3',
      description: 'Cafe 3 description',
    },
  ];
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
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
                console.log(mark);
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
          onPress={() => navigation.push(Screen.CATERINGVIEW)}>
          <Card.Section
            imageSource={{
              uri: 'https://github.com/FaiezWaseem/food-recipe/blob/master/src/assets/images/recipes/satay.png?raw=true',
            }}
            imageStyle={{ width: '100%', height: 180 }}
          />
          <View padding-10>
            <Text style={{ fontFamily: 'Poppin-Bold' }}>Big Bites</Text>
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
                FastFoods & Sandwiches
              </Text>
            </View>
            <View row marginV-5>
              <Entypo name="pin" size={20} color={Colors.orange} />
              <Text
                marginH-5
                textBlack
                text80
                style={{ fontFamily: 'Roboto-Thin' }}>
                2.3km away
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
