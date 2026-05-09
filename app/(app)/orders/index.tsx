import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const mockOrders = [
  { id: '1', table: 'Mesa 1', total: '$245.00', status: 'Pendiente' },
  { id: '2', table: 'Mesa 3', total: '$189.50', status: 'En preparación' },
  { id: '3', table: 'Mesa 5', total: '$456.00', status: 'Listo' },
];

export default function OrdersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Órdenes</Text>
        
        {mockOrders.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderCard}
            onPress={() => router.push(`/(app)/orders/${order.id}`)}
          >
            <View style={styles.orderHeader}>
              <Text style={styles.orderTable}>{order.table}</Text>
              <Text style={styles.orderTotal}>{order.total}</Text>
            </View>
            <Text style={styles.orderStatus}>{order.status}</Text>
          </TouchableOpacity>
        ))}
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
  orderCard: {
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderTable: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  orderStatus: {
    fontSize: 14,
    color: '#64748b',
  },
});
