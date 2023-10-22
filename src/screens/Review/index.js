import { useState , useEffect } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native-ui-lib';
import EmojiSelector from './EmojiSelector';
import firebase from '../../utils/firebase';

const rating = [1, 2, 3, 4, 5]
export default ({ route , navigation}) => {
    const [ratingQlty, setRatingQlty] = useState(3);
    const [ratingExp, setRatingExp] = useState(3);
    const [alreadyReviewed , setReviewed] = useState(false);
    const  { order } = route.params;

    useEffect(()=>{
        firebase.on(`rating/${order.caterarId}` , (snap)=>{
            const _order = snap.val();
            if(_order.orderId  === order.orderId && _order.ordererId === order.ordererId){
                setReviewed(true)
                console.log('================== already Reviewed ===================')
            }
        })
    },[])

    const SubmitRating = ()=>{
       if(alreadyReviewed){
        alert('Already Reviewed')
        return;
       } 
       const rt = ((ratingQlty + ratingExp) / 2);
       const key = firebase.getKey();
       firebase.fset(`rating/${order.caterarId}/${key}` , {
        key,
        rating : rt,
        ratingQuality : ratingQlty,
        ratingExperience : ratingExp,
        orderId : order.orderId,
        ordererId : order.ordererId,
        caterarId : order.caterarId
       })
       navigation.goBack();
    }
    return <View flex marginT-30 >
        <View center padding-10 backgroundColor={'rgba(0,0,0,0.1)'} >
            <Text marginL-10 text50 black >Rate The Service</Text>
        </View>
        <View flex center  >
            <View center marginV-10  >
                <Text text50 marginT-10 >By Quality</Text>
                <EmojiSelector currentEmoji={(index) => { setRatingQlty(rating[index]) }} />
            </View>
            <View center marginV-10  >
                <Text text50 marginT-10 >By Professionalism</Text>
                <EmojiSelector currentEmoji={(index) => { setRatingExp(rating[index]) }} />
            </View>
        </View>
        <Button label='Submit' marginB-20 bg-orange  onPress={SubmitRating} ></Button>
    </View>
}

