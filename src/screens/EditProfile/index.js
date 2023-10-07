import {
    View,
    Text,
    Button,
    Avatar,
    Colors,
    TextField,
} from 'react-native-ui-lib';
import { width, height } from '../../utils/DptpPixel';
import { MaterialIcons } from '@expo/vector-icons';
export default () => {
    return (
        <View marginT-30 flex bg-textWhite>
            <View height={height(30)} bg-orange center>
                <View row>
                    <Avatar
                        source={{
                            uri: 'https://faiezwaseem.tech/static/images/profile.png',
                        }}
                        size={100}
                    />
                    <View center marginL-10 >
                        <Text textWhite style={{ fontFamily: 'Poppin-Bold' }}>
                            Jhon Doe
                        </Text>
                        <Text textWhite style={{ fontFamily: 'Poppin-Bold' }}>
                            jhondoe@xyz.com
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
                onChangeText={() => { }}
                enableErrors
                validate={['required', 'email', (value) => value.length > 6]}
                validationMessage={['Field is required', 'Email is invalid', 'Password is too short']}
            />
            <TextField
                placeholder={'Email'}
                floatingPlaceholder
                paddingH-10
                onChangeText={() => { }}
                enableErrors
                validate={['required', 'email', (value) => value.length > 6]}
                validationMessage={['Field is required', 'Email is invalid', 'Password is too short']}
            />
            <TextField
                placeholder={'Phone'}
                floatingPlaceholder
                paddingH-10
                onChangeText={() => { }}
                enableErrors
                validate={['required', 'email', (value) => value.length > 6]}
                validationMessage={['Field is required', 'Email is invalid', 'Password is too short']}
            />
            <TextField
                placeholder={'Address'}
                floatingPlaceholder
                paddingH-10
                underlineColorAndroid={'grey'}
                onChangeText={() => { }}
                enableErrors
                validate={['required', 'email', (value) => value.length > 6]}
                validationMessage={['Field is required', 'Email is invalid', 'Password is too short']}
            />
            <View center >
                <Button size={'large'} label='Update' bg-orange />
            </View>


        </View>
    );
};
