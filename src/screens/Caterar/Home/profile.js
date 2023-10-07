import React from "react"
import { View, Text, Card, Dash  , TouchableOpacity} from "react-native-ui-lib"
import { AntDesign } from '@expo/vector-icons';
import { width } from '../../../utils/DptpPixel'
import db from '../../../utils/firebase'
import Screen from "../../../utils/Screens";
export default ({navigation }) => {
    const [ user , setUser] = React.useState({});
    React.useEffect(()=>{
     db.onValue('user/caterar/'+db.getUid() , (snap)=>{
        setUser(snap.val())
     })
    },[])
    return <View flex bg-textWhite marginT-30  >
        <View center margin-10 br20 bg-orange height={200} >
            <Text text40 poppinBold textWhite >{user?.username}</Text>
            <Text poppin textWhite >{user?.about}</Text>
            <Text poppin textWhite >{user?.address?.address}</Text>
        </View>
        <Card margin-20 br10 center >
            <View width={'100%'} row spread marginV-5 >
                <Text poppin > Change Username</Text>
                <AntDesign name="caretright" size={24} color="black" />
            </View>
            <Dash length={width(85)} thickness={0.2} ></Dash>
            <View width={'100%'} row spread marginV-5 >
                <Text poppin > Change About</Text>
                <AntDesign name="caretright" size={24} color="black" />
            </View>
            <Dash length={width(85)} thickness={0.2} ></Dash>
            <View width={'100%'} row spread marginV-5 >
                <Text poppin > Change Address</Text>
                <AntDesign name="caretright" size={24} color="black" />
            </View>
            <Dash length={width(85)} thickness={0.2} ></Dash>
            <TouchableOpacity onPress={()=>{
                db.signOut();
                navigation.replace(Screen.CATERAR_SIGNIN)
            }} >
            <View  row spread marginV-5 >
                <Text poppin >LogOut</Text>
                <AntDesign name="caretright" size={24} color="black" />
            </View>
            <Dash length={width(85)} thickness={0.2} ></Dash>
            </TouchableOpacity>
        </Card>


    </View>
}