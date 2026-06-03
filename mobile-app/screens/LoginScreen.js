import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { loginUser } from '../services/apiClient';

export default function LoginScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await loginUser({ email, password });
      onLogin({ token: response.token, user: response.user });
      navigation.replace('Home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.page}
    >
      <View style={styles.container}>
        <Text style={styles.title}>DailyTracker</Text>
        <Text style={styles.subtitle}>Sign in to sync your goals with the backend.</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#94a3b8"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
        </TouchableOpacity>

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.switchLink}>Create one</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#e7f0ff', justifyContent: 'center' },
  container: { padding: 24 },
  title: { fontSize: 36, fontWeight: '900', color: '#0f172a', marginBottom: 10 },
  subtitle: { color: '#475569', fontSize: 16, marginBottom: 24 },
  input: { backgroundColor: '#fff', borderRadius: 18, padding: 16, marginBottom: 14, borderColor: '#cbd5e1', borderWidth: 1, color: '#0f172a' },
  button: { backgroundColor: '#2563eb', borderRadius: 18, paddingVertical: 16, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 },
  switchText: { color: '#475569', marginRight: 6 },
  switchLink: { color: '#2563eb', fontWeight: '700' },
  error: { color: '#dc2626', marginTop: 10 }
});
