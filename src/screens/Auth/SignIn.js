import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, Button, TextField, Toast } from 'react-native-ui-lib';
import Screen from '../../utils/Screens'
import db from '../../utils/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isloading, setloading] = React.useState(false);
  const [error, setError] = React.useState({
    isError: false,
    message: '',
  });

  const handlePress = () => {
 
    if (username.length > 0 && password.length > 0) {
      setloading(true);
      db.signIn(username , password)
      return;
    }
    setError({
      isError: true,
      message: 'Please Fill Out All Fields',
    });
  };

React.useEffect(()=>{
  db.isAuthenticated((user)=>{
    if(user){
      AsyncStorage.getItem('isCaterar')
      .then(res => {
        console.log(res)
        if(res === "true"){
          navigation.replace(Screen.CATERAR_HOME)
        }else{
          navigation.replace(Screen.HOME)
        }
      })
      .catch(err =>{
        navigation.replace(Screen.HOME)
       console.log(err)
      })
    }
  })
},[])

  return (
    <View flex center>
      <Text h1 >Welcome</Text>
      <Text h2 marginT-10>
        signin to continue
      </Text>

      <View
        style={{
          marginTop: '10%',
          width: '80%',
        }}>
        <TextField
          placeholder={'email'}
          floatingPlaceholder
          onChangeText={(val) => setUsername(val)}
        />
        <TextField
          placeholder={'Password'}
          floatingPlaceholder
          secureTextEntry
          onChangeText={(val) => setPassword(val)}
        />
      </View>
      <View marginT-10 width={'80%'}>
        {isloading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Button
            label={'SignIn'}
            bg-orange
            size={Button.sizes.large}
            borderRadius={8}
            width={'100%'}
            onPress={handlePress}
          />
        )}
      </View>
      <Button
        label={`Don't Have an Account , Click Here`}
        red10
        link
        underline
        size={Button.sizes.large}
        marginT-20
        width={'100%'}
        onPress={()=>{
          navigation.push(Screen.REGISTER)
        }}
      />
      <Button
        label={`Caterar Account Login here`}
        red10
        link
        underline
        size={Button.sizes.large}
        marginT-20
        width={'100%'}
        onPress={()=>{
          navigation.push(Screen.CATERAR_SIGNIN)
        }}
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
