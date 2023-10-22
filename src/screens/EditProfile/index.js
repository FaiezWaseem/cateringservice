 import {
    View,
    Text,
    Button,
    Avatar,
    Colors,
    TextField,
} from 'react-native-ui-lib';
import { width, height } from '../../utils/DptpPixel';
import React from 'react';
import firebase from '../../utils/firebase';
export default ({ route , navigation }) => {
    const { user } = route.params;
    const [username, setUsername] = React.useState(user?.username)
    const [email, setEmail] = React.useState(user?.email)
    const [phoneNumber, setPhoneNumber] = React.useState(user?.phone)
    const [address  , setAddress] = React.useState(user?.address)
    const onUpdatePress = () =>{
        firebase.update(`user/${firebase.getUid()}`,{
            username,
            email,
            phoneNumber,
            address
        })
        alert('updated profile');
        navigation.pop()

    }
    return (
        <View marginT-30 flex bg-textWhite>
            <View height={height(30)} bg-orange center>
                <View row>
                    <Avatar
                        source={{
                            uri: '',
                        }}
                        size={100}
                    />
                    <View center marginL-10 >
                        <Text textWhite style={{ fontFamily: 'Poppin-Bold' }}>
                            {user.username}
                        </Text>
                        <Text textWhite style={{ fontFamily: 'Poppin-Bold' }}>
                            {user.email}
                        </Text>
                        <Button
                            outline
                            outlineColor={Colors.white}
                            label="Upload Profile"
                        />
                    </View>
                </View>
            </View>
            <TextField
                placeholder={'Username'}
                floatingPlaceholder
                paddingH-10
                value={username}
                onChangeText={setUsername}
            />
            <TextField
                placeholder={'Email'}
                floatingPlaceholder
                paddingH-10
                onChangeText={setEmail}
                value={email}
            />
            <TextField
                placeholder={'Phone'}
                floatingPlaceholder
                paddingH-10
                onChangeText={setPhoneNumber}
                value={phoneNumber}
             />
            <TextField
                placeholder={'Address'}
                floatingPlaceholder
                paddingH-10
                underlineColorAndroid={'grey'}
                onChangeText={setAddress}
                value={address}
            />
            <View center >
                <Button size={'large'} label='Update' bg-orange onPress={onUpdatePress} />
            </View>


        </View>
    );
};
