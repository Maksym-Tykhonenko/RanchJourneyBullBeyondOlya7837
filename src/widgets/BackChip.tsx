import React from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import {palette} from '../core/palette';
import {rounding} from '../core/layout';

type Props = {
  onPress?: () => void;
  style?: ViewStyle;
};

export const BackChip: React.FC<Props> = ({onPress, style}) => (
  <Pressable
    onPress={onPress}
    hitSlop={10}
    style={({pressed}) => [styles.btn, pressed && {opacity: 0.7}, style]}>
    <Text style={styles.icon}>‹</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  btn: {
    width: 40,
    height: 40,
    borderRadius: rounding.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.rim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
    color: palette.textPrimary,
    fontWeight: '700',
    marginTop: -2,
  },
});
