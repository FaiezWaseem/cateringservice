import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, Button, TextField, Toast, } from 'react-native-ui-lib';
import Screen from '../../../utils/Screens'
import db from '../../../utils/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isloading, setloading] = React.useState(false);
  const [error, setError] = React.useState({
    isError: false,
    message: '',
  });

  const handlePress = () => {
    if ( email.length > 0 && password.length > 0) {
      setloading(true);
      db.signIn(email , password)
      return;
    }
    setError({
      isError: true,
      message: 'Please Fill Out All Fields',
    });
  };
  React.useEffect(()=>{
    db.isAuthenticated((user) => {
      console.log(user)
      if (user) {
        navigation.replace(Screen.CATERAR_HOME)
        AsyncStorage.setItem('isCaterar', "true")
      }
    })
  },[])

  return (
    <View flex center>
      <View width={'78%'} >
        <Text h1 textAlign='start' >Welcome</Text>
        <Text h2 marginT-10>
         SignIn to Continue
        </Text>
      </View>
      <View
        style={{
          marginTop: '10%',
          width: '80%',
        }}>
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
        onPress={() => { navigation.push(Screen.CATERAR_REGISTER) }}
      />
      <Button
        label={`User Login`}
        red10
        link
        underline
        size={Button.sizes.large}
        marginT-20
        width={'100%'}
        onPress={() => { navigation.push(Screen.SIGNIN) }}
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
