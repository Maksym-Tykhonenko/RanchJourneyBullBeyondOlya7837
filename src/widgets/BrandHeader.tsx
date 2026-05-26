import React from 'react';
import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {palette} from '../core/palette';
import {rounding} from '../core/layout';
import {typography} from '../core/typography';

type Props = {
  brand?: string;
  icon?: string;
  onMenuPress?: () => void;
  right?: React.ReactNode;
  style?: ViewStyle;
};

export const BrandHeader: React.FC<Props> = ({
  brand = 'Ranch Journey',
  icon = '🌄',
  onMenuPress,
  right,
  style,
}) => (
  <View style={[styles.row, style]}>
    <View style={styles.brand}>
      <View style={styles.logo}>
        <Text style={styles.logoIcon}>{icon}</Text>
      </View>
      <Text style={styles.brandText}>{brand}</Text>
    </View>
    {right ? right : null}
    {onMenuPress ? (
      <Pressable
        onPress={onMenuPress}
        hitSlop={10}
        style={({pressed}) => [styles.menuBtn, pressed && {opacity: 0.75}]}>
        <Text style={styles.menuIcon}>☰</Text>
      </Pressable>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: rounding.sm,
    backgroundColor: palette.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 14,
  },
  brandText: {
    ...typography.body,
    fontWeight: '700',
  },
  menuBtn: {
    width: 40,
    height: 40,
    borderRadius: rounding.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.rim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    color: palette.textPrimary,
    fontSize: 18,
  },
});
