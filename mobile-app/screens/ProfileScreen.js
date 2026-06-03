import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { fetchUserProfile, updateUserProfile } from '../services/apiClient';

export default function ProfileScreen({ user, token, onLogout }) {
  const [name, setName] = useState(user?.full_name || 'Daily Tracker User');
  const [email, setEmail] = useState(user?.email || 'you@example.com');
  const [archivePassword, setArchivePassword] = useState('');
  const [archivePasswordSet, setArchivePasswordSet] = useState(false);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) return;
      try {
        const response = await fetchUserProfile(token);
        setName(response.user.full_name);
        setEmail(response.user.email);
        setArchivePasswordSet(response.user.archivePasswordSet);
      } catch (err) {
        setStatus(err.message);
      }
    };

    loadProfile();
  }, [token]);

  const handleSave = async () => {
    setStatus('');
    setSaving(true);

    try {
      const payload = { full_name: name };
      if (archivePassword.trim()) {
        payload.archive_password = archivePassword.trim();
      }

      const response = await updateUserProfile(payload, token);
      setName(response.user.full_name);
      setArchivePasswordSet(response.user.archivePasswordSet);
      setArchivePassword('');
      setStatus('Profile updated successfully.');
    } catch (err) {
      setStatus(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileCard}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{user?.full_name ? user.full_name.charAt(0) : 'DT'}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} editable={false} keyboardType="email-address" />
          <Text style={styles.label}>Archive password</Text>
          <TextInput
            style={styles.input}
            value={archivePassword}
            onChangeText={setArchivePassword}
            placeholder={archivePasswordSet ? 'Set new archive password' : 'Create archive password'}
            secureTextEntry
            placeholderTextColor="#94a3b8"
          />
          <TouchableOpacity style={styles.uploadButton} onPress={handleSave} disabled={saving}>
            <Text style={styles.uploadButtonText}>{saving ? 'Saving...' : 'Save Profile'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>System Settings</Text>
        <Text style={styles.cardText}>Set your archive password and keep your profile secure on mobile.</Text>
        <Text style={styles.cardText}>{archivePasswordSet ? 'Archive password is set.' : 'Archive password is not set yet.'}</Text>
      </View>
      {status ? <Text style={styles.status}>{status}</Text> : null}
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#e7f0ff' },
  container: { padding: 24 },
  title: { fontSize: 32, fontWeight: '800', color: '#0f172a', marginBottom: 20 },
  profileCard: { backgroundColor: '#fff', borderRadius: 28, padding: 22, marginBottom: 24, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 20, elevation: 5, flexDirection: 'row', gap: 18 },
  avatarPlaceholder: { width: 110, height: 110, borderRadius: 24, backgroundColor: '#2563eb', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: '800' },
  profileInfo: { flex: 1 },
  label: { color: '#475569', fontSize: 14, marginTop: 10, marginBottom: 8 },
  input: { backgroundColor: '#f8fafc', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#cbd5e1', color: '#0f172a' },
  uploadButton: { marginTop: 16, backgroundColor: '#2563eb', borderRadius: 16, padding: 16 },
  uploadButtonText: { textAlign: 'center', color: '#fff', fontWeight: '700' },
  card: { backgroundColor: '#fff', borderRadius: 28, padding: 22, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 18, elevation: 4, marginBottom: 16 },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#1d4ed8', marginBottom: 10 },
  cardText: { fontSize: 15, color: '#475569', lineHeight: 22 },
  status: { color: '#2563eb', marginBottom: 14, marginTop: 10 },
  logoutButton: { marginTop: 8, backgroundColor: '#dc2626', borderRadius: 18, paddingVertical: 16, alignItems: 'center' },
  logoutButtonText: { color: '#fff', fontWeight: '700' }
});
