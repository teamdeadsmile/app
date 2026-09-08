import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, layout } from '../theme/tokens';
export function Screen({ children, scroll = true, contentStyle, refreshControl }) {
  const content = <View style={[styles.inner, contentStyle]}>{children}</View>;
  if (!scroll) return <SafeAreaView edges={['top','left','right']} style={styles.root}>{content}</SafeAreaView>;
  return <SafeAreaView edges={['top','left','right']} style={styles.root}><ScrollView style={styles.root} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} refreshControl={refreshControl}>{content}</ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({ root: { flex:1, backgroundColor: colors.background }, scroll:{ paddingBottom:120 }, inner:{ width:'100%', maxWidth:layout.maxWidth, alignSelf:'center', paddingHorizontal:layout.contentPadding, paddingTop:4 } });
