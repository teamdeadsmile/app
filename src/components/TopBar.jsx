import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { GearSix, MagnifyingGlass, ArrowsClockwise } from "phosphor-react-native";
import { BrandMark } from "./BrandMark";
import { colors, radius, type } from "../theme/tokens";
import { useGoBack } from "../hooks/useGoBack";

export function TopBar({ title, back = false }) {
  const goBack = useGoBack("/");

  return (
    <View style={styles.bar}>
      <View style={styles.left}>
        {back ? (
          <Pressable onPress={goBack} style={styles.iconBtn} accessibilityLabel="Go back">
            <Text style={styles.backArrow}>‹</Text>
          </Pressable>
        ) : (
          <Link href="/" asChild>
            <Pressable style={styles.brand} accessibilityLabel="Deadsmile home">
              <BrandMark size={50} />
            </Pressable>
          </Link>
        )}
      </View>

      <View style={styles.actions}>
        <Link href="/search" asChild>
          <Pressable style={styles.iconBtn} accessibilityLabel="Search">
            <MagnifyingGlass size={20} weight="bold" color={colors.onSurface} />
          </Pressable>
        </Link>
        <Link href="/check-updates" asChild>
          <Pressable style={styles.iconBtn} accessibilityLabel="Check for updates">
            <ArrowsClockwise size={20} weight="bold" color={colors.onSurface} />
          </Pressable>
        </Link>
        <Link href="/config" asChild>
          <Pressable style={styles.iconBtn} accessibilityLabel="Settings">
            <GearSix size={20} weight="bold" color={colors.onSurface} />
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  left: { flexDirection: "row", alignItems: "center", gap: 14, flex: 1, minWidth: 0 },
  brand: { flexDirection: "row", alignItems: "center", gap: 9 },
  brandName: { fontFamily: type.display, color: colors.onSurface, fontSize: 15, letterSpacing: 1.2 },
  brandSub: { fontFamily: type.bodyBold, color: colors.onSurfaceVariant, fontSize: 8, letterSpacing: 2.4, marginTop: 1 },
  pageTitle: { fontFamily: type.displayMedium, color: colors.onSurfaceVariant, fontSize: 14, marginLeft: 6 },
  actions: { flexDirection: "row", gap: 7 },
  iconBtn: {
    width: 42, height: 42, borderRadius: radius.full, backgroundColor: colors.surfaceContainer,
    alignItems: "center", justifyContent: "center",
  },
  backArrow: { color: colors.onSurface, fontSize: 32, lineHeight: 34, fontFamily: type.body },
});
