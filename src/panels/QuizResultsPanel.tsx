import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenFrame} from '../widgets/ScreenFrame';
import {BackChip} from '../widgets/BackChip';
import {PrimaryAction} from '../widgets/PrimaryAction';
import {palette} from '../core/palette';
import {rounding} from '../core/layout';
import {typography} from '../core/typography';
import {RootStackParams} from '../routing/RouteTypes';

type Nav = NativeStackNavigationProp<RootStackParams, 'QuizResults'>;
type Rt = RouteProp<RootStackParams, 'QuizResults'>;

export const QuizResultsPanel: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const {score, total, review} = route.params;
  const percent = Math.round((score / total) * 100);
  const perfect = score === total;
  const tagline = perfect
    ? 'Outstanding! Perfect Score!'
    : score >= total * 0.7
      ? '🏆 Great Job!'
      : '💪 Keep Practicing!';

  return (
    <ScreenFrame edges={['top', 'bottom']}>
      <View style={styles.headerRow}>
        <BackChip onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Quiz Results</Text>
        <View style={{width: 40}} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <View style={styles.scoreRing}>
          <Text style={styles.scoreValue}>{score}</Text>
          <View style={styles.scoreDivider} />
          <Text style={styles.scoreTotal}>{total}</Text>
        </View>
        <Text style={styles.tagline}>{tagline}</Text>
        <Text style={styles.percent}>You scored {percent}%</Text>

        <Text style={styles.reviewTitle}>Answer Review</Text>
        <View style={{gap: 8}}>
          {review.map((r, i) => (
            <View key={`r-${i}`} style={styles.reviewRow}>
              <View
                style={[
                  styles.reviewIcon,
                  {
                    backgroundColor: r.correct
                      ? 'rgba(74, 224, 160, 0.18)'
                      : 'rgba(240, 98, 99, 0.18)',
                    borderColor: r.correct ? palette.success : palette.danger,
                  },
                ]}>
                <Text style={{fontSize: 12}}>{r.correct ? '✓' : '✕'}</Text>
              </View>
              <Text style={styles.reviewText} numberOfLines={2}>
                {r.text}
              </Text>
            </View>
          ))}
        </View>

        <PrimaryAction
          label="Back to Facts"
          leading="←"
          variant="secondary"
          style={{marginTop: 24}}
          onPress={() =>
            navigation.reset({index: 0, routes: [{name: 'Hub'}]})
          }
        />
      </ScrollView>
    </ScreenFrame>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  headerTitle: {
    ...typography.heading,
  },
  scroll: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  scoreRing: {
    alignSelf: 'center',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: palette.accent,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.accentSoft,
    shadowColor: palette.accent,
    shadowOpacity: 0.5,
    shadowRadius: 22,
  },
  scoreValue: {
    fontSize: 56,
    lineHeight: 64,
    fontWeight: '800',
    color: palette.accent,
    textAlign: 'center',
    includeFontPadding: false,
  },
  scoreDivider: {
    width: 60,
    height: 1,
    backgroundColor: palette.rim,
    marginVertical: 4,
  },
  scoreTotal: {
    ...typography.bodyMuted,
    color: palette.textSecondary,
  },
  tagline: {
    ...typography.title,
    textAlign: 'center',
    marginTop: 18,
  },
  percent: {
    ...typography.bodyMuted,
    textAlign: 'center',
    marginTop: 4,
  },
  reviewTitle: {
    ...typography.heading,
    marginTop: 28,
    marginBottom: 12,
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: palette.surface,
    padding: 12,
    borderRadius: rounding.md,
    borderWidth: 1,
    borderColor: palette.rim,
  },
  reviewIcon: {
    width: 24,
    height: 24,
    borderRadius: rounding.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewText: {
    ...typography.bodyMuted,
    flex: 1,
  },
});
