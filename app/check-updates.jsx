import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, RefreshControl } from 'react-native';
import { Screen } from '../src/components/Screen';
import { TopBar } from '../src/components/TopBar';
import { MaterialIcon } from '../src/components/MaterialIcon';
import { colors, type, radius } from '../src/theme/tokens';
import * as Updates from 'expo-updates';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';

export default function CheckUpdates() {
  const router = useRouter();
  const [status, setStatus] = useState('checking'); 
  const [refreshing, setRefreshing] = useState(false);

  const appVersion = Constants.expoConfig?.version || '1.0.0';

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
      }
    } catch (error) {
      console.error('Update check error:', error);
      setStatus('none');
    }
  }

  async function installUpdate() {
    setStatus('downloading');
    try {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (error) {
      console.error('Update install error:', error);
      setStatus('available');
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await checkForUpdates();
    setRefreshing(false);
  };

  return (
    <Screen scroll={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <TopBar title="Updates" />

      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.versionLabel}>Current version</Text>
            <Text style={styles.versionNumber}>v{appVersion}</Text>
          </View>
          <View style={styles.statusBadge}>
            {status === 'checking' && <ActivityIndicator size="small" color={colors.primary} />}
            {status === 'available' && <Text style={styles.statusAvailable}>Update ready</Text>}
            {status === 'downloading' && <Text style={styles.statusDownloading}>Downloading…</Text>}
            {status === 'none' && <Text style={styles.statusUpToDate}>Up to date</Text>}
          </View>
        </View>

        <View style={styles.body}>
          {status === 'available' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>New version available</Text>
              <Text style={styles.updateMessage}>
                A new update is ready to be installed. Please make sure you have a stable internet connection.
              </Text>
              <Pressable onPress={installUpdate} style={styles.button}>
                <Text style={styles.buttonText}>Install now</Text>
                <MaterialIcon name="arrow-forward" size={20} color={colors.onPrimary} />
              </Pressable>
            </View>
          )}

          {status === 'downloading' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Downloading update</Text>
              <View style={styles.downloadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.downloadingText}>Please wait…</Text>
              </View>
            </View>
          )}

          {status === 'none' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>All caught up</Text>
              <Text style={styles.updateMessage}>You're running the latest version of Deadsmile.</Text>
            </View>
          )}

          {status === 'checking' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Checking for updates</Text>
              <Text style={styles.updateMessage}>Please wait…</Text>
            </View>
          )}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainerHigh,
    marginBottom: 16,
  },
  versionLabel: {
    fontFamily: type.body,
    color: colors.onSurfaceVariant,
    fontSize: 13,
  },
  versionNumber: {
    fontFamily: type.display,
    color: colors.onSurface,
    fontSize: 32,
    letterSpacing: -0.8,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerHigh,
  },
  statusAvailable: {
    fontFamily: type.bodyBold,
    color: colors.primary,
    fontSize: 12,
  },
  statusDownloading: {
    fontFamily: type.bodyBold,
    color: colors.primary,
    fontSize: 12,
  },
  statusUpToDate: {
    fontFamily: type.bodyBold,
    color: colors.success,
    fontSize: 12,
  },
  body: {
    flex: 1,
  },
  section: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainerHigh,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: type.display,
    color: colors.onSurface,
    fontSize: 24,
    letterSpacing: -0.6,
    marginBottom: 8,
  },
  updateMessage: {
    fontFamily: type.body,
    color: colors.onSurfaceVariant,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.primary,
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
  downloadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 16,
  },
  downloadingText: {
    fontFamily: type.body,
    color: colors.onSurfaceVariant,
    fontSize: 14,
  },
});