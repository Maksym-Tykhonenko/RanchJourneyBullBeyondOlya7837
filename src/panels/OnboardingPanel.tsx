import React, {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {palette} from '../core/palette';
import {rounding, screen} from '../core/layout';
import {typography} from '../core/typography';
import {PrimaryAction} from '../widgets/PrimaryAction';
import {FadeInView} from '../widgets/FadeInView';
import {onboardingSlides} from '../domain/registry/onboardingRegistry';
import {useOnboardingGate} from '../state/OnboardingGateContext';
import {RootStackParams} from '../routing/RouteTypes';

type Nav = NativeStackNavigationProp<RootStackParams, 'Onboarding'>;

export const OnboardingPanel: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {markPassed} = useOnboardingGate();
  const {width, height} = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const compact = height < 720;
  const imageHeight = Math.min(height * (compact ? 0.32 : 0.4), 320);
  const titleSize = compact ? 22 : 26;

  const onMomentum = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / width);
    if (next !== index) {
      setIndex(next);
    }
  };

  const finish = () => {
    markPassed();
    navigation.reset({index: 0, routes: [{name: 'Hub'}]});
  };

  const goNext = () => {
    if (index < onboardingSlides.length - 1) {
      listRef.current?.scrollToIndex({index: index + 1});
      setIndex(index + 1);
    } else {
      finish();
    }
  };

  const slide = onboardingSlides[index];

  return (
    <ImageBackground
      source={require('../assets/brand/splash_scene.png')}
      style={styles.root}
      resizeMode="cover">
      <View style={styles.overlay} />
      <FadeInView style={styles.fade}>
        <View style={[styles.topRow, {paddingTop: compact ? 36 : 52}]}>
          <View style={styles.brandRow}>
            <View style={styles.brandLogo}>
              <Text style={{fontSize: 14}}>🐂</Text>
            </View>
            <Text style={styles.brand}>Ranch Journey</Text>
          </View>
          {index < onboardingSlides.length - 1 ? (
            <Text style={styles.skip} onPress={finish}>
              Skip
            </Text>
          ) : null}
        </View>

        <FlatList
          ref={listRef}
          data={onboardingSlides}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentum}
          renderItem={({item, index: i}) => (
            <ScrollView
              style={{width}}
              contentContainerStyle={[
                styles.slide,
                {paddingHorizontal: screen.padding},
              ]}
              showsVerticalScrollIndicator={false}>
              <View style={[styles.imageCard, {height: imageHeight}]}>
                <Image source={item.image} style={styles.image} resizeMode="cover" />
                <View style={styles.counter}>
                  <Text style={styles.counterText}>
                    {i + 1} / {onboardingSlides.length}
                  </Text>
                </View>
              </View>
              <Text style={[styles.title, {fontSize: titleSize}]}>
                {item.title}
              </Text>
              <Text style={styles.subtitle} numberOfLines={compact ? 4 : undefined}>
                {item.subtitle}
              </Text>
              <View style={styles.highlight}>
                <View style={styles.highlightIcon}>
                  <Text style={{fontSize: 14}}>{item.highlightIcon}</Text>
                </View>
                <Text style={styles.highlightText}>{item.highlight}</Text>
              </View>
            </ScrollView>
          )}
        />

        <View style={[styles.dots, {marginVertical: compact ? 10 : 14}]}>
          {onboardingSlides.map((s, i) => (
            <View key={s.id} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>

        <View
          style={[
            styles.ctaWrap,
            {paddingBottom: compact ? 18 : 32},
          ]}>
          <PrimaryAction label={slide.cta} trailing="›" onPress={goNext} />
        </View>
      </FadeInView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.backdropDeep,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(8, 10, 34, 0.55)',
  },
  fade: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: screen.padding,
    marginBottom: 8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandLogo: {
    width: 28,
    height: 28,
    borderRadius: rounding.sm,
    backgroundColor: palette.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    color: palette.textPrimary,
    fontWeight: '700',
  },
  skip: {
    color: palette.textSecondary,
    fontWeight: '600',
  },
  slide: {
    gap: 12,
    paddingBottom: 8,
  },
  imageCard: {
    width: '100%',
    borderRadius: rounding.lg,
    overflow: 'hidden',
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.rim,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  counter: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: 'rgba(8, 10, 34, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: rounding.sm,
  },
  counterText: {
    ...typography.caption,
    color: palette.textPrimary,
    fontWeight: '700',
  },
  title: {
    ...typography.display,
    marginTop: 4,
  },
  subtitle: {
    ...typography.bodyMuted,
  },
  highlight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: rounding.md,
    borderWidth: 1,
    borderColor: palette.accent,
    backgroundColor: palette.accentSoft,
  },
  highlightIcon: {
    width: 30,
    height: 30,
    borderRadius: rounding.sm,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightText: {
    ...typography.bodyMuted,
    color: palette.accent,
    fontWeight: '600',
    flex: 1,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: rounding.pill,
    backgroundColor: palette.rim,
  },
  dotActive: {
    width: 24,
    backgroundColor: palette.accent,
  },
  ctaWrap: {
    paddingHorizontal: screen.padding,
  },
});
