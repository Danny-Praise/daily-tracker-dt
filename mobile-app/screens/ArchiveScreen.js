import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { unlockArchivedEntries } from '../services/apiClient';

export default function ArchiveScreen({ token }) {
  const [password, setPassword] = useState('');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');

  const handleUnlock = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await unlockArchivedEntries(password, token);
      setEntries(response.entries);
      setUnlocked(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setPassword('');
    }
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Archive</Text>
      <Text style={styles.subtitle}>Unlock your archived entries with your archive password.</Text>

      {unlocked ? (
        entries.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No archived entries yet. Archive a journal note to view it here.</Text>
          </View>
        ) : (
          entries.map((entry) => (
            <View key={entry.id} style={styles.card}>
              <Text style={styles.cardText}>{entry.content}</Text>
              <Text style={styles.entryDate}>{new Date(entry.created_at).toLocaleString()}</Text>
            </View>
          ))
        )
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Secure Vault</Text>
          <Text style={styles.cardText}>Enter your archive password to view your protected notes.</Text>
          <TextInput
            style={styles.input}
            placeholder="Archive password"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleUnlock} disabled={loading}>
            <Text style={styles.saveButtonText}>{loading ? 'Unlocking...' : 'Unlock'}</Text>
          </TouchableOpacity>
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#e7f0ff' },
  container: { padding: 24 },
  title: { fontSize: 32, fontWeight: '800', color: '#0f172a', marginBottom: 8 },
  subtitle: { color: '#475569', fontSize: 16, marginBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 28, padding: 22, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 20, elevation: 5 },
  cardTitle: { fontSize: 22, fontWeight: '700', color: '#1d4ed8', marginBottom: 10 },
  cardText: { fontSize: 15, color: '#475569', marginBottom: 18, lineHeight: 22 },
  input: { backgroundColor: '#f8fafc', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#cbd5e1', color: '#0f172a', marginBottom: 16 },
  saveButton: { backgroundColor: '#2563eb', borderRadius: 18, paddingVertical: 16, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: '700' },
  cardText: { fontSize: 15, color: '#0f172a', lineHeight: 22, marginBottom: 12 },
  entryDate: { color: '#94a3b8', fontSize: 13 },
  emptyState: { padding: 24, backgroundColor: '#fff', borderRadius: 24, alignItems: 'center' },
  emptyText: { color: '#475569', fontSize: 16 },
  error: { color: '#dc2626', marginTop: 12, fontSize: 15 }
});
