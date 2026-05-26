import {palette} from './palette';

export const typography = {
  hero: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800' as const,
    color: palette.textPrimary,
  },
  display: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800' as const,
    color: palette.textPrimary,
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700' as const,
    color: palette.textPrimary,
  },
  heading: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700' as const,
    color: palette.textPrimary,
  },
  subheading: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600' as const,
    color: palette.textPrimary,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400' as const,
    color: palette.textPrimary,
  },
  bodyMuted: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
    color: palette.textSecondary,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as const,
    color: palette.textMuted,
  },
  button: {
    fontSize: 16,
    fontWeight: '700' as const,
  },
};
