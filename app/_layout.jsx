import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { AuthProvider } from '../src/context/AuthContext';
import { colors } from '../src/theme/tokens';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const [loaded] = useFonts({ Manrope_400Regular, Manrope_500Medium, Manrope_700Bold, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold });
  if (!loaded) return null;
  return <SafeAreaProvider><AuthProvider><StatusBar style="light" backgroundColor={colors.background}/><Stack screenOptions={{ headerShown:false, contentStyle:{backgroundColor:colors.background}, animation:'fade_from_bottom' }}><Stack.Screen name="(tabs)"/><Stack.Screen name="game/[slug]"/><Stack.Screen name="news/[slug]"/><Stack.Screen name="video/[id]"/><Stack.Screen name="account" options={{presentation:'modal'}}/><Stack.Screen name="search" options={{presentation:'modal'}}/><Stack.Screen name="login" options={{presentation:'modal'}}/></Stack></AuthProvider></SafeAreaProvider>;
}
