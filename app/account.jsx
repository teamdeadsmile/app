import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcon } from "../src/components/MaterialIcon";
import { Screen } from '../src/components/Screen';
import { useAuth } from '../src/context/AuthContext';
import { SITE_URL } from '../src/services/api';
import { colors, radius, type } from '../src/theme/tokens';
import { useGoBack } from '../src/hooks/useGoBack';

export default function Account() {
  const router = useRouter();
  const goBack = useGoBack('/');
  const { user, status, logout } = useAuth();

  async function leave() {
    await logout();
    goBack();
  }

  return (
    <Screen>
      <Pressable onPress={goBack} style={s.back}>
        <MaterialIcon name="arrow-back" size={22} color={colors.onSurface} />
      </Pressable>

      <View style={s.head}>
        <MaterialIcon name="account-circle" size={54} color={colors.primary} />
        <Text style={s.title}>Account</Text>
      </View>

      {status === 'authenticated' ? (
        <View style={s.card}>
          <Text style={s.name}>@{user.username}</Text>
          <Text style={s.email}>{user.email}</Text>
          {user.bio && <Text style={s.bio}>{user.bio}</Text>}
          <View style={s.chips}>
            <Text style={s.chip}>{user.role}</Text>
            {user.location && <Text style={s.chip}>{user.location}</Text>}
          </View>
          <Pressable
            onPress={() => Linking.openURL(`${SITE_URL}/account`)}
            style={s.row}
          >
            <Text style={s.rowText}>Manage on website</Text>
            <MaterialIcon name="open-in-new" size={19} color={colors.onSurface} />
          </Pressable>
          <Pressable onPress={leave} style={[s.row, { marginTop: 2 }]}>
            <Text style={s.rowText}>Sign out</Text>
            <MaterialIcon name="logout" size={19} color={colors.onSurface} />
          </Pressable>
        </View>
      ) : (
        <View style={s.card}>
          <Text style={s.name}>You are not signed in.</Text>
          <Text style={s.bio}>
            Sign in to sync your wishlist and account with the website.
          </Text>
          <Pressable onPress={() => router.replace('/login')} style={s.button}>
            <Text style={s.buttonText}>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Screen>
  );
}

const s = StyleSheet.create({
  back: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    paddingVertical: 22,
    gap: 7,
  },
  title: {
    fontFamily: type.display,
    color: colors.onSurface,
    fontSize: 48,
    letterSpacing: -2,
  },
  card: {
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    padding: 24,
    gap: 12,
    maxWidth: 680,
  },
  name: {
    fontFamily: type.displayMedium,
    color: colors.onSurface,
    fontSize: 28,
  },
  email: {
    fontFamily: type.body,
    color: colors.onSurfaceVariant,
  },
  bio: {
    fontFamily: type.body,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    fontFamily: type.bodyBold,
    color: colors.primary,
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    overflow: 'hidden',
  },
  row: {
    marginTop: 10,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowText: {
    fontFamily: type.bodyBold,
    color: colors.onSurface,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: 26,
    paddingHorizontal: 22,
    paddingVertical: 13,
  },
  buttonText: {
    fontFamily: type.bodyBold,
    color: colors.onPrimary,
  },
});