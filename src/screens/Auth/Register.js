import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, Button, TextField, Toast } from 'react-native-ui-lib';
import Screen from '../../utils/Screens'
import db from '../../utils/firebase'
export default ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isloading, setloading] = React.useState(false);
  const [error, setError] = React.useState({
    isError: false,
    message: '',
  });

  const handlePress = () => {
    if (username.length > 0 && email.length > 0 && password.length > 0) {
      setloading(true);
      db.signUp(email , password , ()=>{
        const uid = db.getUid();
        db.fset(`user/${uid}` , {
          email,
          password,
          username,
          avatar : '',
        })
        navigation.replace(Screen.HOME, {
          uid
        })
      } , (error)=>{
        setloading(false)
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
      <Text h1>Welcome</Text>
      <Text h2 marginT-10>
        signin to continue
      </Text>

      <View
        style={{
          marginTop: '10%',
          width: '80%',
        }}>
        <TextField
          placeholder={'Username'}
          floatingPlaceholder
          onChangeText={(val) => setUsername(val)}
        />
        <TextField
          placeholder={'Email'}
          floatingPlaceholder
          onChangeText={(val) => setEmail(val)}
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
        onPress={() => {}}
        
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
