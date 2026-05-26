/* global jest */

require('react-native-gesture-handler/jestSetup');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-webview', () => {
  const React = require('react');
  const {View} = require('react-native');
  return {
    WebView: props => React.createElement(View, props),
  };
});

jest.mock('react-native-maps', () => {
  const React = require('react');
  const {View} = require('react-native');
  const MapView = React.forwardRef((props, ref) =>
    React.createElement(View, {...props, ref}),
  );

  return {
    __esModule: true,
    default: MapView,
    Marker: props => React.createElement(View, props),
    PROVIDER_GOOGLE: 'google',
  };
});
