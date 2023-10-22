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
import Screen from '../../utils/Screens';

import { width } from '../../utils/DptpPixel';


export default ({ navigation, route }) => {
    console.log(route.params)
    const [Restaurants, setRestaurants] = React.useState(route.params.Caterars)
    const [temp, setTemp] = React.useState(route.params.Caterars)
    const [search, setSearch] = React.useState('')

    React.useEffect(()=>{
      if(search.length > 2){
        setRestaurants(Restaurants.filter( item =>  {
            if(item?.username.toLowerCase().includes(search.toLocaleLowerCase())){
                return item
            }
        }))
        // console.log(Restaurants.filter( item => item?.username.toLowerCase().includes(search.toLocaleLowerCase())))
      }else{
        setRestaurants(temp)
      }
    },[search])
    return <View flex marginT-30 >
        <View
            marginT-20
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
            <TextField
                placeholder='Search Caterar near you'
                value={search}
                onChangeText={setSearch}
                style={{
                    fontWeight: '600',
                    color: 'grey',
                    width: width(60),
                }} />
            <Entypo name="location-pin" size={24} color="black" />
            <Text textBlack>Nc,USA</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} >
            {Restaurants.map(i => <CaterarCard navigation={navigation} caterar={i} />)}
        </ScrollView>

    </View>
}

const CaterarCard = ({ navigation, caterar }) => {
    return (
        <Card
            style={{ marginBottom: 10, marginRight: 10, marginLeft: 10 }}
            onPress={() => navigation.push(Screen.CATERINGVIEW ,{
                caterar
            })}>
            <Card.Section
                imageSource={{
                    uri: caterar.imageUri,
                }}
                imageStyle={{ width: '100%', height: 180 }}
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