import { Platform } from 'react-native';

export const colors = {
  background: '#090909',
  surface: '#151515',
  surfaceContainer: '#1B1B1B',
  surfaceContainerHigh: '#232323',
  surfaceContainerHighest: '#2B2B2B',
  onSurface: '#F4F4F1',
  onSurfaceVariant: '#B7B7B1',
  outline: '#494944',
  outlineVariant: '#30302D',
  primary: '#FFCF02',
  onPrimary: '#211B00',
  primaryContainer: '#4B3D00',
  onPrimaryContainer: '#FFE16B',
  inverseSurface: '#F4F4F1',
  inverseOnSurface: '#1A1A18',
  error: '#FFB4AB',
  success: '#8DDAA0',
  scrim: 'rgba(0,0,0,.66)',
};

export const radius = { xs: 10, sm: 16, md: 24, lg: 32, xl: 40, full: 999 };
export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 32, 8: 40, 9: 48 };
export const type = {
  display: 'SpaceGrotesk_700Bold',
  displayMedium: 'SpaceGrotesk_600SemiBold',
  body: 'Manrope_400Regular',
  bodyMedium: 'Manrope_500Medium',
  bodyBold: 'Manrope_700Bold',
};
export const shadow = Platform.select({
  web: { boxShadow: '0 12px 44px rgba(0,0,0,.30)' },
  default: { elevation: 8, shadowColor: '#000', shadowOpacity: 0.28, shadowRadius: 18, shadowOffset: { width: 0, height: 8 } },
});
export const layout = { maxWidth: 1180, contentPadding: 20, bottomNavHeight: 80 };
