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
import {SavedToggle} from './SavedToggle';

type Props = {
  title: string;
  country: string;
  image: ImageSourcePropType;
  tags?: string[];
  saved?: boolean;
  variant?: 'compact' | 'wide';
  onPress?: () => void;
  onToggleSave?: () => void;
};

export const LocationTile: React.FC<Props> = ({
  title,
  country,
  image,
  tags,
  saved,
  variant = 'compact',
  onPress,
  onToggleSave,
}) => {
  if (variant === 'wide') {
    return (
      <Pressable
        onPress={onPress}
        style={({pressed}) => [styles.wide, pressed && styles.pressed]}>
        <View style={styles.wideTopRow}>
          <View style={styles.wideTag}>
            <Text style={styles.wideTagText}>Ranch</Text>
          </View>
          {onToggleSave ? (
            <SavedToggle size="sm" active={!!saved} onPress={onToggleSave} />
          ) : null}
        </View>
        <Image source={image} style={styles.wideImage} resizeMode="cover" />
        <View style={styles.wideBottom}>
          <Text style={styles.wideTitle} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.pinRow}>
            <Text style={styles.pin}>📍</Text>
            <Text style={styles.pinText}>{country}</Text>
          </View>
          {tags && tags.length > 0 ? (
            <View style={styles.chipsRow}>
              {tags.slice(0, 2).map(t => (
                <View key={t} style={styles.chip}>
                  <Text style={styles.chipText}>{t}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.compact, pressed && styles.pressed]}>
      <Image source={image} style={styles.compactImg} resizeMode="cover" />
      {onToggleSave ? (
        <SavedToggle
          size="sm"
          active={!!saved}
          onPress={onToggleSave}
          style={styles.compactBookmark}
        />
      ) : null}
      <View style={styles.compactBody}>
        <Text style={styles.compactTitle} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.pinRow}>
          <Text style={styles.pin}>📍</Text>
          <Text style={styles.pinText}>{country}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  compact: {
    width: 190,
    borderRadius: rounding.lg,
    overflow: 'hidden',
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.rim,
  },
  compactImg: {
    width: '100%',
    height: 120,
  },
  compactBookmark: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  compactBody: {
    padding: 12,
    gap: 4,
  },
  compactTitle: {
    ...typography.body,
    fontWeight: '700',
  },
  wide: {
    backgroundColor: palette.surface,
    borderRadius: rounding.lg,
    borderWidth: 1,
    borderColor: palette.rim,
    padding: 12,
    gap: 12,
  },
  wideTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wideTag: {
    backgroundColor: palette.accentSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounding.sm,
  },
  wideTagText: {
    ...typography.caption,
    color: palette.accent,
    fontWeight: '700',
  },
  wideImage: {
    width: '100%',
    height: 140,
    borderRadius: rounding.md,
  },
  wideBottom: {
    gap: 6,
  },
  wideTitle: {
    ...typography.heading,
  },
  pinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pin: {
    fontSize: 11,
  },
  pinText: {
    ...typography.caption,
    color: palette.textSecondary,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 2,
  },
  chip: {
    backgroundColor: palette.surfaceRaised,
    borderRadius: rounding.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: palette.rim,
  },
  chipText: {
    ...typography.caption,
    color: palette.textSecondary,
  },
  pressed: {
    opacity: 0.85,
  },
});
