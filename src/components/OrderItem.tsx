import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface OrderItemProps {
  orderNumber: string;
  table: string;
  customer: string;
  status: string;
  statusColor: string;
  statusBackgroundColor: string;
  amount: string;
}

export default function OrderItem({
  orderNumber,
  table,
  customer,
  status,
  statusColor,
  statusBackgroundColor,
  amount,
}: OrderItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.orderNumberBox}>
          <Text style={styles.orderNumberText}>#{orderNumber}</Text>
        </View>
        <View style={styles.orderDetails}>
          <Text style={styles.tableText}>{table}</Text>
          <Text style={styles.customerText}>{customer}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <View style={[styles.statusBadge, { backgroundColor: statusBackgroundColor }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
        </View>
        <Text style={styles.amountText}>{amount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(222, 192, 181, 0.2)',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  orderNumberBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#E3E1EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderNumberText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.7,
    color: '#1A1B22',
    lineHeight: 16.8,
  },
  orderDetails: {
    marginLeft: 12,
    flex: 1,
  },
  tableText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1A1B22',
    fontWeight: '500',
  },
  customerText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#57423A',
    fontWeight: '400',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14.4,
  },
  amountText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1A1B22',
    fontWeight: '600',
    width: 80,
    textAlign: 'right',
  },
});
