import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Detalle de Orden</Text>
        <View style={styles.card}>
          <Text style={styles.label}>ID de Orden:</Text>
          <Text style={styles.value}>{id}</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.label}>Estado:</Text>
          <Text style={styles.value}>En preparación</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.value}>$245.00</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
});
