import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcon } from "../../src/components/MaterialIcon";
import { Screen } from '../../src/components/Screen';
import { StateView } from '../../src/components/StateView';
import { useApiData } from '../../src/hooks/useApiData';
import { colors, radius, type } from '../../src/theme/tokens';
import { formatDate } from '../../src/utils/content';
import { resolveAssetUrl } from '../../src/utils/resolveAsset';
import { useGoBack } from '../../src/hooks/useGoBack';

export default function NewsDetail() {
  const { slug } = useLocalSearchParams();
  const goBack = useGoBack('/');
  const q = useApiData(slug ? `/news/${slug}` : null, {}, null);
  const item = q.data;

  return (
    <Screen>
      <Pressable onPress={goBack} style={s.back}>
        <MaterialIcon name="arrow-back" size={22} color={colors.onSurface} />
      </Pressable>

      {q.status !== 'success' || !item ? (
        <StateView
          loading={q.status === 'loading'}
          error={q.error}
          onRetry={q.retry}
        />
      ) : (
        <>
          <View style={s.head}>
            <Text style={s.kicker}>
              {item.category || 'NEWSWIRE'} · {formatDate(item.published_at)}
            </Text>
            <Text style={s.title}>{item.title}</Text>
            {item.excerpt && <Text style={s.lead}>{item.excerpt}</Text>}
          </View>

          {resolveAssetUrl(item.image) && (
            <Image source={{ uri: resolveAssetUrl(item.image) }} style={s.image} contentFit="cover" />
          )}

          <View style={s.article}>
            {String(item.body || '')
              .split(/\n\s*\n|\n/)
              .filter(Boolean)
              .map((p, i) => (
                <Text key={i} style={s.body}>{p}</Text>
              ))}
          </View>
        </>
      )}
    </Screen>
  );
}

const s = StyleSheet.create({
  back: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginTop: 12,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  head: {
    maxWidth: 860,
    paddingVertical: 12,
  },
  kicker: {
    fontFamily: type.bodyBold,
    color: colors.primary,
    fontSize: 11,
    letterSpacing: 1.1,
  },
  title: {
    fontFamily: type.display,
    color: colors.onSurface,
    fontSize: 48,
    lineHeight: 46,
    letterSpacing: -2.1,
    marginTop: 9,
  },
  lead: {
    fontFamily: type.body,
    color: colors.onSurfaceVariant,
    fontSize: 16,
    lineHeight: 25,
    marginTop: 15,
    maxWidth: 720,
  },
  image: {
    width: '100%',
    aspectRatio: 1.7,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    marginTop: 20,
  },
  article: {
    maxWidth: 760,
    gap: 16,
    marginTop: 28,
  },
  body: {
    fontFamily: type.body,
    color: colors.onSurface,
    fontSize: 15,
    lineHeight: 26,
  },
});