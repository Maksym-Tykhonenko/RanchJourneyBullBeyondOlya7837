import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {palette} from '../core/palette';
import {hubBar, rounding} from '../core/layout';

const HUB_META: Record<string, {icon: string; label: string}> = {
  Explore: {icon: '📍', label: 'Explore'},
  Map: {icon: '🗺️', label: 'Map'},
  Animals: {icon: '🐾', label: 'Animals'},
  Facts: {icon: '📖', label: 'Facts'},
  Game: {icon: '🎮', label: 'Game'},
};

export const HubTabBar: React.FC<BottomTabBarProps> = ({state, navigation}) => {
  return (
    <View
      style={[styles.wrapper, {bottom: hubBar.offsetBottom}]}
      pointerEvents="box-none">
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const meta = HUB_META[route.name] ?? {icon: '•', label: route.name};
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={styles.item}
              hitSlop={8}>
              <View
                style={[
                  styles.iconWrap,
                  focused && styles.iconWrapActive,
                ]}>
                <Text
                  style={[
                    styles.icon,
                    {opacity: focused ? 1 : 0.55},
                  ]}>
                  {meta.icon}
                </Text>
              </View>
              <Text
                style={[
                  styles.label,
                  {color: focused ? palette.accent : palette.textMuted},
                ]}
                numberOfLines={1}>
                {meta.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: hubBar.horizontalInset,
    right: hubBar.horizontalInset,
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 33, 80, 0.92)',
    borderRadius: rounding.xxl,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: palette.rimStrong,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 10},
    elevation: 14,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    gap: 2,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: rounding.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: palette.accentSoft,
    borderWidth: 1,
    borderColor: 'rgba(138, 127, 252, 0.45)',
  },
  icon: {
    fontSize: 18,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
  },
});
