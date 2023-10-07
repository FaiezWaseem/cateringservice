import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, Button, TextField, Toast, TouchableOpacity, Image, ProgressBar } from 'react-native-ui-lib';
import Screen from '../../../utils/Screens'
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import ImageUploadWithProgress from '../../../utils/imageUploader'
export default ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [about, setAbout] = React.useState('');
  const [tag, setTag] = React.useState('');
  const [isloading, setloading] = React.useState(false);
  const [error, setError] = React.useState({
    isError: false,
    message: '',
  });
  const [uploadProgress, setUploadProgress] = React.useState(0)
  const [imageUri, setImageUri] = React.useState('https://raw.githubusercontent.com/FaiezWaseem/food-recipe/master/src/assets/images/recipes/spagetti.png')
  async function pickFile() {
    let result = await DocumentPicker.getDocumentAsync({ multiple: true, copyToCacheDirectory: false });
    console.log(result)
    if (result) {
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
  const handlePress = () => {
    if (username.length > 0 && email.length > 0 && password.length > 0 && about.length > 0) {
      setloading(true);
      navigation.push(Screen.CATERAR_ADDRESS, {
        username,
        email,
        password,
        about,
        tag,
        imageUri
      })
      return;
    }
    setError({
      isError: true,
      message: 'Please Fill Out All Fields',
    });
  };

  return (
    <View flex center>
      <View>
        <Text h1 textAlign='start' >Welcome</Text>
        <Text h2 marginT-10>
          Create a new Account to Continue
        </Text>
      </View>
      <View
        style={{
          marginTop: '10%',
          width: '80%',
        }}>
        <TouchableOpacity onPress={pickFile} >
          <View center padding-10 >
            <Image source={{ uri: imageUri }} width={200} height={200} borderRadius={8} />
            <Text orange >Select Image</Text>
            <ProgressBar progress={uploadProgress} progressColor='orange' />
          </View>
        </TouchableOpacity>
        <View backgroundColor={'rgba(0,0,0,0.1)'} padding-10 br10 marginT-10 >
          <TextField
            placeholder={'Store Name'}
            onChangeText={(val) => setUsername(val)}
          />
        </View>
        <View backgroundColor={'rgba(0,0,0,0.1)'} padding-10 br10 marginT-10 >
          <TextField
            placeholder={'Store About'}
            onChangeText={(val) => setAbout(val)}
          />
        </View>
        <View backgroundColor={'rgba(0,0,0,0.1)'} padding-10 br10 marginT-10 >
          <TextField
            placeholder={'Store Tags ex: FastFood & Pizza '}
            onChangeText={(val) => setTag(val)}
          />
        </View>
        <View backgroundColor={'rgba(0,0,0,0.1)'} padding-10 br10 marginT-10 >
          <TextField
            placeholder={'Email'}
            onChangeText={(val) => setEmail(val)}
          />
        </View>
        <View backgroundColor={'rgba(0,0,0,0.1)'} padding-10 br10 marginT-10 >
          <TextField
            placeholder={'Password'}
            onChangeText={(val) => setPassword(val)}
          />
        </View>

      </View>
      <View marginT-10 width={'80%'}>
        {isloading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Button
            label={'Register'}
            bg-orange
            size={Button.sizes.large}
            borderRadius={8}
            width={'100%'}
            onPress={handlePress}
          />
        )}
      </View>
      <Button
        label={`Already Have an Account , Click Here`}
        red10
        link
        underline
        size={Button.sizes.large}
        marginT-20
        width={'100%'}
        onPress={() => { navigation.pop() }}
      />
      <Toast
        visible={error.isError}
        position={'bottom'}
        autoDismiss={5000}
        message={error.message}
        onDismiss={() => {
          setError({
            isError: false,
            message: '',
          });
        }}
      />
    </View>
  );
};
