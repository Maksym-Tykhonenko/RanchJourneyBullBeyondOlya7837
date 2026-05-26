import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {palette} from '../core/palette';
import {rounding} from '../core/layout';
import {typography} from '../core/typography';

type Props = {
  icon?: string;
  title: string;
  subtitle?: string;
  style?: ViewStyle;
};

export const EmptyHint: React.FC<Props> = ({icon = '🔖', title, subtitle, style}) => (
  <View style={[styles.box, style]}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  box: {
    borderRadius: rounding.lg,
    borderWidth: 1,
    borderColor: palette.rim,
    backgroundColor: palette.surface,
    padding: 34,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    ...typography.subheading,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyMuted,
    textAlign: 'center',
  },
});
