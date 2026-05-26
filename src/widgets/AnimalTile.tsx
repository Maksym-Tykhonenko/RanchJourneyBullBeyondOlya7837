import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {palette} from '../core/palette';
import {rounding} from '../core/layout';
import {typography} from '../core/typography';

type Props = {
  title: string;
  subtitle: string;
  origin: string;
  weight: string;
  image: ImageSourcePropType;
  onPress?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
};

export const AnimalTile: React.FC<Props> = ({
  title,
  subtitle,
  origin,
  weight,
  image,
  onPress,
  rightIcon,
  onRightPress,
}) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [styles.row, pressed && {opacity: 0.85}]}>
    <Image source={image} style={styles.image} />
    <View style={styles.body}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>🚩 {origin}</Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>⚖️ {weight}</Text>
      </View>
    </View>
    {rightIcon ? (
      <Pressable
        onPress={onRightPress}
        hitSlop={8}
        style={({pressed}) => [styles.rightBtn, pressed && {opacity: 0.7}]}>
        <Text style={styles.rightIcon}>{rightIcon}</Text>
      </Pressable>
    ) : null}
  </Pressable>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: palette.surface,
    borderRadius: rounding.lg,
    borderWidth: 1,
    borderColor: palette.rim,
    padding: 12,
    alignItems: 'center',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: rounding.md,
    resizeMode: 'cover',
  },
  body: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...typography.body,
    fontWeight: '700',
  },
  subtitle: {
    ...typography.caption,
    color: palette.textSecondary,
    fontStyle: 'italic',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meta: {
    ...typography.caption,
    color: palette.textSecondary,
  },
  rightBtn: {
    width: 36,
    height: 36,
    borderRadius: rounding.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(240, 98, 99, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(240, 98, 99, 0.35)',
  },
  rightIcon: {
    fontSize: 14,
  },
});
