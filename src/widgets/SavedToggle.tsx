import React from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import {palette} from '../core/palette';
import {rounding} from '../core/layout';

type Props = {
  active: boolean;
  onPress: () => void;
  style?: ViewStyle;
  size?: 'sm' | 'md' | 'lg';
};

export const SavedToggle: React.FC<Props> = ({active, onPress, style, size = 'md'}) => {
  const dim = size === 'sm' ? 30 : size === 'lg' ? 50 : 38;
  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      style={({pressed}) => [
        styles.base,
        {
          width: dim,
          height: dim,
          borderRadius: rounding.md,
          backgroundColor: active ? palette.accentSoft : 'rgba(14,16,48,0.72)',
          borderColor: active ? palette.accent : palette.rim,
        },
        pressed && {opacity: 0.8},
        style,
      ]}>
      <Text style={[styles.icon, {color: active ? palette.accent : palette.textSecondary}]}>
        {active ? '🔖' : '🤍'}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  icon: {
    fontSize: 14,
  },
});
