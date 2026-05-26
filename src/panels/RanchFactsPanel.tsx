import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenFrame} from '../widgets/ScreenFrame';
import {BrandHeader} from '../widgets/BrandHeader';
import {FactCard} from '../widgets/FactCard';
import {palette} from '../core/palette';
import {rounding} from '../core/layout';
import {typography} from '../core/typography';
import {factsRegistry} from '../domain/registry/factsRegistry';
import {RootStackParams} from '../routing/RouteTypes';

type Nav = NativeStackNavigationProp<RootStackParams>;

export const RanchFactsPanel: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ScreenFrame withHubBar edges={['top']}>
      <BrandHeader brand="Knowledge Hub" icon="📖" />
      <Text style={styles.title}>Ranch Facts</Text>

      <Pressable
        onPress={() => navigation.navigate('QuizIntro')}
        style={({pressed}) => [styles.quizBanner, pressed && {opacity: 0.95}]}>
        <View style={styles.quizIcon}>
          <Text style={styles.quizIconText}>⚡</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.quizTitle}>Test Your Knowledge</Text>
          <Text style={styles.quizSubtitle}>
            10 questions · Ranch & Cattle Quiz
          </Text>
        </View>
        <View style={styles.quizCta}>
          <Text style={styles.quizCtaText}>Start</Text>
        </View>
      </Pressable>

      <View style={styles.kickerRow}>
        <Text style={styles.kicker}>📚 facts about ranch animals</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}>
        {factsRegistry.map(fact => (
          <FactCard
            key={fact.id}
            emoji={fact.emoji}
            category={fact.category}
            title={fact.title}
            body={fact.body}
            expanded={openId === fact.id}
            onPress={() => setOpenId(openId === fact.id ? null : fact.id)}
          />
        ))}
      </ScrollView>
    </ScreenFrame>
  );
};

const styles = StyleSheet.create({
  title: {
    ...typography.display,
    marginBottom: 14,
  },
  quizBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: palette.surface,
    borderRadius: rounding.lg,
    borderWidth: 1,
    borderColor: palette.rim,
    padding: 14,
    marginBottom: 18,
  },
  quizIcon: {
    width: 44,
    height: 44,
    borderRadius: rounding.md,
    backgroundColor: palette.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizIconText: {
    fontSize: 18,
  },
  quizTitle: {
    ...typography.body,
    fontWeight: '700',
  },
  quizSubtitle: {
    ...typography.caption,
    color: palette.textSecondary,
  },
  quizCta: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: rounding.pill,
    backgroundColor: palette.accent,
  },
  quizCtaText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  kickerRow: {
    marginBottom: 10,
  },
  kicker: {
    ...typography.caption,
    color: palette.textMuted,
  },
  list: {
    gap: 10,
    paddingBottom: 24,
  },
});
