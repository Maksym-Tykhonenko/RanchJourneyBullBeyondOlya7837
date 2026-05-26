import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {palette} from '../core/palette';
import {rounding} from '../core/layout';
import {typography} from '../core/typography';

type Props = {
  emoji: string;
  category: string;
  title: string;
  body?: string;
  expanded?: boolean;
  onPress?: () => void;
};

export const FactCard: React.FC<Props> = ({
  emoji,
  category,
  title,
  body,
  expanded,
  onPress,
}) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [
      styles.card,
      expanded && styles.cardExpanded,
      pressed && {opacity: 0.9},
    ]}>
    <View style={styles.topRow}>
      <View style={styles.emojiWrap}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <View style={styles.headBody}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.title} numberOfLines={expanded ? undefined : 2}>
          {title}
        </Text>
      </View>
      <Text style={styles.chevron}>{expanded ? '⌃' : '⌄'}</Text>
    </View>
    {expanded && body ? <Text style={styles.body}>{body}</Text> : null}
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surface,
    borderRadius: rounding.lg,
    borderWidth: 1,
    borderColor: palette.rim,
    padding: 14,
    gap: 12,
  },
  cardExpanded: {
    borderColor: palette.accent,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  emojiWrap: {
    width: 44,
    height: 44,
    borderRadius: rounding.md,
    backgroundColor: palette.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 20,
  },
  headBody: {
    flex: 1,
  },
  category: {
    ...typography.caption,
    color: palette.accent,
    fontWeight: '700',
    marginBottom: 2,
  },
  title: {
    ...typography.subheading,
  },
  chevron: {
    color: palette.textMuted,
    fontSize: 18,
    fontWeight: '700',
  },
  body: {
    ...typography.bodyMuted,
    backgroundColor: palette.surfaceSoft,
    padding: 10,
    borderRadius: rounding.md,
  },
});
