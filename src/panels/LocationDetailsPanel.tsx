import React from 'react';
import {
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BackChip} from '../widgets/BackChip';
import {PrimaryAction} from '../widgets/PrimaryAction';
import {SavedToggle} from '../widgets/SavedToggle';
import {FadeInView} from '../widgets/FadeInView';
import {palette} from '../core/palette';
import {rounding, screen} from '../core/layout';
import {typography} from '../core/typography';
import {getLocationById} from '../domain/registry/locationsRegistry';
import {useSavedRegistry} from '../state/SavedRegistryContext';
import {RootStackParams} from '../routing/RouteTypes';

type Nav = NativeStackNavigationProp<RootStackParams, 'LocationDetails'>;
type Rt = RouteProp<RootStackParams, 'LocationDetails'>;

export const LocationDetailsPanel: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const location = getLocationById(route.params.locationId);
  const {isLocationSaved, toggleLocation} = useSavedRegistry();

  if (!location) {
    return (
      <View style={styles.root}>
        <Text style={typography.body}>Location not found.</Text>
      </View>
    );
  }

  const saved = isLocationSaved(location.id);

  const openMap = async () => {
    const {latitude, longitude, name} = location;
    const label = encodeURIComponent(name);
    const geo = Platform.select({
      ios: `maps:0,0?q=${label}@${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${label})`,
    });
    const web = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    try {
      const canOpen = geo ? await Linking.canOpenURL(geo) : false;
      await Linking.openURL(canOpen && geo ? geo : web);
    } catch {
      Alert.alert('Unable to open map');
    }
  };

  return (
    <View style={styles.root}>
      <Image source={location.image} style={styles.hero} resizeMode="cover" />
      <View style={styles.overlay} />
      <FadeInView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <View style={styles.topControls}>
          <BackChip onPress={() => navigation.goBack()} />
          <SavedToggle
            size="sm"
            active={saved}
            onPress={() => toggleLocation(location.id)}
          />
        </View>
        <View style={{height: 180}} />
        <View style={styles.card}>
          <View style={styles.typeTag}>
            <Text style={styles.typeTagText}>Ranch</Text>
          </View>
          <Text style={styles.title}>{location.name}</Text>
          <View style={styles.pinRow}>
            <Text style={styles.pin}>📍</Text>
            <Text style={styles.pinText}>
              {location.city}
              {location.city && location.country ? ', ' : ''}
              {location.country}
            </Text>
          </View>

          <View style={styles.tagsRow}>
            {location.tags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>🏷 {tag}</Text>
              </View>
            ))}
          </View>

          <SectionTitle>About</SectionTitle>
          <Text style={styles.body}>{location.description}</Text>

          <SectionTitle>Interesting Facts</SectionTitle>
          <View style={{gap: 10}}>
            {location.facts.map((fact, i) => (
              <View key={`f-${i}`} style={styles.factRow}>
                <View style={styles.factNum}>
                  <Text style={styles.factNumText}>{i + 1}</Text>
                </View>
                <Text style={styles.factText}>{fact}</Text>
              </View>
            ))}
          </View>

          <SectionTitle>Visit Info</SectionTitle>
          <View style={styles.visitBox}>
            <Text style={styles.visitIcon}>🕒</Text>
            <Text style={styles.visitText}>{location.visitInfo}</Text>
          </View>

          <PrimaryAction
            label="Show on Map"
            leading="🗺️"
            onPress={openMap}
            style={{marginTop: 16}}
          />
        </View>
      </ScrollView>
      </FadeInView>
    </View>
  );
};

const SectionTitle: React.FC<{children: React.ReactNode}> = ({children}) => (
  <Text style={styles.sectionTitle}>{children}</Text>
);

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
    height: 320,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 320,
    backgroundColor: 'rgba(8, 10, 34, 0.35)',
  },
  scroll: {
    paddingBottom: 40,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 56,
    paddingHorizontal: screen.padding,
  },
  card: {
    backgroundColor: palette.backdrop,
    borderTopLeftRadius: rounding.xxl,
    borderTopRightRadius: rounding.xxl,
    padding: screen.padding,
    gap: 10,
  },
  typeTag: {
    alignSelf: 'flex-start',
    backgroundColor: palette.accentSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounding.sm,
    marginBottom: 6,
  },
  typeTagText: {
    ...typography.caption,
    color: palette.accent,
    fontWeight: '700',
  },
  title: {
    ...typography.display,
  },
  pinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pin: {
    fontSize: 12,
  },
  pinText: {
    ...typography.bodyMuted,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  tag: {
    backgroundColor: palette.surface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: rounding.pill,
    borderWidth: 1,
    borderColor: palette.rim,
  },
  tagText: {
    ...typography.caption,
    color: palette.textSecondary,
  },
  sectionTitle: {
    ...typography.heading,
    marginTop: 18,
    marginBottom: 8,
  },
  body: {
    ...typography.bodyMuted,
    color: palette.textSecondary,
  },
  factRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: palette.surface,
    borderRadius: rounding.md,
    padding: 12,
    borderWidth: 1,
    borderColor: palette.rim,
  },
  factNum: {
    width: 24,
    height: 24,
    borderRadius: rounding.pill,
    backgroundColor: palette.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  factNumText: {
    ...typography.caption,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  factText: {
    ...typography.bodyMuted,
    flex: 1,
  },
  visitBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 14,
    backgroundColor: palette.surface,
    borderRadius: rounding.md,
    borderWidth: 1,
    borderColor: palette.rim,
  },
  visitIcon: {
    fontSize: 14,
    marginTop: 2,
  },
  visitText: {
    ...typography.bodyMuted,
    flex: 1,
  },
});
