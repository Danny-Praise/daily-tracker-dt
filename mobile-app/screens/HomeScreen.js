import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';

export default function HomeScreen({ navigation, user }) {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome back{user?.full_name ? `, ${user.full_name}` : ''}!</Text>
      <Text style={styles.subtitle}>Your all-in-one goal, journal, and archive companion.</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Built for Android & Apple</Text>
        <Text style={styles.cardText}>
          This app now supports backend auth and synced goal tracking from your DailyTracker server.
        </Text>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Goals')}>
          <Text style={styles.buttonText}>Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Journal')}>
          <Text style={styles.buttonText}>Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Archive')}>
          <Text style={styles.buttonText}>Archive</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#e7f0ff' },
  container: { padding: 24, alignItems: 'stretch' },
  title: { fontSize: 34, fontWeight: '800', color: '#0f172a', marginBottom: 12 },
  subtitle: { color: '#475569', fontSize: 17, lineHeight: 24, marginBottom: 24 },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 20, marginBottom: 24, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 20, elevation: 5 },
  cardTitle: { fontSize: 20, fontWeight: '700', marginBottom: 10, color: '#1d4ed8' },
  cardText: { color: '#475569', fontSize: 15, lineHeight: 22 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 14 },
  button: { flex: 1, minWidth: 130, backgroundColor: '#2563eb', borderRadius: 18, paddingVertical: 18, paddingHorizontal: 16, marginBottom: 14 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700', textAlign: 'center' }
});
