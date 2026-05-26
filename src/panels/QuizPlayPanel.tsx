import React, {useMemo, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenFrame} from '../widgets/ScreenFrame';
import {BackChip} from '../widgets/BackChip';
import {PrimaryAction} from '../widgets/PrimaryAction';
import {palette} from '../core/palette';
import {rounding} from '../core/layout';
import {typography} from '../core/typography';
import {drawQuestions} from '../domain/registry/quizRegistry';
import {RootStackParams} from '../routing/RouteTypes';

type Nav = NativeStackNavigationProp<RootStackParams, 'QuizPlay'>;

export const QuizPlayPanel: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const questions = useMemo(() => drawQuestions(10), []);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [review, setReview] = useState<Array<{text: string; correct: boolean}>>([]);

  const current = questions[index];
  const total = questions.length;
  const progress = (index + (picked ? 1 : 0)) / total;

  const choose = (key: string) => {
    if (picked) {
      return;
    }
    setPicked(key);
    const opt = current.options.find(o => o.key === key);
    if (opt?.correct) {
      setScore(s => s + 1);
    }
    setReview(r => [...r, {text: current.text, correct: !!opt?.correct}]);
  };

  const goNext = () => {
    if (index < total - 1) {
      setIndex(i => i + 1);
      setPicked(null);
    } else {
      navigation.replace('QuizResults', {
        score,
        total,
        review,
      });
    }
  };

  return (
    <ScreenFrame edges={['top', 'bottom']}>
      <View style={styles.headerRow}>
        <BackChip onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Ranch Quiz</Text>
        <View style={styles.headerSpacer} />
      </View>

      <Text style={styles.counter}>Question {index + 1} of {total}</Text>
      <View style={styles.progressOuter}>
        <View style={[styles.progressInner, {width: `${progress * 100}%`}]} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.question}>{current.text}</Text>
        </View>

        <View style={styles.options}>
          {current.options.map(opt => {
            const isPicked = picked === opt.key;
            const showCorrect = !!picked && opt.correct;
            const showWrong = isPicked && !opt.correct;
            return (
              <Pressable
                key={opt.key}
                onPress={() => choose(opt.key)}
                disabled={!!picked}
                style={({pressed}) => [
                  styles.option,
                  showCorrect && styles.optionCorrect,
                  showWrong && styles.optionWrong,
                  pressed && !picked && {opacity: 0.9},
                ]}>
                <View style={styles.optionKey}>
                  <Text style={styles.optionKeyText}>{opt.key}</Text>
                </View>
                <Text style={styles.optionLabel}>{opt.label}</Text>
              </Pressable>
            );
          })}
        </View>

        {picked ? (
          <View style={styles.explanation}>
            <Text style={styles.explanationLabel}>💡 DID YOU KNOW</Text>
            <Text style={styles.explanationBody}>{current.explanation}</Text>
          </View>
        ) : null}
      </ScrollView>

      {picked ? (
        <PrimaryAction
          label={index === total - 1 ? 'Finish' : 'Next Question'}
          trailing="›"
          onPress={goNext}
        />
      ) : null}
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
  headerSpacer: {
    width: 40,
    height: 40,
  },
  counter: {
    ...typography.caption,
    color: palette.textSecondary,
    marginTop: 4,
  },
  progressOuter: {
    height: 4,
    backgroundColor: palette.surface,
    borderRadius: rounding.pill,
    overflow: 'hidden',
    marginTop: 6,
  },
  progressInner: {
    height: '100%',
    backgroundColor: palette.accent,
  },
  scroll: {
    paddingTop: 18,
    paddingBottom: 20,
    gap: 14,
  },
  card: {
    minHeight: 120,
    backgroundColor: palette.surface,
    borderRadius: rounding.lg,
    borderWidth: 1,
    borderColor: palette.rim,
    padding: 18,
    justifyContent: 'center',
  },
  question: {
    ...typography.heading,
  },
  options: {
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: palette.surface,
    borderRadius: rounding.md,
    borderWidth: 1,
    borderColor: palette.rim,
    padding: 14,
  },
  optionCorrect: {
    borderColor: palette.success,
    backgroundColor: 'rgba(74, 224, 160, 0.10)',
  },
  optionWrong: {
    borderColor: palette.danger,
    backgroundColor: 'rgba(240, 98, 99, 0.10)',
  },
  optionKey: {
    width: 28,
    height: 28,
    borderRadius: rounding.pill,
    backgroundColor: palette.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionKeyText: {
    ...typography.caption,
    fontWeight: '800',
    color: palette.accent,
  },
  optionLabel: {
    ...typography.body,
    flex: 1,
  },
  explanation: {
    backgroundColor: palette.surface,
    borderRadius: rounding.md,
    borderWidth: 1,
    borderColor: palette.rim,
    padding: 14,
    gap: 6,
  },
  explanationLabel: {
    ...typography.caption,
    color: palette.accent,
    fontWeight: '800',
    letterSpacing: 1,
  },
  explanationBody: {
    ...typography.bodyMuted,
  },
});
