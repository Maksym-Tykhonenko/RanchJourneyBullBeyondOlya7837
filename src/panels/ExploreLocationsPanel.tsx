import React, {useMemo, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenFrame} from '../widgets/ScreenFrame';
import {BrandHeader} from '../widgets/BrandHeader';
import {LocationTile} from '../widgets/LocationTile';
import {SegmentedTabs} from '../widgets/SegmentedTabs';
import {EmptyHint} from '../widgets/EmptyHint';
import {palette} from '../core/palette';
import {rounding} from '../core/layout';
import {typography} from '../core/typography';
import {locationsRegistry} from '../domain/registry/locationsRegistry';
import {useSavedRegistry} from '../state/SavedRegistryContext';
import {RootStackParams} from '../routing/RouteTypes';

type Nav = NativeStackNavigationProp<RootStackParams>;

export const ExploreLocationsPanel: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {isLocationSaved, toggleLocation, locations: savedIds} = useSavedRegistry();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'all' | 'saved'>('all');

  const topLocations = locationsRegistry.filter(l => l.topPick);

  const visible = useMemo(() => {
    const pool =
      tab === 'saved'
        ? locationsRegistry.filter(l => savedIds.includes(l.id))
        : locationsRegistry;
    const q = query.trim().toLowerCase();
    if (!q) {
      return pool;
    }
    return pool.filter(
      l =>
        l.name.toLowerCase().includes(q) ||
        l.country.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q),
    );
  }, [tab, query, savedIds]);

  return (
    <ScreenFrame withHubBar edges={['top']}>
      <BrandHeader />
      <Text style={styles.welcome}>Welcome back!</Text>
      <Text style={styles.title}>Explore Locations</Text>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔎</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search ranches, farms..."
          placeholderTextColor={palette.textMuted}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Top Locations</Text>
        <Text style={styles.editors}>⭐ Editor’s Choice</Text>
      </View>

      <FlatList
        data={topLocations}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topList}
        renderItem={({item}) => (
          <LocationTile
            title={item.name}
            country={item.city.split(',')[1]?.trim() || item.country}
            image={item.image}
            saved={isLocationSaved(item.id)}
            onToggleSave={() => toggleLocation(item.id)}
            onPress={() =>
              navigation.navigate('LocationDetails', {locationId: item.id})
            }
          />
        )}
      />

      <SegmentedTabs
        style={styles.segments}
        value={tab}
        items={[
          {key: 'all', label: 'All Locations', counter: locationsRegistry.length},
          {key: 'saved', label: 'Saved', counter: savedIds.length},
        ]}
        onChange={k => setTab(k as 'all' | 'saved')}
      />

      <FlatList
        data={visible}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <LocationTile
            variant="wide"
            title={item.name}
            country={item.city.split(',')[1]?.trim() || item.country}
            image={item.image}
            tags={item.tags}
            saved={isLocationSaved(item.id)}
            onToggleSave={() => toggleLocation(item.id)}
            onPress={() =>
              navigation.navigate('LocationDetails', {locationId: item.id})
            }
          />
        )}
        ListEmptyComponent={
          <EmptyHint
            icon={tab === 'saved' ? '🔖' : '🔍'}
            title={tab === 'saved' ? 'No saved locations' : 'Nothing found'}
            subtitle={
              tab === 'saved'
                ? 'Tap the bookmark icon on any location to save it here'
                : 'Try a different search'
            }
          />
        }
      />
    </ScreenFrame>
  );
};

const styles = StyleSheet.create({
  welcome: {
    ...typography.caption,
    color: palette.textSecondary,
    marginTop: 4,
  },
  title: {
    ...typography.display,
    marginTop: 2,
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: palette.surface,
    borderRadius: rounding.md,
    borderWidth: 1,
    borderColor: palette.rim,
    paddingHorizontal: 14,
    height: 46,
    marginBottom: 18,
  },
  searchIcon: {
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
    color: palette.textPrimary,
  },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    ...typography.heading,
  },
  editors: {
    ...typography.caption,
    color: palette.accent,
    fontWeight: '700',
  },
  topList: {
    gap: 12,
    paddingBottom: 6,
  },
  segments: {
    marginTop: 18,
    marginBottom: 14,
  },
  listContent: {
    gap: 12,
    paddingBottom: 20,
  },
});
