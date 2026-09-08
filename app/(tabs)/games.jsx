import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { TopBar } from '../../src/components/TopBar';
import { GameCard } from '../../src/components/GameCard';
import { StateView } from '../../src/components/StateView';
import { useApiData } from '../../src/hooks/useApiData';
import { colors, type } from '../../src/theme/tokens';
import { resolveAssetUrl } from '../../src/utils/resolveAsset';

export default function Games() {
  const { width } = useWindowDimensions();
  const q = useApiData('/games', { limit: 40 }, { items: [] });
  const games = q.data?.items || [];
  const cols = width >= 1000 ? 4 : width >= 680 ? 3 : 2;

  return (
    <Screen>
      <TopBar title="Games" />

      <View style={s.head}>
        <Text style={s.title}>Games</Text>
        <Text style={s.copy}>
          All games with details, platforms, screenshots, trailers, and official links.
        </Text>
      </View>

      {q.status !== 'success' ? (
        <StateView
          loading={q.status === 'loading'}
          error={q.error}
          onRetry={q.retry}
        />
      ) : games.length > 0 ? (
        <View style={s.grid}>
          {games.map((game, index) => (
            <View key={game.id} style={cols > 1 ? { width: `${100 / cols - 2}%`, flexGrow: 1 } : { width: '100%' }}>
                <GameCard game={game} index={index} />
            </View>
            ))}
        </View>
      ) : (
        <StateView empty="No games available" />
      )}
    </Screen>
  );
}

const s = StyleSheet.create({
  head: {
    paddingVertical: 24,
    maxWidth: 720,
  },
  eyebrow: {
    fontFamily: type.bodyBold,
    color: colors.primary,
    fontSize: 11,
    letterSpacing: 1.4,
  },
  title: {
    fontFamily: type.display,
    color: colors.onSurface,
    fontSize: 54,
    letterSpacing: -2.5,
    lineHeight: 56,
    marginTop: 4,
  },
  copy: {
    fontFamily: type.body,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    marginTop: 12,
  },
    grid: {
    width: '100%',
    gap: 12,
    },
});