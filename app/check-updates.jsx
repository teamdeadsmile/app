import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { Screen } from '../src/components/Screen';
import { TopBar } from '../src/components/TopBar';
import { MaterialIcon } from '../src/components/MaterialIcon';
import { colors, type, radius } from '../src/theme/tokens';
import * as Updates from 'expo-updates';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function CheckUpdates() {
  const router = useRouter();
  const [status, setStatus] = useState('checking'); // 'checking' | 'available' | 'none'

  useEffect(() => {
    checkForUpdates();
  }, []);

  async function checkForUpdates() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        setStatus('available');
      } else {
        setStatus('none');
        setTimeout(() => router.back(), 1500);
      }
    } catch (error) {
      console.error('Update check error:', error);
      setStatus('none');
      setTimeout(() => router.back(), 1500);
    }
  }

  async function installUpdate() {
    try {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (error) {
      console.error('Update install error:', error);
    }
  }

  return (
    <Screen>
      <TopBar title="Check Updates" />
      <View style={styles.container}>
        <View style={styles.card}>
          <Animated.View
            entering={FadeIn.duration(400)}
            style={styles.iconContainer}
          >
            {status === 'checking' ? (
              <ActivityIndicator size="large" color={colors.primary} style={styles.spinner} />
            ) : status === 'available' ? (
              <MaterialIcon name="download" size={72} color={colors.primary} />
            ) : (
              <MaterialIcon name="check-circle" size={72} color={colors.primary} />
            )}
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(150).duration(400)}>
            <Text style={styles.title}>
              {status === 'checking' && 'Checking for Updates'}
              {status === 'available' && 'Update Ready'}
              {status === 'none' && 'All Good'}
            </Text>

            <Text style={styles.message}>
              {status === 'checking' && 'Please wait while we check for the latest version.'}
              {status === 'available' && 'A new update is available. Install it now to get the latest features and fixes.'}
              {status === 'none' && 'Your app is up to date. You\'re running the latest version.'}
            </Text>

            {status === 'available' && (
              <Pressable onPress={installUpdate} style={styles.button}>
                <Text style={styles.buttonText}>Install Now</Text>
                <MaterialIcon name="arrow-forward" size={20} color={colors.onPrimary} />
              </Pressable>
            )}
          </Animated.View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  spinner: {
    transform: [{ scale: 1.2 }],
  },
  title: {
    fontFamily: type.display,
    color: colors.onSurface,
    fontSize: 28,
    letterSpacing: -0.8,
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontFamily: type.body,
    color: colors.onSurfaceVariant,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 4,
    marginBottom: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: radius.full,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontFamily: type.bodyBold,
    color: colors.onPrimary,
    fontSize: 16,
  },
});