import React from 'react';
import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {palette} from '../core/palette';
import {rounding} from '../core/layout';
import {typography} from '../core/typography';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  leading?: string;
  trailing?: string;
  style?: ViewStyle;
  disabled?: boolean;
  small?: boolean;
};

export const PrimaryAction: React.FC<Props> = ({
  label,
  onPress,
  variant = 'primary',
  leading,
  trailing,
  style,
  disabled,
  small,
}) => {
  const colors = {
    primary: {bg: palette.accent, text: '#FFFFFF'},
    secondary: {bg: palette.surfaceRaised, text: palette.textPrimary},
    ghost: {bg: 'transparent', text: palette.textPrimary},
    danger: {bg: palette.danger, text: '#FFFFFF'},
  }[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_ripple={{color: 'rgba(255,255,255,0.08)'}}
      style={({pressed}) => [
        styles.base,
        {
          backgroundColor: colors.bg,
          height: small ? 44 : 54,
          borderWidth: variant === 'ghost' || variant === 'secondary' ? 1 : 0,
          borderColor: palette.rim,
        },
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
        style,
      ]}>
      <View style={styles.inner}>
        {leading ? <Text style={[styles.icon, {color: colors.text}]}>{leading}</Text> : null}
        <Text style={[styles.label, {color: colors.text}, small && {fontSize: 14}]}>
          {label}
        </Text>
        {trailing ? <Text style={[styles.icon, {color: colors.text}]}>{trailing}</Text> : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: rounding.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    ...typography.button,
  },
  icon: {
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.9,
    transform: [{scale: 0.99}],
  },
  disabled: {
    opacity: 0.5,
  },
});
