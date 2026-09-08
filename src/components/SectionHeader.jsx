import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcon } from "./MaterialIcon";
import { useRouter } from 'expo-router';
import { colors, radius, type } from '../theme/tokens';
export function SectionHeader({ title, eyebrow, href }) { const router=useRouter(); return <View style={s.row}><View><Text style={s.eyebrow}>{eyebrow}</Text><Text style={s.title}>{title}</Text></View>{href&&<Pressable onPress={()=>router.push(href)} style={s.go}><MaterialIcon name="open-in-new" size={22} color={colors.onPrimary} /></Pressable>}</View> }
const s=StyleSheet.create({row:{marginTop:30,marginBottom:16,flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between',gap:12},eyebrow:{fontFamily:type.bodyBold,color:colors.primary,fontSize:11,letterSpacing:1.3,textTransform:'uppercase',marginBottom:3},title:{fontFamily:type.display,color:colors.onSurface,fontSize:34,letterSpacing:-1.5},go:{width:48,height:48,borderRadius:radius.full,backgroundColor:colors.primary,alignItems:'center',justifyContent:'center'}});
