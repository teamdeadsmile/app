import { ScrollView, StyleSheet, Text, View, Pressable, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { MaterialIcon } from "../../src/components/MaterialIcon";
import { Screen } from "../../src/components/Screen";
import { TopBar } from "../../src/components/TopBar";
import { SectionHeader } from "../../src/components/SectionHeader";
import { GameCard } from "../../src/components/GameCard";
import { NewsCard } from "../../src/components/NewsCard";
import { VideoCard } from "../../src/components/VideoCard";
import { StateView } from "../../src/components/StateView";
import { useApiData } from "../../src/hooks/useApiData";
import { colors, radius, type } from "../../src/theme/tokens";
import { normalizeList } from "../../src/utils/content";
import { resolveAssetUrl } from "../../src/utils/resolveAsset";

export default function Home() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    const gamesQ = useApiData("/games", { limit: 8 }, { items: [] });
    const newsQ = useApiData("/news", { limit: 6 }, []);
    const videosQ = useApiData("/videos", { limit: 6 }, []);

    const games = gamesQ.data?.items || [];
    const featured = games.find((g) => g.featured) || games[0];
    const news = normalizeList(newsQ.data);
    const videos = normalizeList(videosQ.data);
    const heroUrl = resolveAssetUrl(featured?.heroImage || featured?.coverImage);

    return (
        <Screen>
            <TopBar />
            <Animated.View entering={FadeIn.duration(450)} style={s.hero}>
                {heroUrl ? (
                    <Image
                        source={{ uri: heroUrl }}
                        style={StyleSheet.absoluteFill}
                        contentFit="cover"
                    />
                ) : (
                    <View style={s.heroFallback} />
                )}
                <View style={s.heroShade} />
                <View style={s.heroBody}>
                    <Text
                        style={[
                            s.heroTitle,
                            width > 720 && { fontSize: 64, lineHeight: 60 },
                        ]}
                        numberOfLines={3}
                    >
                        {featured?.title || "Games made to stay with you."}
                    </Text>
                    <Text style={s.heroCopy} numberOfLines={3}>
                        {featured?.shortDescription ||
                            "Explore the studio's games, videos, and news in a mobile experience built for Material 3."}
                    </Text>
                    <View style={s.heroActions}>
                        {featured && (
                            <Pressable
                                onPress={() =>
                                    router.push(`/game/${featured.slug}`)
                                }
                                style={s.primary}
                            >
                                <Text style={s.primaryText}>View game</Text>
                                <MaterialIcon name="arrow-forward"
                                    size={19}
                                    color={colors.onPrimary}
                                 />
                            </Pressable>
                        )}
                        {featured?.trailerUrl && (
                            <Pressable
                                onPress={() => router.push("/(tabs)/videos")}
                                style={s.secondary}
                            >
                                <MaterialIcon name="play-arrow"
                                    size={18}
                                    color={colors.onSurface}
                                 />
                                <Text style={s.secondaryText}>Videos</Text>
                            </Pressable>
                        )}
                    </View>
                </View>
            </Animated.View>
            <SectionHeader
                eyebrow="Catalog"
                title="Games"
                href="/(tabs)/games"
            />
            {gamesQ.status !== "success" ? (
                <StateView
                    loading={gamesQ.status === "loading"}
                    error={gamesQ.error}
                    onRetry={gamesQ.retry}
                />
            ) : (
                <View style={s.gamesList}>
                    {games.slice(0, 6).map((g, i) => (
                        <GameCard
                            key={g.id}
                            game={{
                                ...g,
                                coverImage: resolveAssetUrl(
                                    g.coverImage || g.heroImage
                                ),
                            }}
                            index={i}
                        />
                    ))}
                </View>
            )}
            <SectionHeader
                eyebrow="Latest"
                title="Newswire"
                href="/(tabs)/newswire"
            />
            {newsQ.status !== "success" ? (
                <StateView
                    loading={newsQ.status === "loading"}
                    error={newsQ.error}
                    onRetry={newsQ.retry}
                />
            ) : news.length ? (
                <View style={s.newsGrid}>
                    {news.slice(0, 4).map((n, i) => (
                        <Animated.View
                            key={n.id || n.slug}
                            entering={FadeInDown.delay(i * 55)}
                            style={{ width: '100%' }}
                        >
                            <NewsCard item={n} large={i === 0} />
                        </Animated.View>
                    ))}
                </View>
            ) : (
                <StateView empty="No news yet" />
            )}
            <SectionHeader
                eyebrow="Media"
                title="Videos"
                href="/(tabs)/videos"
            />
            {videosQ.status !== "success" ? (
                <StateView
                    loading={videosQ.status === "loading"}
                    error={videosQ.error}
                    onRetry={videosQ.retry}
                />
            ) : videos.length ? (
                <View style={s.newsGrid}>
                    {videos.slice(0, 4).map((v) => (
                        <View key={v.id} style={{ width: '100%' }}>
                            <VideoCard item={v} />
                        </View>
                    ))}
                </View>
            ) : (
                <StateView empty="No videos yet" />
            )}
        </Screen>
    );
}

const s = StyleSheet.create({
    hero: {
        minHeight: 520,
        borderRadius: radius.xl,
        overflow: "hidden",
        backgroundColor: colors.surface,
        justifyContent: "flex-end",
    },
    heroFallback: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.surfaceContainerHigh,
    },
    heroShade: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,.69)",
    },
    heroBody: { padding: 24, paddingTop: 130, maxWidth: 720 },
    overline: {
        fontFamily: type.bodyBold,
        color: colors.primary,
        fontSize: 11,
        letterSpacing: 1.7,
        marginBottom: 12,
    },
    heroTitle: {
        fontFamily: type.display,
        color: "#fff",
        fontSize: 45,
        lineHeight: 42,
        letterSpacing: -2.1,
    },
    heroCopy: {
        fontFamily: type.body,
        color: "#E4E4DE",
        fontSize: 14,
        lineHeight: 21,
        marginTop: 14,
        maxWidth: 570,
    },
    heroActions: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginTop: 21,
    },
    primary: {
        height: 50,
        borderRadius: radius.full,
        backgroundColor: colors.primary,
        flexDirection: "row",
        alignItems: "center",
        gap: 9,
        paddingHorizontal: 20,
    },
    primaryText: { fontFamily: type.bodyBold, color: colors.onPrimary },
    secondary: {
        height: 50,
        borderRadius: radius.full,
        backgroundColor: "rgba(24,24,24,.86)",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 20,
    },
    secondaryText: { fontFamily: type.bodyBold, color: colors.onSurface },

    newsGrid: {
        width: '100%',
        gap: 12,
    },
    gamesList: {
        width: '100%',
        gap: 12,
    },
});