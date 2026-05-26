import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import {StateProviders} from './src/state/StateProviders';
import {RootStack} from './src/routing/RootStack';
import {palette} from './src/core/palette';

const navTheme = {
  dark: true,
  colors: {
    primary: palette.accent,
    background: palette.backdrop,
    card: palette.backdrop,
    text: palette.textPrimary,
    border: palette.rim,
    notification: palette.accent,
  },
  fonts: {
    regular: {fontFamily: 'System', fontWeight: '400' as const},
    medium: {fontFamily: 'System', fontWeight: '500' as const},
    bold: {fontFamily: 'System', fontWeight: '700' as const},
    heavy: {fontFamily: 'System', fontWeight: '900' as const},
  },
};

const App: React.FC = () => (
  <GestureHandlerRootView style={{flex: 1, backgroundColor: palette.backdrop}}>
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={palette.backdrop} />
      <StateProviders>
        <NavigationContainer theme={navTheme}>
          <RootStack />
        </NavigationContainer>
      </StateProviders>
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

export default App;
