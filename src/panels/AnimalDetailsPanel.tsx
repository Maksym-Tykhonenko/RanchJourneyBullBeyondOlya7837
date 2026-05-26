import React from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BackChip} from '../widgets/BackChip';
import {FadeInView} from '../widgets/FadeInView';
import {palette} from '../core/palette';
import {rounding, screen} from '../core/layout';
import {typography} from '../core/typography';
import {getAnimalById} from '../domain/registry/animalsRegistry';
import {RootStackParams} from '../routing/RouteTypes';

type Nav = NativeStackNavigationProp<RootStackParams, 'AnimalDetails'>;
type Rt = RouteProp<RootStackParams, 'AnimalDetails'>;

export const AnimalDetailsPanel: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const animal = getAnimalById(route.params.animalId);

  if (!animal) {
    return (
      <View style={styles.root}>
        <Text style={typography.body}>Animal not found.</Text>
      </View>
    );
  }

  const share = async () => {
    try {
      await Share.share({
        message: `${animal.name} (${animal.scientificName}) — origin: ${animal.origin}.`,
      });
    } catch {
      Alert.alert('Unable to share');
    }
  };

  const stats: Array<{icon: string; label: string; value: string}> = [
    {icon: '⚖️', label: 'Weight', value: animal.weight},
    {icon: '📏', label: 'Height', value: animal.height},
    {icon: '⏳', label: 'Lifespan', value: animal.lifespan},
    {icon: '🚩', label: 'Origin', value: animal.origin},
    {icon: '🎨', label: 'Color', value: animal.color},
    {icon: '💛', label: 'Temperament', value: animal.temperament},
  ];

  return (
    <View style={styles.root}>
      <Image source={animal.image} style={styles.hero} resizeMode="cover" />
      <View style={styles.overlay} />
      <FadeInView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <View style={styles.topControls}>
          <BackChip onPress={() => navigation.goBack()} />
          <Pressable
            onPress={share}
            hitSlop={8}
            style={({pressed}) => [styles.shareBtn, pressed && {opacity: 0.85}]}>
            <Text style={styles.shareIcon}>⇪</Text>
          </Pressable>
        </View>
        <View style={{height: 240}} />
        <View style={styles.card}>
          <Text style={styles.name}>{animal.name}</Text>
          <Text style={styles.scientific}>{animal.scientificName}</Text>

          <View style={styles.statsGrid}>
            {stats.map(s => (
              <View key={s.label} style={styles.statBox}>
                <Text style={styles.statIcon}>{s.icon}</Text>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.body}>{animal.description}</Text>

          <Text style={styles.sectionTitle}>Fun Facts</Text>
          <View style={{gap: 10}}>
            {animal.funFacts.map((f, i) => (
              <View key={`ff-${i}`} style={styles.factRow}>
                <Text style={styles.factStar}>✨</Text>
                <Text style={styles.factText}>{f}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      </FadeInView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.backdrop,
  },
  hero: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 340,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 340,
    backgroundColor: 'rgba(8, 10, 34, 0.25)',
  },
  scroll: {
    paddingBottom: 40,
  },
  topControls: {
    paddingTop: 56,
    paddingHorizontal: screen.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shareBtn: {
    width: 40,
    height: 40,
    borderRadius: rounding.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.rim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    color: palette.textPrimary,
    fontSize: 18,
  },
  card: {
    backgroundColor: palette.backdrop,
    borderTopLeftRadius: rounding.xxl,
    borderTopRightRadius: rounding.xxl,
    padding: screen.padding,
  },
  name: {
    ...typography.display,
  },
  scientific: {
    ...typography.bodyMuted,
    fontStyle: 'italic',
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 18,
  },
  statBox: {
    flexBasis: '48%',
    flexGrow: 1,
    borderRadius: rounding.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.rim,
    padding: 12,
    gap: 4,
  },
  statIcon: {
    fontSize: 16,
  },
  statValue: {
    ...typography.body,
    fontWeight: '700',
  },
  statLabel: {
    ...typography.caption,
    color: palette.textSecondary,
  },
  sectionTitle: {
    ...typography.heading,
    marginTop: 22,
    marginBottom: 8,
  },
  body: {
    ...typography.bodyMuted,
  },
  factRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: palette.surface,
    borderRadius: rounding.md,
    padding: 12,
    borderWidth: 1,
    borderColor: palette.rim,
  },
  factStar: {
    fontSize: 14,
    marginTop: 2,
  },
  factText: {
    ...typography.bodyMuted,
    flex: 1,
  },
});
