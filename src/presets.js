import * as React from 'react';
import { Typography, Colors } from 'react-native-ui-lib';
import { ThemeManager } from 'react-native-ui-lib';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Define Theme Variables here
// App Colors  , Typography , theme .etc
// example

const colors = {
  dark: {
    bg: '#121212',
    orange: '#f97316',
    textdefault: '#fff',
    textWhite: '#fff',
    textBlack: '#000',
  },
  light: {
    bg: '#ffffff',
    orange: '#f97316',
    textdefault: '#000',
    textWhite: '#fff',
    textBlack: '#000',
  },
};

export default async function configureDesignSystem() {
  Typography.loadTypographies({
    h1: {
      fontSize: 42,
      fontWeight: '300',
      lineHeight: 50,
      fontFamily: 'Poppin-Medium',
    },
    h2: {
      fontSize: 18,
      fontWeight: '300',
      lineHeight: 20,
      fontFamily: 'Poppin-Regular',
    },
    poppinBold : {
      fontFamily: 'Poppin-Bold',
    },
    poppin : {
      fontFamily: 'Poppin-Regular',
    }
  });
  ThemeManager.setComponentTheme('Text', {
    text70: true, // will set the text70 typography modifier prop to be true by default
    textdefault: true, // will set the teal color by default
  });
  ThemeManager.setComponentTheme('Button', {
    'marginL-10': true,
  });
  ThemeManager.setComponentTheme('View', (props) => {
    return {
      style: {
        width: props?.w || props?.width,
        height: props?.h || props?.height,
        position: props?.position,
        top: props?.ptop,
        left: props?.pleft,
        bottom: props?.pbottom,
        right: props?.pright,
        zIndex: props?.zIndex,
      },
    };
  });

  // Setting colors according to theme
  Colors.loadSchemes(colors);
  const theme = await colorModeManager.get();
  console.log(theme);
  Colors.loadColors(colors[theme]);
}
const colorModeManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@fmy-app-color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      console.log(e);
      return 'light';
    }
  },
  set: async (value) => {
    try {
      await AsyncStorage.setItem('@fmy-app-color-mode', value);
      console.log('Saving...');
    } catch (e) {
      console.log(e);
    }
  },
};
// Change the theme through screens
const useTheme = () => {
  const [darkTheme, setDarkTheme] = React.useState(false);
  Colors.setScheme(darkTheme ? 'dark' : 'light');
  React.useEffect(() => {
    loadCurrentTheme();
  }, []);
  async function loadCurrentTheme() {
    const theme = await colorModeManager.get();
    setDarkTheme(theme === 'dark' ? true : false);
  }
  return { setDarkTheme };
};

export { colorModeManager, useTheme };
