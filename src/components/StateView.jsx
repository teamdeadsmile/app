import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcon } from "./MaterialIcon";
import { colors, radius, type } from '../theme/tokens';
export function StateView({ loading, error, empty, onRetry }) {
  if (loading) return <View style={s.card}><View style={s.dot}/><Text style={s.muted}>Loading content…</Text></View>;
  if (error) return <View style={s.card}><MaterialIcon name="error-outline" size={28} color={colors.error} /><Text style={s.title}>Unable to load</Text><Text style={s.muted}>{error}</Text>{onRetry&&<Pressable onPress={onRetry} style={s.button}><MaterialIcon name="refresh" size={18} color={colors.onPrimary} /><Text style={s.buttonText}>Try again</Text></Pressable>}</View>;
  if (empty) return <View style={s.card}><Text style={s.title}>{empty}</Text><Text style={s.muted}>When content is available from the API, it will appear here automatically.</Text></View>;
  return null;
}
const s=StyleSheet.create({card:{minHeight:160,borderRadius:radius.lg,backgroundColor:colors.surface,alignItems:'center',justifyContent:'center',padding:24,gap:10},dot:{width:18,height:18,borderRadius:9,backgroundColor:colors.primary},title:{fontFamily:type.displayMedium,color:colors.onSurface,fontSize:20,textAlign:'center'},muted:{fontFamily:type.body,color:colors.onSurfaceVariant,textAlign:'center'},button:{marginTop:6,flexDirection:'row',gap:8,alignItems:'center',backgroundColor:colors.primary,borderRadius:radius.full,paddingHorizontal:18,paddingVertical:11},buttonText:{fontFamily:type.bodyBold,color:colors.onPrimary}});
