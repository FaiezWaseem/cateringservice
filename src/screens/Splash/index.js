import * as React from 'react';
import { View, Text } from 'react-native-ui-lib';
import { Button, Colors } from 'react-native-ui-lib';
import { ImageBackground } from 'react-native';
import { useTheme } from '../../presets';

import Screen from '../../utils/Screens';

export default function ({ navigation }) {
  const { setDarkTheme } = useTheme();

  return (
    <View flex center bg-bg>
      <ImageBackground
        source={require('../../assets/login-background.png')}
        style={{ width: '100%', height: '100%' }}>
        <View center width={'100%'} position={'absolute'} pbottom={20}>
          <View paddingL-10 width={'100%'}>
            <Text textWhite h1>
              Welcome
            </Text>
            <Text textWhite h2>
              Indulge in culinary delights tailored to perfection. Experience
              the art of exceptional catering with our professional service.
            </Text>
          </View>
          <Button
            label="Continue"
            backgroundColor={Colors.orange}
            style={{ width: '90%' }}
            borderRadius={2}
            marginV-10
            onPress={() => {
              setDarkTheme(false);
            }}
            onPress={() => {
              navigation.replace(Screen.SIGNIN);
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
