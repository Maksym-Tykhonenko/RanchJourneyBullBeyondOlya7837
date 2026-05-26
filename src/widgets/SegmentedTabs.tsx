import React from 'react';
import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {palette} from '../core/palette';
import {rounding} from '../core/layout';
import {typography} from '../core/typography';

type Item = {key: string; label: string; counter?: number};

type Props = {
  items: Item[];
  value: string;
  onChange: (key: string) => void;
  style?: ViewStyle;
};

export const SegmentedTabs: React.FC<Props> = ({items, value, onChange, style}) => (
  <View style={[styles.container, style]}>
    {items.map(item => {
      const active = item.key === value;
      return (
        <Pressable
          key={item.key}
          onPress={() => onChange(item.key)}
          style={({pressed}) => [
            styles.pill,
            active ? styles.pillActive : styles.pillInactive,
            pressed && {opacity: 0.85},
          ]}>
          <Text
            style={[
              styles.label,
              {color: active ? '#FFFFFF' : palette.textSecondary},
            ]}>
            {item.label}
            {typeof item.counter === 'number' ? ` (${item.counter})` : ''}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: palette.surfaceSoft,
    borderRadius: rounding.md,
    padding: 4,
    gap: 4,
  },
  pill: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: rounding.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillActive: {
    backgroundColor: palette.accent,
  },
  pillInactive: {
    backgroundColor: 'transparent',
  },
  label: {
    ...typography.bodyMuted,
    fontWeight: '700',
  },
});
