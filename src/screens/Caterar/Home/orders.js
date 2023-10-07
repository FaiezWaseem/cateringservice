import React from "react"
import { View, Card, Text, Dialog, Image, PanningProvider, Colors, Button } from "react-native-ui-lib"
import { ScrollView } from "react-native"
import { height } from "../../../utils/DptpPixel"

import db from '../../../utils/firebase'

export default () => {
    const [orders, setOrders] = React.useState([])
    const [order, setOrder] = React.useState({})
    const [isDialogVisible, setDialogVisible] = React.useState(false);
    React.useEffect(() => {
        db.on(`order/${db.getUid()}`, (snap) => {
            setOrders(order => [snap.val(), ...order])
        })
    }, [])
    return <View flex bg-textWhite marginT-30 >
        <ScrollView>
            {orders.map(i => <OrderCard order={i}
                onPress={() => {
                    setOrder(i)
                    setDialogVisible(!isDialogVisible);
                }} />)}
        </ScrollView>
        <Dialog
            visible={isDialogVisible}
            onDismiss={() => setDialogVisible(!isDialogVisible)}
            panDirection={PanningProvider.Directions.DOWN}>
            <View
                padding-10
                borderRadius={8}
                height={height(90)}
                backgroundColor={Colors.white}>
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

                <ScrollView>
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
                    <Button disabled={order.status === 'Complete'} label={order.status === 'Approve' ? 'Complete' : order.status === 'Complete' ? 'Completed' : 'Approve'} bg-orange onPress={() => {
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
        </Dialog>
    </View>
}

const OrderCard = ({ order, onPress }) => {
    return <Card padding-10 margin-10 elevation={5} onPress={onPress} >
        <View row spread >
            <Text style={{ fontFamily: 'Poppin-Bold' }} orange   >  NEW</Text>
            <Text text90 style={{ fontFamily: 'Poppin-Regular' }} >{order.orderId}</Text>
        </View>
        <View row elevation={6} marginT-10  >
            <Card center style={{ width: 70, borderColor: '#ccc', borderWidth: 0.5 }} >
                <Text text90 >{order.dateTime}</Text>
            </Card>
            <View marginL-30 >
                <Text grey30 >@ {order.time}</Text>
                <Text grey30 >{order?.address?.name}</Text>
                <Text style={{ fontFamily: 'Poppin-Medium' }}  >$ {order.total}</Text>
            </View>
        </View>
    </Card>
}
