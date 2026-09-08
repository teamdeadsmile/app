import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
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

export default function VideoDetail() {
  const { id } = useLocalSearchParams();
  const goBack = useGoBack('/');
  const q = useApiData(id ? `/videos/${id}` : null, {}, null);
  const v = q.data;

  return (
    <Screen>
      <Pressable onPress={goBack} style={s.back}>
        <MaterialIcon name="arrow-back" size={22} color={colors.onSurface} />
      </Pressable>

      {q.status !== 'success' || !v ? (
        <StateView
          loading={q.status === 'loading'}
          error={q.error}
          onRetry={q.retry}
        />
      ) : (
        <>
          <View style={s.media}>
            {resolveAssetUrl(v.thumbnail) ? (
              <Image
                source={{ uri: resolveAssetUrl(v.thumbnail) }}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
              />
            ) : (
              <View style={s.fallback} />
            )}
            <View style={s.shade} />
            <Pressable
              onPress={() => v.video_url && Linking.openURL(v.video_url)}
              style={s.play}
            >
              <MaterialIcon name="play-arrow" size={30} color={colors.onPrimary} />
            </Pressable>
          </View>

          <View style={s.head}>
            <Text style={s.kicker}>
              {v.category || 'WATCH'} · {formatDate(v.published_at)}
            </Text>
            <Text style={s.title}>{v.title}</Text>
            {v.duration_seconds != null && (
              <Text style={s.meta}>
                {Math.ceil(Number(v.duration_seconds) / 60)} min
              </Text>
            )}
            {v.video_url && (
              <Pressable
                onPress={() => Linking.openURL(v.video_url)}
                style={s.button}
              >
                <Text style={s.buttonText}>Open video</Text>
                <MaterialIcon name="open-in-new" size={19} color={colors.onPrimary} />
              </Pressable>
            )}
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
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  media: {
    width: '100%',
    aspectRatio: 1.78,
    borderRadius: radius.xl,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.surfaceContainerHigh,
  },
  shade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,.25)',
  },
  play: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    paddingVertical: 24,
    maxWidth: 780,
  },
  kicker: {
    fontFamily: type.bodyBold,
    color: colors.primary,
    fontSize: 11,
    letterSpacing: 1.2,
  },
  title: {
    fontFamily: type.display,
    color: colors.onSurface,
    fontSize: 46,
    lineHeight: 45,
    letterSpacing: -2,
    marginTop: 7,
  },
  meta: {
    fontFamily: type.body,
    color: colors.onSurfaceVariant,
    marginTop: 10,
  },
  button: {
    alignSelf: 'flex-start',
    marginTop: 20,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    height: 50,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: type.bodyBold,
    color: colors.onPrimary,
  },
});