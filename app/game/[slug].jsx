import { useEffect, useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcon } from "../../src/components/MaterialIcon";
import { Screen } from "../../src/components/Screen";
import { StateView } from "../../src/components/StateView";
import { GameCard } from "../../src/components/GameCard";
import { useApiData } from "../../src/hooks/useApiData";
import { useAuth } from "../../src/context/AuthContext";
import { api, SITE_URL } from "../../src/services/api";
import { colors, radius, type } from "../../src/theme/tokens";
import { resolveAssetUrl } from "../../src/utils/resolveAsset";
import { useGoBack } from "../../src/hooks/useGoBack";

export default function GameDetail() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const goBack = useGoBack('/');

  const { width } = useWindowDimensions();
  const { status } = useAuth();
  const q = useApiData(slug ? `/games/${slug}` : null, {}, null);
  const game = q.data;
  const [wish, setWish] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && game?.id) {
      api.get(`/wishlist/${game.id}/check`)
        .then((x) => setWish(!!x?.inWishlist))
        .catch(() => {});
    }
  }, [status, game?.id]);

  async function toggleWish() {
    if (status !== "authenticated") {
      router.push("/login");
      return;
    }
    if (!game?.id || busy) return;
    setBusy(true);
    try {
      if (wish) {
        await api.delete(`/wishlist/${game.id}`);
        setWish(false);
      } else {
        await api.post("/wishlist", { gameId: game.id });
        setWish(true);
      }
    } finally {
      setBusy(false);
    }
  }

  if (q.status !== "success" || !game) {
    return (
      <Screen>
        <Pressable onPress={goBack} style={s.back}>
          <MaterialIcon name="arrow-back" size={22} color={colors.onSurface} />
        </Pressable>
        <StateView
          loading={q.status === "loading"}
          error={q.error}
          onRetry={q.retry}
        />
      </Screen>
    );
  }

  const heroUrl = resolveAssetUrl(game.heroImage || game.coverImage);

  return (
    <Screen contentStyle={{ paddingTop: 12 }}>
      <Pressable onPress={goBack} style={s.back}>
        <MaterialIcon name="arrow-back" size={22} color={colors.onSurface} />
      </Pressable>

      <View style={[s.hero, width > 760 && { minHeight: 620 }]}>
        {heroUrl ? (
          <>
            <Image
              source={{ uri: heroUrl }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
            />
            <View style={[StyleSheet.absoluteFill, { backgroundColor: '#000', opacity: 0.75 }]} />
          </>
        ) : (
          <View style={s.fallback} />
        )}
        <View style={s.heroBody}>
          <Text style={s.kicker}>
            {(game.status || "GAME").toUpperCase()}
          </Text>
          <Text
            style={[
              s.title,
              width > 760 && { fontSize: 72, lineHeight: 68 },
            ]}
          >
            {game.title}
          </Text>
          <Text style={s.lead}>{game.shortDescription}</Text>
          <View style={s.actions}>
            <Pressable
              onPress={toggleWish}
              disabled={busy}
              style={[s.action, wish && s.actionFilled]}
            >
              <MaterialIcon
                name="favorite"
                size={20}
                color={wish ? colors.onPrimary : colors.onSurface}
              />
              <Text
                style={[
                  s.actionText,
                  wish && s.actionTextFilled,
                ]}
              >
                {wish ? "In wishlist" : "Wishlist"}
              </Text>
            </Pressable>
            {game.trailerUrl && (
              <Pressable
                onPress={() => Linking.openURL(game.trailerUrl)}
                style={s.action}
              >
                <MaterialIcon name="play-arrow" size={20} color={colors.onSurface} />
                <Text style={s.actionText}>Trailer</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>

      <View style={s.metaRow}>
        {Array.isArray(game.genres) &&
          game.genres.map((g) => (
            <View key={g} style={s.chip}>
              <Text style={s.chipText}>{g}</Text>
            </View>
          ))}
        {Array.isArray(game.platforms) &&
          game.platforms.map((p) => (
            <View key={p} style={s.chip}>
              <Text style={s.chipText}>{p}</Text>
            </View>
          ))}
      </View>

      {game.description && (
        <View style={s.section}>
          <Text style={s.sectionTitle}>About</Text>
          {String(game.description)
            .split(/\n\s*\n|\n/)
            .filter(Boolean)
            .map((p, i) => (
              <Text key={i} style={s.body}>
                {p}
              </Text>
            ))}
        </View>
      )}

      {Array.isArray(game.screenshots) && game.screenshots.length > 0 && (
        <View style={s.section}>
          <Text style={s.sectionTitle}>Screenshots</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          >
            {game.screenshots.map((uri, i) => (
              <Image
                key={`${uri}-${i}`}
                source={{ uri: resolveAssetUrl(uri) }}
                style={s.shot}
                contentFit="cover"
              />
            ))}
          </ScrollView>
          {game.slug && (
            <Pressable
              onPress={() =>
                Linking.openURL(`${SITE_URL}/game/${game.slug}`)
              }
              style={[s.link, { marginTop: 16 }]}
            >
              <MaterialIcon name="image" size={21} color={colors.onPrimary} />
              <Text style={s.linkText}>View all screenshots</Text>
              <MaterialIcon name="open-in-new" size={18} color={colors.onPrimary} />
            </Pressable>
          )}
        </View>
      )}

      <View style={s.links}>
        {game.purchaseUrl && (
          <Pressable
            onPress={() => Linking.openURL(game.purchaseUrl)}
            style={s.link}
          >
            <MaterialIcon name="shopping-bag" size={21} color={colors.onPrimary} />
            <Text style={s.linkText}>Buy</Text>
            <MaterialIcon name="open-in-new" size={18} color={colors.onPrimary} />
          </Pressable>
        )}
        {game.downloadUrl && (
          <Pressable
            onPress={() => Linking.openURL(game.downloadUrl)}
            style={s.link}
          >
            <MaterialIcon name="download" size={21} color={colors.onPrimary} />
            <Text style={s.linkText}>Download</Text>
            <MaterialIcon name="open-in-new" size={18} color={colors.onPrimary} />
          </Pressable>
        )}
      </View>

      {Array.isArray(game.relatedGames) &&
        game.relatedGames.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Related games</Text>
            <View style={s.related}>
              {game.relatedGames.map((g, i) => (
                <GameCard key={g.id} game={g} index={i} />
              ))}
            </View>
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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  hero: {
    minHeight: 520,
    borderRadius: radius.xl,
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: colors.surface,
  },
  fallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.surfaceContainerHigh,
  },
  heroBody: { padding: 24, paddingTop: 170, maxWidth: 790 },
  kicker: {
    fontFamily: type.bodyBold,
    color: colors.primary,
    fontSize: 11,
    letterSpacing: 1.5,
  },
  title: {
    fontFamily: type.display,
    color: "#fff",
    fontSize: 50,
    lineHeight: 47,
    letterSpacing: -2.3,
    marginTop: 7,
  },
  lead: {
    fontFamily: type.body,
    color: "#E5E5DF",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
    maxWidth: 620,
  },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 9, marginTop: 20 },
  action: {
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(22,22,22,.9)",
    paddingHorizontal: 17,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionFilled: { backgroundColor: colors.primary },
  actionText: { fontFamily: type.bodyBold, color: colors.onSurface },
  actionTextFilled: { color: colors.onPrimary },
  metaRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 14 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainer,
  },
  chipText: {
    fontFamily: type.bodyBold,
    color: colors.onSurfaceVariant,
    fontSize: 11,
  },
  section: { marginTop: 32, gap: 12 },
  sectionTitle: {
    fontFamily: type.display,
    color: colors.onSurface,
    fontSize: 34,
    letterSpacing: -1.3,
  },
  body: {
    fontFamily: type.body,
    color: colors.onSurfaceVariant,
    fontSize: 14,
    lineHeight: 23,
    maxWidth: 800,
  },
  shot: {
    width: 310,
    height: 180,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  links: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 28 },
  link: {
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    paddingHorizontal: 18,
  },
  linkText: { fontFamily: type.bodyBold, color: colors.onPrimary },
  related: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
});