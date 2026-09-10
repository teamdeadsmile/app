import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcon } from "../src/components/MaterialIcon";
import { Screen } from '../src/components/Screen';
import { GameCard } from '../src/components/GameCard';
import { api } from '../src/services/api';
import { colors, radius, type } from '../src/theme/tokens';
import { useGoBack } from '../src/hooks/useGoBack';
import { resolveAssetUrl } from '../src/utils/resolveAsset';

export default function Search() {
  const router = useRouter();
  const goBack = useGoBack('/');
  const { width } = useWindowDimensions();
  const [q, setQ] = useState('');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (q.trim().length < 2) {
      setItems([]);
      setStatus('idle');
      return;
    }
    const t = setTimeout(async () => {
      setStatus('loading');
      try {
        const d = await api.get('/search', { q: q.trim(), limit: 24, page: 1 });
        setItems(d?.items || []);
        setStatus('done');
      } catch {
        setStatus('error');
      }
    }, 280);
    return () => clearTimeout(t);
  }, [q]);
  const cols = width >= 900 ? 4 : width >= 650 ? 3 : 2;
  const gap = 12;
  const screenPadding = 20;
  const totalWidth = width - screenPadding * 2;
  const itemWidth = `${((totalWidth - gap * (cols - 1)) / totalWidth) * 100}%`;

  return (
    <Screen>
      <View style={s.top}>
        <Pressable onPress={goBack} style={s.back}>
          <MaterialIcon name="arrow-back" size={22} color={colors.onSurface} />
        </Pressable>
        <View style={s.search}>
          <MaterialIcon name="search" size={20} color={colors.onSurfaceVariant} />
          <TextInput
            autoFocus
            value={q}
            onChangeText={setQ}
            placeholder="Search games"
            placeholderTextColor={colors.onSurfaceVariant}
            style={s.input}
          />
        </View>
      </View>

      <Text style={s.title}>Search</Text>

      {status === 'idle' && <Text style={s.copy}>Enter at least 2 characters.</Text>}
      {status === 'loading' && <Text style={s.copy}>Searching…</Text>}
      {status === 'error' && <Text style={[s.copy, { color: colors.error }]}>Search failed.</Text>}
      {status === 'done' && items.length === 0 && <Text style={s.copy}>No games found.</Text>}

      <View style={s.grid}>
        {items.map((g, i) => (
          <View
            key={g.id}
            style={{ width: itemWidth }}
          >
            <GameCard
              game={{
                ...g,
                coverImage: resolveAssetUrl(g.coverImage || g.cover_image),
              }}
              index={i}
            />
          </View>
        ))}
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  top: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  back: {
    width: 48,
    height: 48,
    marginTop: 12,
    borderRadius: 24,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    flex: 1,
    height: 52,
     marginTop: 12,
    borderRadius: 26,
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  input: {
    flex: 1,
    color: colors.onSurface,
    fontFamily: type.body,
    fontSize: 15,
    outlineStyle: 'none',
  },
  title: {
    fontFamily: type.display,
    color: colors.onSurface,
    fontSize: 50,
    letterSpacing: -2.2,
     marginTop: 24,
  },
  copy: {
    fontFamily: type.body,
    color: colors.onSurfaceVariant,
    marginTop: 6,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 22,
  },
});