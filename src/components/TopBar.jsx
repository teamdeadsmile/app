import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { MaterialIcon } from "./MaterialIcon";
import { ArrowsClockwise } from 'phosphor-react-native';
import { User } from 'phosphor-react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import { BrandMark } from "./BrandMark";
import { colors, radius, type } from "../theme/tokens";
import { useGoBack } from "../hooks/useGoBack";

export function TopBar({ title, back = false }) {
  const goBack = useGoBack("/");

  return (
    <View style={styles.bar}>
      <View style={styles.left}>
        {back ? (
          <Pressable onPress={goBack} style={styles.iconBtn}>
            <MaterialIcon name="arrow-back" size={22} color={colors.onSurface} />
          </Pressable>
        ) : (
         <Link href="/" asChild>
            <Pressable>
                <BrandMark size={50} />
            </Pressable>
        </Link>
        )}
      </View>

      <View style={styles.actions}>
        <Link href="/search" asChild>
          <Pressable style={styles.iconBtn}>
            <MagnifyingGlass size={22} weight="bold" color={colors.onSurface} />
          </Pressable>
        </Link>
        <Link href="/check-updates" asChild>
            <Pressable style={styles.iconBtn}>
                <ArrowsClockwise size={22} weight="bold" color={colors.onSurface} />
            </Pressable>
        </Link>
        <Link href="/account" asChild>
          <Pressable style={styles.iconBtn}>
            <User size={22} weight="bold" color={colors.onSurface} />
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 74,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 6,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainer,
    alignItems: "center",
    justifyContent: "center",
  },
});