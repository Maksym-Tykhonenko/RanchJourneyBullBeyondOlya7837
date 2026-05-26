import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenFrame} from '../widgets/ScreenFrame';
import {BackChip} from '../widgets/BackChip';
import {PrimaryAction} from '../widgets/PrimaryAction';
import {palette} from '../core/palette';
import {rounding} from '../core/layout';
import {typography} from '../core/typography';
import {RootStackParams} from '../routing/RouteTypes';

type Nav = NativeStackNavigationProp<RootStackParams, 'QuizIntro'>;

export const QuizIntroPanel: React.FC = () => {
  const navigation = useNavigation<Nav>();

  return (
    <ScreenFrame edges={['top', 'bottom']}>
      <View style={styles.header}>
        <BackChip onPress={() => navigation.goBack()} />
      </View>

      <View style={styles.center}>
        <View style={styles.emojiRing}>
          <Text style={styles.emoji}>🧠</Text>
        </View>
        <Text style={styles.title}>Ranch Quiz</Text>
        <Text style={styles.subtitle}>
          Answer 10 questions about ranch life, cattle breeds and farm animals. How well do you know the pasture?
        </Text>

        <View style={styles.metaCard}>
          <MetaCell icon="❓" value="10" label="Questions" />
          <View style={styles.divider} />
          <MetaCell icon="⏱" value="∞" label="Time" />
          <View style={styles.divider} />
          <MetaCell icon="⭐" value="★★" label="Difficulty" />
        </View>
      </View>

      <PrimaryAction
        label="Start Quiz"
        leading="⚡"
        onPress={() => navigation.navigate('QuizPlay')}
        style={{marginTop: 'auto'}}
      />
    </ScreenFrame>
  );
};

const MetaCell: React.FC<{icon: string; value: string; label: string}> = ({
  icon,
  value,
  label,
}) => (
  <View style={styles.metaCell}>
    <Text style={styles.metaIcon}>{icon}</Text>
    <Text style={styles.metaValue}>{value}</Text>
    <Text style={styles.metaLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    paddingVertical: 8,
  },
  center: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  emojiRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: palette.accent,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.accentSoft,
    shadowColor: palette.accent,
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  emoji: {
    fontSize: 56,
  },
  title: {
    ...typography.display,
    marginTop: 22,
  },
  subtitle: {
    ...typography.bodyMuted,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 10,
  },
  metaCard: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: palette.surface,
    borderRadius: rounding.md,
    borderWidth: 1,
    borderColor: palette.rim,
  },
  metaCell: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 2,
  },
  metaIcon: {
    fontSize: 14,
  },
  metaValue: {
    ...typography.body,
    fontWeight: '800',
  },
  metaLabel: {
    ...typography.caption,
    color: palette.textSecondary,
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: palette.rim,
  },
});
