import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchGoals, createGoal, completeGoal } from '../services/apiClient';

export default function GoalsScreen({ user, token }) {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadGoals = async () => {
      if (!user?.id || !token) return;
      setLoading(true);
      setError('');

      try {
        const data = await fetchGoals(user.id, token);
        setGoals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadGoals();
  }, [user, token]);

  const handleAddGoal = async () => {
    if (!newGoal.trim()) return;
    setSaving(true);
    setError('');

    try {
      const response = await createGoal({ title: newGoal, category: 'Mobile' }, token);
      setGoals([response.goal, ...goals]);
      setNewGoal('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleComplete = async (goalId) => {
    setError('');
    try {
      await completeGoal(goalId, token);
      setGoals(goals.map((goal) => goal.id === goalId ? { ...goal, completed: true } : goal));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Goals</Text>
      <Text style={styles.subtitle}>Your backend-synced goals are listed here.</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a goal"
          placeholderTextColor="#94a3b8"
          value={newGoal}
          onChangeText={setNewGoal}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddGoal} disabled={saving}>
          <Text style={styles.addButtonText}>{saving ? 'Saving...' : 'Add'}</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" style={styles.loader} />
      ) : goals.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No goals yet. Add one to get started.</Text>
        </View>
      ) : (
        goals.map((goal) => (
          <View key={goal.id} style={[styles.goalCard, goal.completed && styles.completedCard]}>
            <Text style={[styles.goalText, goal.completed && styles.completedText]}>{goal.title}</Text>
            <View style={styles.goalActions}>
              <Text style={styles.goalCategory}>{goal.category || 'General'}</Text>
              {!goal.completed && (
                <TouchableOpacity style={styles.completeButton} onPress={() => handleComplete(goal.id)}>
                  <Text style={styles.completeButtonText}>Complete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#e7f0ff' },
  container: { padding: 24 },
  title: { fontSize: 32, fontWeight: '800', color: '#0f172a', marginBottom: 10 },
  subtitle: { color: '#475569', fontSize: 16, marginBottom: 20 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  input: { flex: 1, backgroundColor: '#fff', borderRadius: 18, padding: 16, marginRight: 12, borderWidth: 1, borderColor: '#cbd5e1', color: '#0f172a' },
  addButton: { backgroundColor: '#2563eb', borderRadius: 18, paddingVertical: 16, paddingHorizontal: 18, justifyContent: 'center' },
  addButtonText: { color: '#fff', fontWeight: '700' },
  loader: { marginTop: 40 },
  emptyState: { padding: 24, backgroundColor: '#fff', borderRadius: 24, alignItems: 'center' },
  emptyText: { color: '#475569', fontSize: 16 },
  goalCard: { backgroundColor: '#fff', borderRadius: 24, padding: 18, marginBottom: 14, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 18, elevation: 4 },
  completedCard: { backgroundColor: '#e0f2fe' },
  goalText: { fontSize: 17, fontWeight: '700', color: '#0f172a', marginBottom: 8 },
  completedText: { textDecorationLine: 'line-through', color: '#475569' },
  goalActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  goalCategory: { color: '#475569', fontSize: 14 },
  completeButton: { backgroundColor: '#22c55e', borderRadius: 16, paddingVertical: 10, paddingHorizontal: 14 },
  completeButtonText: { color: '#fff', fontWeight: '700' },
  error: { color: '#dc2626', marginBottom: 14 }
});
