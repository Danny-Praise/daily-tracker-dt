import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { registerUser } from '../services/apiClient';

export default function RegisterScreen({ navigation, onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      setError('Please fill all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await registerUser({ full_name: name, email, password });
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
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Register and sync your DailyTracker data.</Text>

        <TextInput
          style={styles.input}
          placeholder="Full name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#94a3b8"
        />
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
          <Text style={styles.buttonText}>{loading ? 'Creating account...' : 'Register'}</Text>
        </TouchableOpacity>

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.switchLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#e7f0ff', justifyContent: 'center' },
  container: { padding: 24 },
  title: { fontSize: 34, fontWeight: '900', color: '#0f172a', marginBottom: 10 },
  subtitle: { color: '#475569', fontSize: 16, marginBottom: 24 },
  input: { backgroundColor: '#fff', borderRadius: 18, padding: 16, marginBottom: 14, borderColor: '#cbd5e1', borderWidth: 1, color: '#0f172a' },
  button: { backgroundColor: '#2563eb', borderRadius: 18, paddingVertical: 16, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 },
  switchText: { color: '#475569', marginRight: 6 },
  switchLink: { color: '#2563eb', fontWeight: '700' },
  error: { color: '#dc2626', marginTop: 10 }
});
