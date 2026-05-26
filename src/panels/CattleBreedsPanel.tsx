import React, {useMemo, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenFrame} from '../widgets/ScreenFrame';
import {BrandHeader} from '../widgets/BrandHeader';
import {SegmentedTabs} from '../widgets/SegmentedTabs';
import {AnimalTile} from '../widgets/AnimalTile';
import {EmptyHint} from '../widgets/EmptyHint';
import {PrimaryAction} from '../widgets/PrimaryAction';
import {ModalCard} from '../widgets/ModalCard';
import {palette} from '../core/palette';
import {rounding, screen} from '../core/layout';
import {typography} from '../core/typography';
import {
  animalsRegistry,
  animalCategoryFilters,
} from '../domain/registry/animalsRegistry';
import {useMyAnimals} from '../state/MyAnimalsContext';
import {RootStackParams} from '../routing/RouteTypes';

type Nav = NativeStackNavigationProp<RootStackParams>;

export const CattleBreedsPanel: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {items, remove} = useMyAnimals();
  const [tab, setTab] = useState<'catalog' | 'mine'>('catalog');
  const [filter, setFilter] = useState<string>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const catalog = useMemo(() => {
    if (filter === 'all') {
      return animalsRegistry;
    }
    const def = animalCategoryFilters.find(f => f.key === filter);
    if (!def?.test) {
      return animalsRegistry;
    }
    return animalsRegistry.filter(a => def.test!(a.category));
  }, [filter]);

  return (
    <ScreenFrame withHubBar edges={['top']}>
      <BrandHeader brand="Cattle Breeds" icon="🐂" />
      <Text style={styles.kicker}>Animal World</Text>
      <Text style={styles.title}>Cattle Breeds</Text>

      <SegmentedTabs
        style={styles.segments}
        value={tab}
        items={[
          {key: 'catalog', label: 'Catalog', counter: animalsRegistry.length},
          {key: 'mine', label: 'My Animals', counter: items.length},
        ]}
        onChange={k => setTab(k as 'catalog' | 'mine')}
      />

      {tab === 'catalog' ? (
        <View style={styles.catalogArea}>
          <View style={styles.filterFrame}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterScroll}
              contentContainerStyle={styles.filterRow}>
              {animalCategoryFilters.map(f => (
                <Pressable
                  key={f.key}
                  onPress={() => setFilter(f.key)}
                  style={({pressed}) => [
                    styles.filterChip,
                    filter === f.key && styles.filterChipActive,
                    pressed && {opacity: 0.85},
                  ]}>
                  <Text
                    style={[
                      styles.filterText,
                      filter === f.key && styles.filterTextActive,
                    ]}>
                    {f.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          <ScrollView
            style={styles.listScroll}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}>
            {catalog.map(item => (
              <AnimalTile
                key={item.id}
                title={item.name}
                subtitle={item.scientificName}
                origin={item.origin}
                weight={item.weight}
                image={item.image}
                onPress={() =>
                  navigation.navigate('AnimalDetails', {animalId: item.id})
                }
              />
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.catalogArea}>
          <PrimaryAction
            label="Add My Animal"
            leading="＋"
            onPress={() => navigation.navigate('MyAnimalForm')}
            style={{marginBottom: 14}}
          />
          {items.length === 0 ? (
            <EmptyHint
              icon="🐂"
              title="No animals yet"
              subtitle="Add your own cattle or animals to track and share their details"
            />
          ) : (
            <ScrollView
              style={styles.listScroll}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}>
              {items.map(item => (
                <View key={item.id} style={styles.myCard}>
                  <View style={styles.myCardBody}>
                    <Text style={styles.myName}>{item.name}</Text>
                    <Text style={styles.myBreed}>{item.breed}</Text>
                    <View style={styles.myMeta}>
                      {item.origin ? (
                        <Text style={styles.myMetaItem}>🚩 {item.origin}</Text>
                      ) : null}
                      {item.weight ? (
                        <Text style={styles.myMetaItem}>⚖️ {item.weight}</Text>
                      ) : null}
                    </View>
                  </View>
                  <Pressable
                    onPress={() => setDeleteId(item.id)}
                    hitSlop={8}
                    style={({pressed}) => [
                      styles.trashBtn,
                      pressed && {opacity: 0.8},
                    ]}>
                    <Text style={styles.trashIcon}>🗑</Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      )}

      <ModalCard
        visible={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Animal?"
        message="Are you sure you want to delete this animal? This action cannot be undone."
        secondaryLabel="Cancel"
        onSecondary={() => setDeleteId(null)}
        primaryLabel="Delete"
        primaryDanger
        onPrimary={() => {
          if (deleteId) {
            remove(deleteId);
          }
          setDeleteId(null);
        }}
      />
    </ScreenFrame>
  );
};

const styles = StyleSheet.create({
  kicker: {
    ...typography.caption,
    color: palette.textSecondary,
  },
  title: {
    ...typography.display,
    marginBottom: 14,
  },
  segments: {
    marginBottom: 12,
  },
  catalogArea: {
    flex: 1,
  },
  filterFrame: {
    height: 56,
    marginBottom: 4,
    justifyContent: 'center',
  },
  filterScroll: {
    marginHorizontal: -screen.padding,
  },
  filterRow: {
    gap: 8,
    paddingHorizontal: screen.padding,
    paddingVertical: 6,
    alignItems: 'center',
  },
  listScroll: {
    flex: 1,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 38,
    borderRadius: rounding.pill,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.rim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: palette.accent,
    borderColor: palette.accent,
  },
  filterText: {
    ...typography.caption,
    color: palette.textSecondary,
    fontWeight: '700',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  list: {
    gap: 10,
    paddingTop: 12,
    paddingBottom: 20,
  },
  myCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: palette.surface,
    padding: 14,
    borderRadius: rounding.lg,
    borderWidth: 1,
    borderColor: palette.rim,
  },
  myCardBody: {
    flex: 1,
    gap: 4,
  },
  myName: {
    ...typography.body,
    fontWeight: '700',
  },
  myBreed: {
    ...typography.caption,
    color: palette.textSecondary,
    fontStyle: 'italic',
  },
  myMeta: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 2,
  },
  myMetaItem: {
    ...typography.caption,
    color: palette.textSecondary,
  },
  trashBtn: {
    width: 40,
    height: 40,
    borderRadius: rounding.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(240, 98, 99, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(240, 98, 99, 0.35)',
  },
  trashIcon: {
    fontSize: 16,
  },
});
