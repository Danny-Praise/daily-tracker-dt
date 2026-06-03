import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import { fetchJournalEntries, createJournalEntry, archiveJournalEntry } from '../services/apiClient';

export default function JournalScreen({ user, token }) {
  const [text, setText] = useState('');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEntries = async () => {
      if (!user?.id || !token) return;
      setLoading(true);
      setError('');

      try {
        const data = await fetchJournalEntries(user.id, token);
        setEntries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, [user, token]);

  const saveEntry = async () => {
    if (!text.trim()) return;
    setSaving(true);
    setError('');

    try {
      const response = await createJournalEntry({ content: text }, token);
      setEntries([response.entry, ...entries]);
      setText('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleArchive = async (entryId) => {
    setError('');
    try {
      await archiveJournalEntry(entryId, true, token);
      setEntries(entries.map((entry) => entry.id === entryId ? { ...entry, archived: true } : entry));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Journal</Text>
      <Text style={styles.subtitle}>Write notes and archive them securely on the server.</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Write your thoughts..."
        placeholderTextColor="#94a3b8"
        multiline
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveEntry} disabled={saving}>
        <Text style={styles.saveButtonText}>{saving ? 'Saving...' : 'Save Entry'}</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" style={styles.loader} />
      ) : entries.filter((entry) => !entry.archived).length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No journal entries yet. Start writing to save them.</Text>
        </View>
      ) : (
        entries.filter((entry) => !entry.archived).map((entry) => (
          <View key={entry.id} style={styles.entryCard}>
            <Text style={styles.entryText}>{entry.content}</Text>
            <TouchableOpacity style={styles.archiveButton} onPress={() => handleArchive(entry.id)}>
              <Text style={styles.archiveButtonText}>Archive</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#e7f0ff' },
  container: { padding: 24 },
  title: { fontSize: 32, fontWeight: '800', color: '#0f172a', marginBottom: 8 },
  subtitle: { color: '#475569', fontSize: 16, marginBottom: 20 },
  textarea: { minHeight: 160, backgroundColor: '#fff', borderRadius: 24, padding: 18, borderWidth: 1, borderColor: '#cbd5e1', color: '#0f172a', textAlignVertical: 'top' },
  saveButton: { marginTop: 16, backgroundColor: '#2563eb', borderRadius: 18, paddingVertical: 16, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: '700' },
  entryCard: { marginTop: 18, backgroundColor: '#fff', borderRadius: 24, padding: 18, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 20, elevation: 4 },
  entryText: { color: '#0f172a', lineHeight: 22, marginBottom: 12 },
  archiveButton: { alignSelf: 'flex-start', backgroundColor: '#2563eb', borderRadius: 16, paddingVertical: 10, paddingHorizontal: 16 },
  archiveButtonText: { color: '#fff', fontWeight: '700' },
  loader: { marginTop: 20 },
  emptyState: { padding: 24, backgroundColor: '#fff', borderRadius: 24, alignItems: 'center' },
  emptyText: { color: '#475569', fontSize: 16 },
  error: { marginTop: 14, color: '#dc2626' }
});
