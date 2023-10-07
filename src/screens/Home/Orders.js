import { useState , useEffect } from 'react';
import {
  View,
  Text,
  Card,
  Dialog,
  Button,
  Image,
  PanningProvider,
  Colors,
} from 'react-native-ui-lib';
import { height } from '../../utils/DptpPixel';
import { ScrollView } from 'react-native';
import db from '../../utils/firebase'
export default () => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [ orders , setOrders ] = useState([]);
  const [ order , setOrder ] = useState({});

  useEffect(()=>{
    db.on(`order/${db.getUid()}` , (snap)=>{
      console.log(snap.val())
      setOrders(order  => [ snap.val() , ...order ]);
    })
  },[])
  return (
    <View flex marginT-30>
      <Text
        orange
        h2
        marginL-20
        marginV-30
        style={{ fontFamily: 'Poppin-Bold' }}>
        My Orders
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {orders.map((i) => (
            <OrderCard
            order={i}
              onPress={() => {
                setOrder(i)
                setDialogVisible(!isDialogVisible);
              }}
            />
          ))}
      </ScrollView>
      <Dialog
        visible={isDialogVisible}
        onDismiss={() => setDialogVisible(!isDialogVisible)}
        panDirection={PanningProvider.Directions.DOWN}>
        <View
          padding-10
          borderRadius={8}
          height={height(55)}
          backgroundColor={Colors.white}>
          <Image
            source={{
              uri: order?.items?.[0]?.imageUri,
            }}
            style={{
              width: '100%',
              height: 200,
              borderRadius : 8
            }}
          />
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
        </View>
      </Dialog>
    </View>
  );
};

const OrderCard = ({ onPress , order }) => {
  return (
    <Card margin-10 padding-10 onPress={onPress}>
      <View row>
        <Text style={{ fontFamily: 'Poppin-Medium' }}>Order# </Text>
        <Text style={{ fontFamily: 'Poppin-Regular' }}>{order?.orderId}</Text>
      </View>
      <View row style={{ justifyContent: 'space-between' }}>
        <View row>
          <Text style={{ fontFamily: 'Poppin-Medium' }}>Order Date: </Text>
          <Text style={{ fontFamily: 'Poppin-Regular' }}>{order?.orderDate}</Text>
        </View>
        <View row>
          <Text style={{ fontFamily: 'Poppin-Medium' }}>Bill : </Text>
          <Text style={{ fontFamily: 'Poppin-Regular' }}>{order.total}$</Text>
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
    </Card>
  );
};
