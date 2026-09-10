import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcon } from './MaterialIcon';
import { colors, radius, type } from '../theme/tokens';
import { useSettings } from '../context/SettingsContext';

export function StateView({ loading, error, empty, onRetry }) {
  const { accent } = useSettings();

  const styles = createStyles(accent);

  if (loading) {
    return (
      <View style={styles.card}>
        <View style={styles.dot} />
        <Text style={styles.muted}>Loading content…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.card}>
        <MaterialIcon
          name="error-outline"
          size={28}
          color={colors.error}
        />

        <Text style={styles.title}>Unable to load</Text>

        <Text style={styles.muted}>{error}</Text>

        {onRetry && (
          <Pressable
            onPress={onRetry}
            style={styles.button}
            accessibilityRole="button"
            accessibilityLabel="Try again"
          >
            <MaterialIcon
              name="refresh"
              size={18}
              color={colors.onPrimary}
            />

            <Text style={styles.buttonText}>Try again</Text>
          </Pressable>
        )}
      </View>
    );
  }

  if (empty) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{empty}</Text>

        <Text style={styles.muted}>
          When content is available from the API, it will appear here
          automatically.
        </Text>
      </View>
    );
  }

  return null;
}

function createStyles(accent) {
  const primary = accent?.primary ?? colors.primary;

  return StyleSheet.create({
    card: {
      minHeight: 160,
      borderRadius: radius.lg,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      gap: 10,
    },

    dot: {
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: primary,
    },

    title: {
      fontFamily: type.displayMedium,
      color: colors.onSurface,
      fontSize: 20,
      textAlign: 'center',
    },

    muted: {
      fontFamily: type.body,
      color: colors.onSurfaceVariant,
      textAlign: 'center',
    },

    button: {
      marginTop: 6,
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
      backgroundColor: primary,
      borderRadius: radius.full,
      paddingHorizontal: 18,
      paddingVertical: 11,
    },

    buttonText: {
      fontFamily: type.bodyBold,
      color: colors.onPrimary,
    },
  });
}