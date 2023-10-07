import * as React from 'react';
import { View, Text } from 'react-native-ui-lib';
import { Button } from 'react-native-ui-lib';
import { useTheme } from '../../presets';
import Search from '../../components/SearchPlaces';
import MapCurrent from '../../components/Map';
import getAddress from '../../utils/reverseGeocoding';
import * as Location from 'expo-location';

export default function ({ navigation }) {
  const { setDarkTheme } = useTheme();

  const [latlng, setLatLng] = React.useState({
    latitude: 24.8990162,
    longitude: 67.0308583,
  });
  const [completeAddress, setcompleteAddress] = React.useState(undefined);

  const checkPermission = async () => {
    const hasPermission = await Location.requestForegroundPermissionsAsync();
    if (hasPermission.status === 'granted') {
      const permission = await askPermission();
      return permission;
    }
    return true;
  };

  const askPermission = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    return permission.status === 'granted';
  };

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const response = await Location.getCurrentPositionAsync();
      const {
        coords: { latitude, longitude },
      } = response;
      console.log(coords);
      setLatLng({ latitude: latitude, longitude: longitude });
    } catch (err) {
      // alert('Failed to get Co-ordinates');
    }
  };
  const fetchData = async () => {
    const data = await getAddress(latlng.latitude, latlng.longitude);
    console.log(data);
    if (data.status) {
      console.log(data.status);
      console.log(data.results[0]);
      setcompleteAddress({
        latitude: data.results[0].geometry.location.lat,
        longitude: data.results[0].geometry.location.lng,
        address: data.results[0].formatted_address,
        name: data.results[0].formatted_address,
      });
    }
  };
  React.useEffect(() => {
    checkPermission();
    getLocation();
  }, []);

  React.useEffect(() => {
    fetchData();
    console.log(latlng);
  }, [latlng]);

  return (
    <View  flex center bg-bg>
      <View width={'100%'} position={'absolute'} zIndex={2} ptop={20}>
         <Text w="80%" bg="#fff" p={2} _dark={{
          color : 'coolGray.700'
        }}>
          {completeAddress && completeAddress.name}
        </Text>
        <Search
          onSearch={(e) => {
            setcompleteAddress(e);
            setLatLng({ latitude: e.latitude, longitude: e.longitude });
          }}
        />
      </View>
      {
        // <View row>
        //   <Button
        //     label="Dark Mode"
        //     backgroundColor={'white'}
        //     marginV-10
        //     outline
        //     borderRadius={2}
        //     colortext
        //     onPress={() => {
        //       setDarkTheme(true);
        //     }}
        //   />
        //   <Button
        //     label="Light Mode"
        //     outline
        //     colortext
        //     bg-bg
        //     borderRadius={2}
        //     marginV-10
        //     onPress={() => {
        //       setDarkTheme(false);
        //     }}
        //   />
        // </View>
      }
      <MapCurrent latlng={latlng} setLatLng={setLatLng} />
      <View width={'100%'} position={'absolute'} zIndex={2} pbottom={20} >
        <Button
            label="Next"
            textWhite
            bg-orange
            borderRadius={2}
            marginV-10
          />
      </View>
    </View>
  );
}
