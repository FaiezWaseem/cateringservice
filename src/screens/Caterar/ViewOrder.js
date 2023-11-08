import React from "react"
import { View, Card, Text, Dialog, Image, PanningProvider, Colors, Button } from "react-native-ui-lib"
import { ScrollView } from "react-native"
import { height } from "../../utils/DptpPixel"

import db from '../../utils/firebase'


export default ({ navigation , route }) =>{
    const { _order } = route.params;
    const [order, setOrder] = React.useState(_order)
    return <View flex  >
                <Image
                    source={{
                        uri: order?.items?.[0]?.imageUri,
                    }}
                    style={{
                        width: '100%',
                        height: 200,
                        borderRadius: 8
                    }}
                />
            <ScrollView style={{ padding : 10 ,marginBottom : 5  , flex : 1}} >
                    <View row>
                        <Text style={{ fontFamily: 'Poppin-Medium' }}>Order# </Text>
                        <Text style={{ fontFamily: 'Poppin-Regular' }}>{order.orderId}</Text>
                    </View>
                    <View row style={{ justifyContent: 'space-between' }}>
                        <View row >
                            <Text style={{ fontFamily: 'Poppin-Medium' }}>Order Date: </Text>
                            <Text style={{ fontFamily: 'Poppin-Regular' }}>{order?.orderDate}</Text>
                        </View>
                        <View row>
                            <Text style={{ fontFamily: 'Poppin-Medium' }}>Bill : </Text>
                            <Text style={{ fontFamily: 'Poppin-Regular' }}>{order?.sub_total}$</Text>
                        </View>
                    </View>
                    <View row>
                        <Text style={{ fontFamily: 'Poppin-Medium' }}>Order Status: </Text>
                        <Text style={{ fontFamily: 'Poppin-Regular' }}>{order?.status}</Text>
                    </View>
                    <View row>
                        <Text style={{ fontFamily: 'Poppin-Medium' }}>Caterar : </Text>
                        <Text style={{ fontFamily: 'Poppin-Regular' }}>Papa Jhons</Text>
                    </View>
                    <View row>
                        <Text style={{ fontFamily: 'Poppin-Medium' }}>Address : </Text>
                        <Text style={{ fontFamily: 'Poppin-Regular' }}>
                            {order?.address?.name}
                        </Text>
                    </View>
                    <View row>
                        <Text style={{ fontFamily: 'Poppin-Medium' }}>
                            Delivery Date :{' '}
                        </Text>
                        <Text style={{ fontFamily: 'Poppin-Regular' }}>{order?.dateTime}</Text>
                    </View>
                    <View row>
                        <Text style={{ fontFamily: 'Poppin-Medium' }}>Delivery : </Text>
                        <Text style={{ fontFamily: 'Poppin-Regular' }}>20$</Text>
                    </View>
                    <View row>
                        <Text style={{ fontFamily: 'Poppin-Medium' }}>Total Amount : </Text>
                        <Text style={{ fontFamily: 'Poppin-Regular' }}>{order?.total}$</Text>
                    </View>
                    {order?.items?.map(i => {
                        return <View row centerV >
                            <Image source={{ uri: i.imageUri }} width={60} height={60} ></Image>
                            <View padding-10>
                                <Text>{i.title}</Text>
                                <Text>{'Qty : '}{i.qty}</Text>
                                <Text>{'Price : '}{i.price}</Text>
                            </View>
                        </View>
                    })}
                    <Button 
                      
                    disabled={order.status === 'Complete'} label={order.status === 'Approve' ? 'Complete' : order.status === 'Complete' ? 'Completed' : 'Approve'} bg-orange onPress={() => {
                        const status = order.status === 'Approve' ? 'Complete' : order.status === 'Complete' ? 'Completed' : 'Approve';
                        db.update(`order/${order.caterarId}/${order.orderId}`, { status })
                        db.update(`order/${order.ordererId}/${order.orderId}`, { status })
                        setOrder({ ...order, status })
                        if (status === 'Complete') {
                            db.fset(`history/${order.ordererId}/${order.orderId}`, { ...order, status })
                        }
                    }} />
                </ScrollView>
    </View>
}