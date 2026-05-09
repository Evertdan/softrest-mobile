import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = StackScreenProps<RootStackParamList, 'Orders'>;

type OrderStatus = 'Todas' | 'En preparación' | 'Lista' | 'Entregada';

interface Order {
  id: string;
  customer: string;
  timeAgo: string;
  status: OrderStatus;
  total: string;
  items: string[];
}

const MOCK_ORDERS: Order[] = [
  { id: '#001', customer: 'Juan Pérez', timeAgo: 'Hace 5 min', status: 'En preparación', total: '$156.00', items: ['2x Tacos al Pastor', '1x Agua de Horchata'] },
  { id: '#002', customer: 'María García', timeAgo: 'Hace 12 min', status: 'Lista', total: '$89.50', items: ['1x Enchiladas Suizas', '2x Refresco'] },
  { id: '#003', customer: 'Carlos López', timeAgo: 'Hace 18 min', status: 'Entregada', total: '$234.00', items: ['1x Parrillada Mixta', '2x Cerveza'] },
  { id: '#004', customer: 'Ana Martínez', timeAgo: 'Hace 25 min', status: 'En preparación', total: '$67.00', items: ['1x Sopa de Tortilla', '1x Limonada'] },
  { id: '#005', customer: 'Pedro Sánchez', timeAgo: 'Hace 32 min', status: 'Lista', total: '$198.00', items: ['3x Tacos de Pescado', '1x Agua de Jamaica'] },
  { id: '#006', customer: 'Laura Torres', timeAgo: 'Hace 45 min', status: 'Entregada', total: '$145.00', items: ['1x Chiles en Nogada', '1x Vino Tinto'] },
  { id: '#007', customer: 'Roberto Díaz', timeAgo: 'Hace 1 hora', status: 'En preparación', total: '$78.00', items: ['2x Quesadilla', '1x Café'] },
  { id: '#008', customer: 'Sofía Hernández', timeAgo: 'Hace 1 hora', status: 'Entregada', total: '$312.00', items: ['1x Molcajete', '2x Margarita'] },
];

const FILTERS: OrderStatus[] = ['Todas', 'En preparación', 'Lista', 'Entregada'];

export default function OrdersScreen({ navigation }: Props) {
  const [activeFilter, setActiveFilter] = useState<OrderStatus>('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = MOCK_ORDERS.filter(order => {
    const matchesFilter = activeFilter === 'Todas' || order.status === activeFilter;
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'En preparación':
        return { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B' };
      case 'Lista':
        return { bg: '#DBEAFE', text: '#1E40AF', border: '#3B82F6' };
      case 'Entregada':
        return { bg: '#D1FAE5', text: '#065F46', border: '#10B981' };
      default:
        return { bg: '#F3F4F6', text: '#374151', border: '#9CA3AF' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Órdenes</Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar orden..."
          placeholderTextColor={COLORS.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterChip,
              activeFilter === filter && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.ordersList}
      >
        {filteredOrders.map((order, index) => {
          const statusColor = getStatusColor(order.status);
          return (
            <View key={index} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View style={styles.orderLeft}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.orderCustomer}>{order.customer}</Text>
                  <Text style={styles.orderTime}>{order.timeAgo}</Text>
                </View>
                <View style={styles.orderRight}>
                  <View style={[styles.statusBadge, { backgroundColor: statusColor.bg, borderColor: statusColor.border }]} >
                    <Text style={[styles.statusText, { color: statusColor.text }]}>{order.status}</Text>
                  </View>
                  <Text style={styles.orderTotal}>{order.total}</Text>
                </View>
              </View>

              <View style={styles.orderItems}>
                {order.items.map((item, idx) => (
                  <Text key={idx} style={styles.orderItemText}>• {item}</Text>
                ))}
              </View>

              <View style={styles.orderFooter}>
                <TouchableOpacity style={styles.detailButton}>
                  <Text style={styles.detailButtonText}>Ver detalle</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const COLORS = {
  background: '#FAFAF9',
  primary: '#C05621',
  text: '#18181B',
  textSecondary: '#3F3F46',
  textMuted: '#71717A',
  white: '#FFFFFF',
  border: '#E4E4E7',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    opacity: 0.5,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  filtersContainer: {
    marginTop: 12,
    marginBottom: 8,
  },
  filtersContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  ordersList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  orderCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderLeft: {
    flex: 1,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  orderCustomer: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  orderTime: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  orderItems: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F4F4F5',
  },
  orderItemText: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  orderFooter: {
    marginTop: 12,
    alignItems: 'flex-end',
  },
  detailButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  detailButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 100,
  },
});
