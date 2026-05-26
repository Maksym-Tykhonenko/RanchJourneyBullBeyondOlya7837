import React, {useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {palette} from '../core/palette';
import {useOnboardingGate} from '../state/OnboardingGateContext';
import {RootStackParams} from '../routing/RouteTypes';

type Nav = NativeStackNavigationProp<RootStackParams, 'Splash'>;

const LOADER_HTML = `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<style>
  * { -webkit-tap-highlight-color: transparent; }
  html, body {
    margin: 0;
    padding: 0;
    background: transparent;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  body {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .container {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  .loader {
    width: 20px;
    height: 40px;
    border-radius: 10px 50px;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.45);
    animation: dominos 1s ease infinite;
    position: relative;
  }
  .loader:nth-child(1) { left: 80px; animation-delay: 0.325s; background-color: #5d9960; }
  .loader:nth-child(2) { left: 70px; animation-delay: 0.5s; background-color: #82a587; }
  .loader:nth-child(3) { left: 60px; animation-delay: 0.625s; background-color: #8bac74; }
  .loader:nth-child(4) { left: 50px; animation-delay: 0.74s; background-color: #b9bf90; }
  .loader:nth-child(5) { left: 40px; animation-delay: 0.865s; background-color: #e7d2ab; }
  @keyframes dominos {
    50% { opacity: 0.7; }
    75% { transform: rotate(90deg); }
    80% { opacity: 1; }
  }
</style>
</head>
<body>
  <div class="container">
    <div class="loader"></div>
    <div class="loader"></div>
    <div class="loader"></div>
    <div class="loader"></div>
    <div class="loader"></div>
  </div>
</body>
</html>`;

export const SplashPanel: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {passed, ready} = useOnboardingGate();
{/** 
  useEffect(() => {
    if (!ready) {
      return;
    }
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: passed ? 'Hub' : 'Onboarding'}],
      });
    }, 2200);
    return () => clearTimeout(timer);
  }, [ready, passed, navigation]);
*/}
  return (
    <ImageBackground
      source={require('../assets/brand/splash_scene.png')}
      style={styles.root}
      resizeMode="cover">
      <View style={styles.dim} />
      <View style={styles.loaderBox}>
        <WebView
          originWhitelist={['*']}
          source={{html: LOADER_HTML}}
          style={styles.web}
          containerStyle={styles.webContainer}
          androidLayerType="hardware"
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          javaScriptEnabled
          domStorageEnabled={false}
          setSupportMultipleWindows={false}
          cacheEnabled={false}
          incognito
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          textZoom={100}
          backgroundColor="transparent"
          mixedContentMode="always"
          opaque={false}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.backdropDeep,
  },
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(8, 10, 34, 0.32)',
  },
  loaderBox: {
    width: 220,
    height: 220,
  },
  web: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  webContainer: {
    backgroundColor: 'transparent',
  },
});
