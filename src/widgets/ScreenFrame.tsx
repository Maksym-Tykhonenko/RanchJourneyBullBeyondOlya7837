import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView, Edge} from 'react-native-safe-area-context';
import {palette} from '../core/palette';
import {hubBar, screen} from '../core/layout';
import {FadeInView} from './FadeInView';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  edges?: Edge[];
  withHubBar?: boolean;
  paddingHorizontal?: number;
  contentContainerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  transparent?: boolean;
  fadeIn?: boolean;
};

export const ScreenFrame: React.FC<Props> = ({
  children,
  scroll = false,
  edges = ['top'],
  withHubBar = false,
  paddingHorizontal = screen.padding,
  contentContainerStyle,
  contentStyle,
  transparent = false,
  fadeIn = true,
}) => {
  const bottom = withHubBar ? hubBar.height + hubBar.offsetBottom + 24 : 24;
  const inner = [
    {paddingHorizontal, paddingBottom: bottom},
    contentContainerStyle,
  ];

  const body = scroll ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={inner}
      style={contentStyle}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, inner, contentStyle]}>{children}</View>
  );

  return (
    <View style={[styles.root, transparent && styles.transparent]}>
      <StatusBar barStyle="light-content" backgroundColor={palette.backdrop} />
      <SafeAreaView style={styles.safe} edges={edges}>
        {fadeIn ? <FadeInView>{body}</FadeInView> : body}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: palette.backdrop},
  transparent: {backgroundColor: 'transparent'},
  safe: {flex: 1},
  flex: {flex: 1},
});
