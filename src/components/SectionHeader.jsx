import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcon } from './MaterialIcon';
import { colors, radius, type } from '../theme/tokens';
import { useSettings } from '../context/SettingsContext';

export function SectionHeader({ title, href }) {
  const router = useRouter();
  const { accent } = useSettings();

  const styles = createStyles(accent);

  return (
    <View style={styles.row}>
      <View>

        <Text style={styles.title}>{title}</Text>
      </View>

      {href ? (
        <Pressable
          onPress={() => router.push(href)}
          style={styles.go}
          accessibilityRole="button"
          accessibilityLabel={`Open ${title}`}
        >
          <MaterialIcon
            name="open-in-new"
            size={22}
            color={colors.onPrimary}
          />
        </Pressable>
      ) : null}
    </View>
  );
}

function createStyles(accent) {
  const primary = accent?.primary ?? colors.primary;

  return StyleSheet.create({
    row: {
      marginTop: 30,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 12,
    },

    eyebrow: {
      fontFamily: type.bodyBold,
      color: colors.primary,
      fontSize: 11,
      letterSpacing: 1.3,
      textTransform: 'uppercase',
      marginBottom: 3,
    },

    title: {
      fontFamily: type.display,
      color: colors.onSurface,
      fontSize: 34,
      letterSpacing: -1.5,
    },

    go: {
      width: 48,
      height: 48,
      borderRadius: radius.full,
      backgroundColor: primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}