import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../navigation/AppNavigator';
import KpiCard from '../components/KpiCard';
import OrderItem from '../components/OrderItem';

type DashboardNavigationProp = BottomTabNavigationProp<MainTabParamList>;

interface Props {
  navigation: DashboardNavigationProp;
}

const SALES_DATA = [
  { time: '08:00', percentage: 15 },
  { time: '12:00', percentage: 65 },
  { time: '14:00', percentage: 90 },
  { time: '18:00', percentage: 45 },
  { time: '20:00', percentage: 75 },
];

const RECENT_ORDERS = [
  {
    orderNumber: '1042',
    table: 'Mesa 4',
    customer: 'Carlos R.',
    status: 'En preparación',
    statusColor: '#92400E',
    statusBackgroundColor: '#FEF3C7',
    amount: '$45.50',
  },
  {
    orderNumber: '1041',
    table: 'Para llevar',
    customer: 'Ana M.',
    status: 'Lista',
    statusColor: '#1E40AF',
    statusBackgroundColor: '#DBEAFE',
    amount: '$28.00',
  },
  {
    orderNumber: '1040',
    table: 'Mesa 12',
    customer: 'Luis G.',
    status: 'Entregada',
    statusColor: '#065F46',
    statusBackgroundColor: '#D1FAE5',
    amount: '$112.00',
  },
];

export function DashboardScreen({ navigation }: Props) {
  const handleNavigate = (route: string) => {
    switch (route) {
      case 'Orders':
        navigation.navigate('Orders');
        break;
      case 'Tables':
        navigation.navigate('Tables');
        break;
      case 'Cashier':
        navigation.navigate('More');
        break;
      case 'Products':
        navigation.navigate('More');
        break;
      default:
        navigation.navigate(route as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="restaurant" size={24} color="#C05621" />
          <Text style={styles.headerTitle}>SoftRest</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <MaterialIcons name="notifications" size={24} color="#57423A" />
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>¡Hola, Admin!</Text>
          <Text style={styles.greetingDate}>Viernes, 8 de Mayo</Text>
        </View>

        <View style={styles.kpiGrid}>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => handleNavigate('Cashier')}
          >
            <KpiCard
              title="Ventas del día"
              value="$1,245"
              icon="payments"
              badge="+14%"
            />
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => handleNavigate('Orders')}
          >
            <KpiCard
              title="Órdenes activas"
              value="12"
              icon="list-alt"
            />
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => handleNavigate('Tables')}
          >
            <KpiCard
              title="Mesas ocupadas"
              value="8"
              icon="table-restaurant"
            />
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => handleNavigate('Products')}
          >
            <KpiCard
              title="Productos bajos"
              value="3"
              icon="inventory-2"
              iconColor="#ba1a1a"
              iconBackgroundColor="rgba(186, 26, 26, 0.1)"
              warningIcon={true}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Flujo de Ventas</Text>
            <MaterialIcons name="more-horiz" size={24} color="#57423A" />
          </View>
          <View style={styles.chartContent}>
            {SALES_DATA.map((item, index) => (
              <View key={index} style={styles.barRow}>
                <Text style={styles.barLabel}>{item.time}</Text>
                <View style={styles.barBackground}>
                  <View
                    style={[
                      styles.barFill,
                      { width: `${item.percentage}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.ordersCard}>
          <View style={styles.ordersHeader}>
            <Text style={styles.ordersTitle}>Órdenes Recientes</Text>
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => handleNavigate('Orders')}
            >
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          <View>
            {RECENT_ORDERS.map((order, index) => (
              <OrderItem
                key={index}
                orderNumber={order.orderNumber}
                table={order.table}
                customer={order.customer}
                status={order.status}
                statusColor={order.statusColor}
                statusBackgroundColor={order.statusBackgroundColor}
                amount={order.amount}
              />
            ))}
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    color: '#1A1B22',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(192, 86, 33, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#C05621',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  greeting: {
    marginBottom: 8,
  },
  greetingTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    color: '#1A1B22',
    marginBottom: 4,
  },
  greetingDate: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: '#57423A',
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(222, 192, 181, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#1A1B22',
  },
  chartContent: {
    gap: 16,
    marginTop: 8,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  barLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#57423A',
    width: 48,
    textAlign: 'right',
    lineHeight: 14.4,
  },
  barBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#F4F2FD',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#C05621',
    borderRadius: 4,
  },
  ordersCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(222, 192, 181, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  ordersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(222, 192, 181, 0.3)',
  },
  ordersTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '500',
    color: '#1A1B22',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.7,
    color: '#C05621',
    lineHeight: 16.8,
  },
  bottomPadding: {
    height: 20,
  },
});
