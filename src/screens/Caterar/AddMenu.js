import * as React from 'react'
import { View, Text, TextField, Dash, Image, Stepper, Button, ProgressBar } from 'react-native-ui-lib'
import { width } from '../../utils/DptpPixel'
import { TouchableOpacity } from 'react-native-ui-lib'
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import ImageUploadWithProgress from '../../utils/imageUploader'
import db from '../../utils/firebase'
export default ({ navigation }) => {
    const [uploadProgress, setUploadProgress] = React.useState(0)
    const [imageUri, setImageUri] = React.useState('https://raw.githubusercontent.com/FaiezWaseem/food-recipe/master/src/assets/images/recipes/spagetti.png')
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [minQty, setMinQty] = React.useState(1)
    const [maxQty, setMaxQty] = React.useState(1)
    const [price, setPrice] = React.useState(0)
    async function pickFile() {
        let result = await DocumentPicker.getDocumentAsync({ multiple: false, copyToCacheDirectory: false });
        console.log(result)
        if (result) {
            const uri = FileSystem.documentDirectory + result.name;

            await FileSystem.copyAsync({
                from: result.uri,
                to: FileSystem.cacheDirectory + result.name
            })
            let fileBase64 = await FileSystem.readAsStringAsync(FileSystem.cacheDirectory + result.name, { encoding: FileSystem.EncodingType.Base64 });
            const body = new FormData();
            body.append('image', fileBase64.split(',').pop());
            ImageUploadWithProgress(body, (e) => {
                console.log(e?.url?.data?.url);
                console.log(e);
                setImageUri(e?.url?.data?.url)
                setUploadProgress(e.progress)
            });
        }
    }
    const onCreateMenu = () => {

        if (title.length > 0 && description.length > 0 && price.length > 0) {
            const uid = db.getUid();
            const key = db.getKey();
            db.fset(`menu/${uid}/${key}`, {
                title,
                description,
                minQty,
                maxQty,
                price,
                imageUri,
                key,
                caterarId: uid
            })
            setDescription('')
            setPrice('')
            setTitle('')
            setMinQty('')
            navigation.pop()
            return;
        }
        alert('Please Fill out all feilds')
    }
    return <View flex marginT-30 >
        <TouchableOpacity onPress={pickFile} >
            <View center padding-10 >
                <Image source={{ uri: imageUri }} width={100} height={100} borderRadius={8} />
                <Text orange >Select Image</Text>
                <ProgressBar progress={uploadProgress} progressColor='orange' />
            </View>
        </TouchableOpacity>
        <View padding-10 bg-grey60 >
            <Text>Service Name : </Text>
            <TextField placeholder='Enter Service Title' onChangeText={setTitle} />
            <Dash length={width(90)} thickness={0.3} />
        </View>
        <View padding-10 bg-grey60 >
            <Text>Service Description : </Text>
            <TextField placeholder='Enter Service description' onChangeText={setDescription} />
            <Dash length={width(90)} thickness={0.3} />
        </View>
        <View row spread padding-10 >
            <Text  >Minimum Allowed QTY</Text>
            <Stepper minValue={1} onValueChange={setMinQty} value={minQty} />
        </View>

        <View row spread padding-10 >
            <Text>Maximum Allowed QTY</Text>
            <Stepper minValue={1} onValueChange={setMaxQty} value={maxQty} />
        </View>
        <View row spread padding-10 >
            <Text>Price in $</Text>
            <TextField keyboardType='numeric' placeholder='$$$' onChangeText={setPrice} />
        </View>
        <View center >
            <Button
                onPress={onCreateMenu}
                marginT-30 
                label='SAVE' 
                bg-orange 
                style={{
                    width: 200
                }} 
                />
        </View>

    </View>
}