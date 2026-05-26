import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {palette} from '../core/palette';
import {rounding} from '../core/layout';
import {typography} from '../core/typography';

type Props = {
  visible: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  primaryLabel?: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  primaryDanger?: boolean;
};

export const ModalCard: React.FC<Props> = ({
  visible,
  onClose,
  title,
  message,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  primaryDanger,
}) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <Pressable style={styles.overlay} onPress={onClose}>
      <Pressable style={styles.card} onPress={() => {}}>
        <Text style={styles.title}>{title}</Text>
        {message ? <Text style={styles.body}>{message}</Text> : null}
        <View style={styles.row}>
          {secondaryLabel ? (
            <Pressable
              onPress={onSecondary}
              style={({pressed}) => [
                styles.btn,
                styles.secondary,
                pressed && {opacity: 0.8},
              ]}>
              <Text style={styles.secondaryText}>{secondaryLabel}</Text>
            </Pressable>
          ) : null}
          {primaryLabel ? (
            <Pressable
              onPress={onPrimary}
              style={({pressed}) => [
                styles.btn,
                primaryDanger ? styles.danger : styles.primary,
                pressed && {opacity: 0.9},
              ]}>
              <Text style={styles.primaryText}>{primaryLabel}</Text>
            </Pressable>
          ) : null}
        </View>
      </Pressable>
    </Pressable>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: palette.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: palette.surface,
    borderRadius: rounding.xl,
    borderWidth: 1,
    borderColor: palette.rim,
    padding: 22,
    gap: 12,
  },
  title: {
    ...typography.heading,
    textAlign: 'center',
  },
  body: {
    ...typography.bodyMuted,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  btn: {
    flex: 1,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: rounding.md,
  },
  primary: {
    backgroundColor: palette.accent,
  },
  danger: {
    backgroundColor: palette.danger,
  },
  secondary: {
    backgroundColor: palette.surfaceRaised,
    borderWidth: 1,
    borderColor: palette.rim,
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  secondaryText: {
    color: palette.textPrimary,
    fontWeight: '700',
  },
});
