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

import { width } from '../../utils/DptpPixel';


export default ({ navigation }) => {


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
                style={{
                    fontWeight: '600',
                    color: 'grey',
                    width: width(60),
                }} />
            <Entypo name="location-pin" size={24} color="black" />
            <Text textBlack>Nc,USA</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} >
            {Array(10).fill(1, 0, 10).map(i => <CaterarCard navigation={navigation} />)}
        </ScrollView>

    </View>
}

const CaterarCard = ({ navigation }) => {
    return (
        <Card
            style={{ marginBottom: 10, marginRight: 10, marginLeft: 10 }}
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
    );
};