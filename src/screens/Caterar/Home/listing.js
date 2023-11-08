import * as React from 'react';
import {
    View,
    Text,
    Card,
    Colors,
    Button,
    ButtonSize,
} from 'react-native-ui-lib';
import { ScrollView } from 'react-native';
import Screen from '../../../utils/Screens'
import db from '../../../utils/firebase'
export default ({ navigation }) => {
    const [menu, setMenu] = React.useState([])
    React.useEffect(() => {
        if (!menu) {
            load()
        }
    }, [])

    const load = () => {
        const uid = db.getUid();
        db.on(`menu/${uid}`, (snap) => {
            setMenu(item => [snap.val(), ...item])
        })
    }
    return <View flex bg-textWhite marginT-30  >
        <ScrollView>
            {menu.map(i => <MenuItem item={i} />)}
        </ScrollView>
        <View row center marginB-10 >
        <Button
            label={'Refresh'}
            textWhite
            size={Button.sizes.large}
            backgroundColor={Colors.orange}
            onPress={() => {
                setMenu([])
                load()
            }}
            />
            </View>
        <View position={'absolute'}
            pbottom={10} pright={20}
            padding-10  >
            <Button
                onPress={() => {
                    navigation.push(Screen.CATERAR_CREATE_MENU)
                }}
                label='+' round size={ButtonSize.large} style={{
                    width: 60,
                    height: 60
                }} ></Button>
        </View>
    </View>
}
const MenuItem = ({ item }) => {
    return (
        <Card
            backgroundColor={Colors.white}
            margin-5
            padding-10
            elevation={4}
            row
            centerV>
            <Card.Image
                source={{
                    uri: item.imageUri,
                }}
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10
                }}
            />
            <View w="100%" padding-5>
                <Text textBlack text60 style={{ fontFamily: 'Roboto-Bold' }}>
                    {item.title}
                </Text>
                <View row marginV-5>
                    <Text
                        textBlack
                        text80
                        style={{ fontFamily: 'Roboto-Regular' }}>
                        {item.description}
                    </Text>
                </View>
                <View row style={{ justifyContent: 'space-between' }} width={'70%'}>
                    <Text
                        textBlack
                        text80
                        style={{ fontFamily: 'Roboto-Bold', maxWidth: '60%' }}>
                        min Order {item.price}$
                    </Text>

                    <View row >
                        <Button
                            label={'remove'}
                            textWhite
                            size={Button.sizes.medium}
                            backgroundColor={Colors.orange}
                            onPress={() => {
                                // alert('clicked')
                                const uid = db.getUid();
                                console.log(item.key)
                                db.dlt(`menu/${uid}`, item.key)
                                alert('Deleted Please Refresh to See Affect')
                            }}
                        />
                    </View>
                </View>
            </View>
        </Card>
    );
};