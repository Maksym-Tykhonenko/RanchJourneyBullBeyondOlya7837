import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenFrame} from '../widgets/ScreenFrame';
import {BrandHeader} from '../widgets/BrandHeader';
import {PrimaryAction} from '../widgets/PrimaryAction';
import {palette} from '../core/palette';
import {rounding} from '../core/layout';
import {typography} from '../core/typography';
import {useGameScore} from '../state/GameScoreContext';
import {RootStackParams} from '../routing/RouteTypes';

type Nav = NativeStackNavigationProp<RootStackParams>;

const howCards = [
  {icon: '🐂', title: 'Control Your Bull', body: 'Move left and right to catch items'},
  {icon: '🌾', title: 'Collect Good Food', body: 'Hay, apples, carrots give you points'},
  {icon: '⚡', title: 'Avoid Hazards', body: 'Dodge rocks, cacti and snakes'},
  {icon: '🏆', title: 'Beat Your Score', body: 'Compete to reach the top score'},
];

const itemsGuide: Array<{icon: string; label: string; pts: number}> = [
  {icon: '🌾', label: 'Hay Bale', pts: 10},
  {icon: '🍎', label: 'Apple', pts: 5},
  {icon: '🥕', label: 'Carrot', pts: 8},
  {icon: '💧', label: 'Water', pts: 12},
  {icon: '🪨', label: 'Rock', pts: -20},
  {icon: '🌵', label: 'Cactus', pts: -15},
  {icon: '🐍', label: 'Snake', pts: -10},
];

export const RanchSprintIntroPanel: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {best} = useGameScore();

  return (
    <ScreenFrame withHubBar edges={['top']}>
      <BrandHeader brand="Mini Game" icon="🎮" />
      <Text style={styles.title}>Ranch Sprint</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <View style={styles.heroBanner}>
          <View style={styles.heroPill}>
            <Text style={styles.heroPillText}>🎮 ARCADE GAME</Text>
          </View>
          <Text style={styles.heroTitle}>Ranch Sprint</Text>
          <Text style={styles.heroSub}>Catch food, dodge hazards!</Text>
          <Text style={styles.heroEmoji}>🐂</Text>
        </View>

        <Text style={styles.section}>How to Play</Text>
        <View style={styles.grid}>
          {howCards.map(c => (
            <View key={c.title} style={styles.card}>
              <Text style={styles.cardIcon}>{c.icon}</Text>
              <Text style={styles.cardTitle}>{c.title}</Text>
              <Text style={styles.cardBody}>{c.body}</Text>
            </View>
          ))}
        </View>

        <PrimaryAction
          label="Play"
          leading="▶"
          onPress={() => navigation.navigate('RanchSprintPlay')}
          style={{marginTop: 18}}
        />

        <Text style={styles.section}>Items Guide</Text>
        <View style={styles.itemsCard}>
          {itemsGuide.map(item => (
            <View key={item.label} style={styles.itemRow}>
              <Text style={styles.itemIcon}>{item.icon}</Text>
              <Text style={styles.itemLabel}>{item.label}</Text>
              <View
                style={[
                  styles.itemPoints,
                  {
                    backgroundColor:
                      item.pts > 0
                        ? 'rgba(74, 224, 160, 0.16)'
                        : 'rgba(240, 98, 99, 0.16)',
                  },
                ]}>
                <Text
                  style={{
                    ...typography.caption,
                    fontWeight: '800',
                    color: item.pts > 0 ? palette.success : palette.danger,
                  }}>
                  {item.pts > 0 ? `+${item.pts}` : `${item.pts}`} pts
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.bestRow}>
          <Text style={styles.bestLabel}>🏆 Best Score</Text>
          <Text style={styles.bestValue}>{best}</Text>
        </View>
      </ScrollView>
    </ScreenFrame>
  );
};

const styles = StyleSheet.create({
  title: {
    ...typography.display,
    marginBottom: 14,
  },
  scroll: {
    gap: 14,
    paddingBottom: 30,
  },
  heroBanner: {
    backgroundColor: 'rgba(138,127,252,0.16)',
    borderRadius: rounding.lg,
    borderWidth: 1,
    borderColor: palette.accent,
    padding: 16,
    overflow: 'hidden',
  },
  heroPill: {
    alignSelf: 'flex-start',
    backgroundColor: palette.accentSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounding.sm,
  },
  heroPillText: {
    ...typography.caption,
    color: palette.accent,
    fontWeight: '800',
    letterSpacing: 1,
  },
  heroTitle: {
    ...typography.title,
    marginTop: 8,
  },
  heroSub: {
    ...typography.bodyMuted,
    marginTop: 4,
  },
  heroEmoji: {
    position: 'absolute',
    right: 16,
    bottom: 14,
    fontSize: 64,
  },
  section: {
    ...typography.heading,
    marginTop: 6,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    flexBasis: '48%',
    flexGrow: 1,
    backgroundColor: palette.surface,
    borderRadius: rounding.md,
    borderWidth: 1,
    borderColor: palette.rim,
    padding: 12,
    gap: 4,
  },
  cardIcon: {
    fontSize: 22,
  },
  cardTitle: {
    ...typography.body,
    fontWeight: '800',
  },
  cardBody: {
    ...typography.caption,
    color: palette.textSecondary,
  },
  itemsCard: {
    backgroundColor: palette.surface,
    borderRadius: rounding.md,
    borderWidth: 1,
    borderColor: palette.rim,
    padding: 14,
    gap: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemIcon: {
    fontSize: 18,
    width: 28,
    textAlign: 'center',
  },
  itemLabel: {
    ...typography.body,
    flex: 1,
  },
  itemPoints: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounding.sm,
  },
  bestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: palette.surface,
    padding: 14,
    borderRadius: rounding.md,
    borderWidth: 1,
    borderColor: palette.rim,
  },
  bestLabel: {
    ...typography.body,
    fontWeight: '700',
  },
  bestValue: {
    ...typography.title,
    color: palette.accent,
  },
});
