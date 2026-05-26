import {Platform} from 'react-native';

export const rounding = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 26,
  xxl: 32,
  pill: 999,
};

export const gap = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const hubBar = {
  offsetBottom: Platform.OS === 'ios' ? 20 : 30,
  height: 72,
  horizontalInset: 18,
};

export const screen = {
  padding: 20,
};
