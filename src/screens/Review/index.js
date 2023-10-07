import { useState } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native-ui-lib';
import EmojiSelector from './EmojiSelector';


export default () => {
    return <View flex marginT-30 >
        <View center padding-10 backgroundColor={'rgba(0,0,0,0.1)'} >
            <Text marginL-10 text50 black >Rate The Service</Text>
        </View>
        <View flex center  >
            <View center marginV-10  >
                <Text text50 marginT-10 >By Quality</Text>
                <EmojiSelector currentEmoji={(index) => { console.log(index) }} />
            </View>
            <View center marginV-10  >
                <Text text50 marginT-10 >By Professionalism</Text>
                <EmojiSelector currentEmoji={(index) => { console.log(index) }} />
            </View>
        </View>
        <Button label='Submit' marginB-20 bg-orange  ></Button>
    </View>
}

