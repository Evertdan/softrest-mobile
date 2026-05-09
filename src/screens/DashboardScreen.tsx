import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = StackScreenProps<RootStackParamList, 'Dashboard'>;

const MOCK_KPIS = [
  { label: 'Ventas del día', value: '$1,245', icon: '💰', trend: '+12%' },
  { label: 'Órdenes activas', value: '12', icon: '📋', trend: '2 nuevas' },
  { label: 'Mesas ocupadas', value: '8/15', icon: '🪑', trend: '53%' },
  { label: 'Productos bajos', value: '3', icon: '⚠️', trend: 'Revisar' },
];

const MOCK_ORDERS = [
  { id: '#001', customer: 'Juan Pérez', status: 'En preparación', total: '$156.00' },
  { id: '#002', customer: 'María García', status: 'Lista', total: '$89.50' },
  { id: '#003', customer: 'Carlos López', status: 'Entregada', total: '$234.00' },
  { id: '#004', customer: 'Ana Martínez', status: 'En preparación', total: '$67.00' },
  { id: '#005', customer: 'Pedro Sánchez', status: 'Lista', total: '$198.00' },
];

const HOURS = ['8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm'];
const BAR_HEIGHTS = [40, 65, 85, 100, 75, 90, 55];

export default function DashboardScreen({ navigation }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En preparación':
        return { bg: '#FEF3C7', text: '#92400E' };
      case 'Lista':
        return { bg: '#DBEAFE', text: '#1E40AF' };
      case 'Entregada':
        return { bg: '#D1FAE5', text: '#065F46' };
      default:
        return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>¡Hola, Admin! 👋</Text>
            <Text style={styles.date}>Viernes, 8 de Mayo 2026</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
        </View>

        <View style={styles.kpiGrid}>
          {MOCK_KPIS.map((kpi, index) => (
            <View key={index} style={styles.kpiCard}>
              <Text style={styles.kpiIcon}>{kpi.icon}</Text>
              <Text style={styles.kpiValue}>{kpi.value}</Text>
              <Text style={styles.kpiLabel}>{kpi.label}</Text>
              <Text style={styles.kpiTrend}>{kpi.trend}</Text>
            </View>
          ))}
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Ventas por hora</Text>
          <View style={styles.chartContainer}>
            {BAR_HEIGHTS.map((height, index) => (
              <View key={index} style={styles.barContainer}>
                <View style={[styles.bar, { height: height * 1.5 }]} />
                <Text style={styles.barLabel}>{HOURS[index]}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.ordersCard}>
          <View style={styles.ordersHeader}>
            <Text style={styles.ordersTitle}>Órdenes recientes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todas →</Text>
            </TouchableOpacity>
          </View>

          {MOCK_ORDERS.map((order, index) => {
            const statusColor = getStatusColor(order.status);
            return (
              <View key={index} style={styles.orderItem}>
                <View style={styles.orderLeft}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.orderCustomer}>{order.customer}</Text>
                </View>
                <View style={styles.orderRight}>
                  <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
                    <Text style={[styles.statusText, { color: statusColor.text }]}>
                      {order.status}
                    </Text>
                  </View>
                  <Text style={styles.orderTotal}>{order.total}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.bottomNav}>
          {[
            { label: 'Inicio', icon: '🏠', active: true },
            { label: 'Órdenes', icon: '📋', active: false },
            { label: 'Productos', icon: '🍽️', active: false },
            { label: 'Cocina', icon: '👨‍🍳', active: false },
            { label: 'Más', icon: '⋮', active: false },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.navItem}>
              <Text style={[styles.navIcon, item.active && styles.navIconActive]}>
                {item.icon}
              </Text>
              <Text style={[styles.navLabel, item.active && styles.navLabelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
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
  bar: '#C05621',
  barBg: '#FED7AA',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  kpiCard: {
    width: '47%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 4,
  },
  kpiIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  kpiLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  kpiTrend: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  chartCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    margin: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
    paddingBottom: 24,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 32,
    backgroundColor: COLORS.bar,
    borderRadius: 6,
    opacity: 0.8,
  },
  barLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 8,
  },
  ordersCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    margin: 16,
    marginTop: 0,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 100,
  },
  ordersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ordersTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  seeAll: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5',
  },
  orderLeft: {
    flex: 1,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  orderCustomer: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#F4F4F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
    opacity: 0.5,
  },
  navIconActive: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  navLabelActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});
