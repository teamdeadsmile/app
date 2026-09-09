import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcon } from '../../src/components/MaterialIcon';
import { Screen } from '../../src/components/Screen';
import { TopBar } from '../../src/components/TopBar';
import { colors, radius, type } from '../../src/theme/tokens';
import { api } from '../../src/services/api';
import { useAuth } from '../../src/context/AuthContext';

export default function AdminNewsletter() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [form, setForm] = useState({ title: '', excerpt: '', body: '', image: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  async function submit() {
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      await api.post('/admin/newsletter', form);
      setSaved(true);
      setTimeout(() => router.back(), 1500);
    } catch (err) {
      setError(err?.message || 'Unable to publish.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Screen>
      <TopBar title="Publish Newsletter" back />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.field}>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} value={form.title} onChangeText={set('title')} placeholder="Title" placeholderTextColor={colors.onSurfaceVariant} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Excerpt</Text>
          <TextInput style={styles.input} value={form.excerpt} onChangeText={set('excerpt')} placeholder="Brief summary" placeholderTextColor={colors.onSurfaceVariant} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Body</Text>
          <TextInput style={[styles.input, styles.textarea]} multiline numberOfLines={6} value={form.body} onChangeText={set('body')} placeholder="Full content" placeholderTextColor={colors.onSurfaceVariant} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput style={styles.input} value={form.image} onChangeText={set('image')} placeholder="https://..." placeholderTextColor={colors.onSurfaceVariant} />
        </View>

        {error && <Text style={styles.error}>{error}</Text>}
        {saved && <Text style={styles.success}>Published successfully!</Text>}

        <Pressable style={[styles.button, saving && styles.buttonDisabled]} onPress={submit} disabled={saving}>
          <Text style={styles.buttonText}>{saving ? 'Publishing…' : 'Publish'}</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  field: { marginBottom: 16 },
  label: { fontFamily: type.bodyBold, color: colors.onSurfaceVariant, fontSize: 11, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 },
  input: { backgroundColor: colors.surfaceContainerHigh, borderRadius: radius.md, padding: 14, color: colors.onSurface, fontFamily: type.body, fontSize: 15 },
  textarea: { minHeight: 120, textAlignVertical: 'top' },
  error: { fontFamily: type.body, color: colors.error, marginBottom: 8 },
  success: { fontFamily: type.body, color: colors.success, marginBottom: 8 },
  button: { backgroundColor: colors.primary, borderRadius: radius.full, paddingVertical: 14, alignItems: 'center' },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { fontFamily: type.bodyBold, color: colors.onPrimary, fontSize: 16 },
});