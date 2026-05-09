import React, { useState } from 'react';
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
import { OrdersStackParamList } from '../navigation/AppNavigator';

type Props = StackScreenProps<OrdersStackParamList, 'Kitchen'>;

type KitchenTab = 'Pendiente' | 'En preparación' | 'Listo';

interface KitchenOrder {
  id: string;
  table: string;
  elapsedTime: string;
  items: string[];
  urgency: 'normal' | 'high' | 'critical';
}

const MOCK_ORDERS: Record<KitchenTab, KitchenOrder[]> = {
  Pendiente: [
    { id: '#001', table: 'Mesa 4', elapsedTime: '2 min', items: ['2x Tacos al Pastor', '1x Agua de Horchata', '1x Guacamole'], urgency: 'normal' },
    { id: '#002', table: 'Mesa 7', elapsedTime: '8 min', items: ['1x Parrillada Mixta', '2x Cerveza'], urgency: 'high' },
    { id: '#003', table: 'Mesa 2', elapsedTime: '12 min', items: ['3x Enchiladas Suizas', '1x Sopa de Tortilla'], urgency: 'critical' },
    { id: '#004', table: 'Barra 3', elapsedTime: '5 min', items: ['2x Quesadilla', '1x Limonada'], urgency: 'normal' },
    { id: '#005', table: 'Mesa 9', elapsedTime: '18 min', items: ['1x Molcajete', '2x Margarita', '1x Flan'], urgency: 'critical' },
  ],
  'En preparación': [
    { id: '#006', table: 'Mesa 1', elapsedTime: '10 min', items: ['1x Chiles en Nogada', '1x Vino Tinto'], urgency: 'high' },
    { id: '#007', table: 'Mesa 5', elapsedTime: '15 min', items: ['2x Hamburguesa Clásica', '2x Refresco'], urgency: 'normal' },
    { id: '#008', table: 'Mesa 8', elapsedTime: '22 min', items: ['1x Pizza Pepperoni', '1x Ensalada César'], urgency: 'critical' },
  ],
  Listo: [
    { id: '#009', table: 'Mesa 3', elapsedTime: '25 min', items: ['2x Tacos de Pescado', '1x Agua de Jamaica'], urgency: 'normal' },
    { id: '#010', table: 'Barra 1', elapsedTime: '30 min', items: ['1x Nachos Supremos', '2x Cerveza Artesanal'], urgency: 'normal' },
  ],
};

const TABS: KitchenTab[] = ['Pendiente', 'En preparación', 'Listo'];

export function KitchenScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<KitchenTab>('Pendiente');

  const getBorderColor = (tab: KitchenTab) => {
    switch (tab) {
      case 'Pendiente':
        return '#EF4444';
      case 'En preparación':
        return '#F59E0B';
      case 'Listo':
        return '#10B981';
      default:
        return '#9CA3AF';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return '#DC2626';
      case 'high':
        return '#EA580C';
      default:
        return '#6B7280';
    }
  };

  const getActionButton = (tab: KitchenTab) => {
    switch (tab) {
      case 'Pendiente':
        return 'Iniciar preparación';
      case 'En preparación':
        return 'Marcar listo';
      case 'Listo':
        return 'Entregar';
      default:
        return 'Acción';
    }
  };

  const currentOrders = MOCK_ORDERS[activeTab];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cocina</Text>
        <Text style={styles.clock}>{new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}</Text>
      </View>

      <View style={styles.tabsContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && { borderBottomColor: getBorderColor(tab), borderBottomWidth: 3 },
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <View style={styles.tabContent}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
              <View style={[
                styles.badge,
                { backgroundColor: getBorderColor(tab) }
              ]}>
                <Text style={styles.badgeText}>{MOCK_ORDERS[tab].length}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.ordersList}
      >
        {currentOrders.map((order, index) => (
          <View
            key={index}
            style={[
              styles.orderCard,
              { borderLeftColor: getBorderColor(activeTab), borderLeftWidth: 4 },
            ]}
          >
            <View style={styles.orderHeader}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.tableText}>{order.table}</Text>
              </View>
              <View style={[
                styles.timeBadge,
                { backgroundColor: getUrgencyColor(order.urgency) + '20' },
              ]}>
                <Text style={[
                  styles.timeText,
                  { color: getUrgencyColor(order.urgency) },
                ]}>
                  {order.elapsedTime}
                </Text>
              </View>
            </View>

            <View style={styles.itemsList}>
              {order.items.map((item, idx) => (
                <View key={idx} style={styles.itemRow}>
                  <View style={styles.itemDot} />
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={[
              styles.actionButton,
              { backgroundColor: getBorderColor(activeTab) },
            ]}>
              <Text style={styles.actionButtonText}>{getActionButton(activeTab)}</Text>
            </TouchableOpacity>
          </View>
        ))}

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
  },
  clock: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
    fontVariant: ['tabular-nums'],
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: COLORS.white,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  tabTextActive: {
    fontWeight: '700',
    color: COLORS.text,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  ordersList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
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
    marginBottom: 12,
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  tableText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  timeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  itemsList: {
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.textMuted,
    marginRight: 8,
  },
  itemText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  actionButton: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  bottomPadding: {
    height: 100,
  },
});
