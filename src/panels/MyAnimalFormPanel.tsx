import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenFrame} from '../widgets/ScreenFrame';
import {PrimaryAction} from '../widgets/PrimaryAction';
import {palette} from '../core/palette';
import {rounding} from '../core/layout';
import {typography} from '../core/typography';
import {useMyAnimals} from '../state/MyAnimalsContext';
import {RootStackParams} from '../routing/RouteTypes';

type Nav = NativeStackNavigationProp<RootStackParams, 'MyAnimalForm'>;

type Field = {
  label: string;
  key: 'name' | 'breed' | 'origin' | 'weight' | 'color' | 'description';
  placeholder: string;
  required?: boolean;
  multiline?: boolean;
};

const fields: Field[] = [
  {label: 'Animal Name', key: 'name', placeholder: 'e.g. My Bull Rocky', required: true},
  {label: 'Breed', key: 'breed', placeholder: 'e.g. Hereford', required: true},
  {label: 'Origin / Location', key: 'origin', placeholder: 'e.g. Texas, USA'},
  {label: 'Weight', key: 'weight', placeholder: 'e.g. 1,500 lbs'},
  {label: 'Color', key: 'color', placeholder: 'e.g. Red with white face'},
  {
    label: 'Description (optional)',
    key: 'description',
    placeholder: 'Tell us about your animal...',
    multiline: true,
  },
];

export const MyAnimalFormPanel: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {add} = useMyAnimals();
  const [values, setValues] = useState<Record<string, string>>({});

  const change = (key: string, value: string) =>
    setValues(prev => ({...prev, [key]: value}));

  const submit = () => {
    if (!values.name?.trim() || !values.breed?.trim()) {
      Alert.alert('Missing fields', 'Please provide at least a name and a breed.');
      return;
    }
    add({
      name: values.name.trim(),
      breed: values.breed.trim(),
      origin: values.origin?.trim(),
      weight: values.weight?.trim(),
      color: values.color?.trim(),
      description: values.description?.trim(),
    });
    navigation.goBack();
  };

  return (
    <ScreenFrame edges={['top', 'bottom']} paddingHorizontal={20}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.headerKicker}>Add New</Text>
          <Text style={styles.headerTitle}>My Animal</Text>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={10}
            style={({pressed}) => [styles.closeBtn, pressed && {opacity: 0.7}]}>
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
          <Pressable
            style={({pressed}) => [styles.uploadBtn, pressed && {opacity: 0.85}]}
            onPress={() =>
              Alert.alert(
                'Upload Image',
                'Image picker integration can be added here.',
              )
            }>
            <Text style={styles.uploadIcon}>📷</Text>
            <Text style={styles.uploadLabel}>Upload Image</Text>
          </Pressable>

          {fields.map(f => (
            <View key={f.key} style={{marginTop: 16}}>
              <Text style={styles.label}>
                {f.label}
                {f.required ? <Text style={styles.asterisk}> *</Text> : null}
              </Text>
              <TextInput
                value={values[f.key] ?? ''}
                onChangeText={t => change(f.key, t)}
                placeholder={f.placeholder}
                placeholderTextColor={palette.textMuted}
                style={[styles.input, f.multiline && styles.inputMulti]}
                multiline={f.multiline}
                numberOfLines={f.multiline ? 4 : 1}
                textAlignVertical={f.multiline ? 'top' : 'center'}
              />
            </View>
          ))}

          <PrimaryAction
            label="Add Animal"
            leading="＋"
            onPress={submit}
            style={{marginTop: 24}}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenFrame>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    alignItems: 'center',
    paddingVertical: 14,
  },
  headerKicker: {
    ...typography.caption,
    color: palette.textSecondary,
  },
  headerTitle: {
    ...typography.heading,
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    top: 10,
    width: 36,
    height: 36,
    borderRadius: rounding.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.rim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    color: palette.textPrimary,
    fontSize: 16,
  },
  scroll: {
    paddingBottom: 40,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 56,
    borderRadius: rounding.md,
    borderWidth: 1,
    borderColor: palette.accent,
    backgroundColor: palette.accentSoft,
    marginTop: 12,
  },
  uploadIcon: {
    fontSize: 16,
  },
  uploadLabel: {
    ...typography.body,
    fontWeight: '700',
    color: palette.accent,
  },
  label: {
    ...typography.bodyMuted,
    color: palette.textPrimary,
    fontWeight: '600',
    marginBottom: 6,
  },
  asterisk: {
    color: palette.danger,
  },
  input: {
    backgroundColor: palette.surface,
    borderRadius: rounding.md,
    borderWidth: 1,
    borderColor: palette.rim,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: palette.textPrimary,
    fontSize: 14,
  },
  inputMulti: {
    height: 100,
    paddingTop: 12,
  },
});
