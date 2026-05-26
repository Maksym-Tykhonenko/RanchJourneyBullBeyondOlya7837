import React, {useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {
  Camera,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenFrame} from '../widgets/ScreenFrame';
import {BrandHeader} from '../widgets/BrandHeader';
import {PrimaryAction} from '../widgets/PrimaryAction';
import {palette} from '../core/palette';
import {rounding} from '../core/layout';
import {typography} from '../core/typography';
import {locationsRegistry} from '../domain/registry/locationsRegistry';
import {RootStackParams} from '../routing/RouteTypes';

type Nav = NativeStackNavigationProp<RootStackParams>;

const IS_IOS = Platform.OS === 'ios';
const MAP_PROVIDER = IS_IOS ? undefined : PROVIDER_GOOGLE;

const INITIAL_REGION: Region = {
  latitude: 30,
  longitude: 10,
  latitudeDelta: 120,
  longitudeDelta: 120,
};

const INITIAL_CAMERA: Camera = {
  center: {
    latitude: INITIAL_REGION.latitude,
    longitude: INITIAL_REGION.longitude,
  },
  heading: 0,
  pitch: 0,
  zoom: 1,
};

const {height: SH} = Dimensions.get('window');
const MAP_HEIGHT = Math.max(280, Math.round(SH * 0.4));

export const RanchMapPanel: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const mapRef = useRef<MapView>(null);
  const mapReadyRef = useRef(false);
  const mapLayoutReadyRef = useRef(false);
  const pendingRegionRef = useRef<Region | null>(null);
  const regionRef = useRef<Region>(INITIAL_REGION);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = locationsRegistry.find(l => l.id === selectedId) ?? null;

  const flushPendingRegion = () => {
    if (
      !mapReadyRef.current ||
      !mapLayoutReadyRef.current ||
      !pendingRegionRef.current
    ) {
      return;
    }
    mapRef.current?.animateToRegion(pendingRegionRef.current, 300);
    pendingRegionRef.current = null;
  };

  const animateTo = (r: Region) => {
    regionRef.current = r;
    pendingRegionRef.current = r;
    flushPendingRegion();
  };

  const zoomIn = () => {
    const r = regionRef.current;
    animateTo({
      ...r,
      latitudeDelta: Math.max(0.02, r.latitudeDelta / 2),
      longitudeDelta: Math.max(0.02, r.longitudeDelta / 2),
    });
  };
  const zoomOut = () => {
    const r = regionRef.current;
    animateTo({
      ...r,
      latitudeDelta: Math.min(160, r.latitudeDelta * 2),
      longitudeDelta: Math.min(160, r.longitudeDelta * 2),
    });
  };
  const reset = () => {
    setSelectedId(null);
    animateTo(INITIAL_REGION);
  };

  const focus = (id: string) => {
    const l = locationsRegistry.find(x => x.id === id);
    if (!l) {
      return;
    }
    setSelectedId(id);
    animateTo({
      latitude: l.latitude,
      longitude: l.longitude,
      latitudeDelta: 8,
      longitudeDelta: 8,
    });
  };

  const openRoute = async () => {
    if (!selected) {
      return;
    }
    const url = `https://www.google.com/maps/dir/?api=1&destination=${selected.latitude},${selected.longitude}`;
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Unable to open route');
    }
  };

  return (
    <ScreenFrame withHubBar edges={['top']}>
      <BrandHeader />
      <Text style={styles.kicker}>Navigate</Text>
      <Text style={styles.title}>Ranch Map</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <View style={[styles.mapWrap, {height: MAP_HEIGHT}]}>
          <MapView
            ref={mapRef}
            provider={MAP_PROVIDER}
            style={StyleSheet.absoluteFillObject}
            initialRegion={IS_IOS ? INITIAL_REGION : undefined}
            initialCamera={IS_IOS ? undefined : INITIAL_CAMERA}
            onMapReady={() => {
              mapReadyRef.current = true;
              flushPendingRegion();
            }}
            onLayout={event => {
              const {width, height} = event.nativeEvent.layout;
              mapLayoutReadyRef.current = width > 0 && height > 0;
              flushPendingRegion();
            }}
            onRegionChangeComplete={r => {
              regionRef.current = r;
            }}
            showsPointsOfInterest={false}
            showsBuildings={false}
            showsTraffic={false}
            mapType="standard">
            {locationsRegistry.map(loc => (
              <Marker
                key={loc.id}
                coordinate={{
                  latitude: loc.latitude,
                  longitude: loc.longitude,
                }}
                pinColor={selectedId === loc.id ? palette.warn : palette.accent}
                title={loc.name}
                description={loc.country}
                tracksViewChanges={false}
                onPress={() => focus(loc.id)}
              />
            ))}
          </MapView>
          <View style={styles.controls} pointerEvents="box-none">
            {[
              {icon: '＋', onPress: zoomIn},
              {icon: '−', onPress: zoomOut},
              {icon: '🧭', onPress: reset},
            ].map((b, i) => (
              <Pressable
                key={i}
                onPress={b.onPress}
                hitSlop={8}
                style={({pressed}) => [
                  styles.controlBtn,
                  pressed && styles.controlPressed,
                ]}>
                <Text style={styles.controlText}>{b.icon}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {selected ? (
          <View style={styles.selectedCard}>
            <Image source={selected.image} style={styles.selectedImg} />
            <View style={styles.selectedContent}>
              <View style={styles.selectedTop}>
                <Text style={styles.selectedTitle} numberOfLines={1}>
                  {selected.name}
                </Text>
                <Pressable onPress={() => setSelectedId(null)} hitSlop={8}>
                  <Text style={styles.close}>✕</Text>
                </Pressable>
              </View>
              <View style={styles.pinRow}>
                <Text style={styles.pinLabel}>📍 {selected.country}</Text>
              </View>
              <View style={styles.actionRow}>
                <PrimaryAction
                  small
                  label="Get Route"
                  leading="➤"
                  onPress={openRoute}
                  style={styles.actionButton}
                />
                <PrimaryAction
                  small
                  label="Details"
                  trailing="›"
                  variant="secondary"
                  onPress={() =>
                    navigation.navigate('LocationDetails', {
                      locationId: selected.id,
                    })
                  }
                  style={styles.actionButton}
                />
              </View>
            </View>
          </View>
        ) : (
          <Text style={styles.hint}>Tap a pin to select a location</Text>
        )}

        <View style={styles.list}>
          {locationsRegistry.map(loc => (
            <Pressable
              key={loc.id}
              onPress={() => focus(loc.id)}
              style={({pressed}) => [
                styles.listItem,
                selectedId === loc.id && styles.listItemActive,
                pressed && styles.listItemPressed,
              ]}>
              <View style={styles.listIcon}>
                <Text style={styles.listEmoji}>📍</Text>
              </View>
              <View style={styles.listContent}>
                <Text style={styles.listTitle}>{loc.name}</Text>
                <Text style={styles.listSub}>{loc.country}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
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
    marginBottom: 12,
  },
  scroll: {
    gap: 12,
    paddingBottom: 12,
  },
  mapWrap: {
    borderRadius: rounding.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.rim,
    backgroundColor: palette.surfaceSoft,
  },
  controls: {
    position: 'absolute',
    right: 10,
    top: 10,
    gap: 8,
  },
  controlBtn: {
    width: 42,
    height: 42,
    borderRadius: rounding.md,
    backgroundColor: 'rgba(14,16,48,0.85)',
    borderWidth: 1,
    borderColor: palette.rimStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlPressed: {
    opacity: 0.8,
    transform: [{scale: 0.95}],
  },
  controlText: {
    color: palette.accent,
    fontSize: 18,
    fontWeight: '700',
  },
  selectedCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: palette.surface,
    padding: 12,
    borderRadius: rounding.lg,
    borderWidth: 1,
    borderColor: palette.rim,
  },
  selectedImg: {
    width: 52,
    height: 52,
    borderRadius: rounding.md,
  },
  selectedContent: {
    flex: 1,
  },
  selectedTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedTitle: {
    ...typography.body,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  close: {
    color: palette.textMuted,
    fontSize: 16,
  },
  pinRow: {
    marginTop: 2,
  },
  pinLabel: {
    ...typography.caption,
    color: palette.textSecondary,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
  },
  hint: {
    ...typography.caption,
    color: palette.textMuted,
    textAlign: 'center',
    paddingVertical: 6,
  },
  list: {
    gap: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: palette.surface,
    padding: 12,
    borderRadius: rounding.md,
    borderWidth: 1,
    borderColor: palette.rim,
  },
  listItemActive: {
    borderColor: palette.accent,
  },
  listItemPressed: {
    opacity: 0.9,
  },
  listIcon: {
    width: 32,
    height: 32,
    borderRadius: rounding.sm,
    backgroundColor: palette.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listEmoji: {
    fontSize: 14,
  },
  listContent: {
    flex: 1,
  },
  listTitle: {
    ...typography.body,
    fontWeight: '700',
  },
  listSub: {
    ...typography.caption,
    color: palette.textSecondary,
  },
});
