import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';

// ─── Types ───────────────────────────────────────────────────────────────────

interface PendingPayment {
  id: string;
  tableNumber: string;
  customerName: string;
  amount: number;
  paymentMethod: string;
}

interface SummaryStat {
  label: string;
  value: string;
}

// ─── Design System Colors ────────────────────────────────────────────────────

const COLORS = {
  canvas: '#FAFAF9',
  primary: '#C05621',
  text: '#18181B',
  textSecondary: '#52525B',
  white: '#FFFFFF',
  border: '#E4E4E7',
  success: '#16A34A',
} as const;

// ─── Components ──────────────────────────────────────────────────────────────

function PaymentItem({
  item,
  onCollect,
}: {
  item: PendingPayment;
  onCollect: (id: string) => void;
}) {
  return (
    <View style={styles.paymentCard}>
      <View style={styles.paymentInfo}>
        <View style={styles.paymentRow}>
          <Text style={styles.tableNumber}>{item.tableNumber}</Text>
          <Text style={styles.customerName}>{item.customerName}</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
          <Text style={styles.paymentMethod}>{item.paymentMethod}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.collectButton}
        onPress={() => onCollect(item.id)}
        activeOpacity={0.8}
      >
        <Text style={styles.collectButtonText}>Cobrar</Text>
      </TouchableOpacity>
    </View>
  );
}

function SummaryCard({
  total,
  stats,
}: {
  total: string;
  stats: SummaryStat[];
}) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.totalLabel}>Total en caja</Text>
      <Text style={styles.totalAmount}>{total}</Text>
      <View style={styles.statsRow}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statItem}>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────

export function CashierScreen(): React.JSX.Element {
  const handleCollect = (id: string) => {
    // TODO: Implement payment collection logic
    console.log(`Cobrar orden: ${id}`);
  };

  const handleCloseCashier = () => {
    // TODO: Implement daily cashier close logic
    console.log('Cerrar caja diaria');
  };

  const renderPaymentItem = ({
    item,
  }: {
    item: PendingPayment;
  }) => <PaymentItem item={item} onCollect={handleCollect} />;

  const keyExtractor = (item: PendingPayment) => item.id;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.canvas} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Caja</Text>
        <Text style={styles.headerSubtitle}>Turno: Mañana • 24 Oct</Text>
      </View>

      <FlatList
        data={mockPendingPayments}
        renderItem={renderPaymentItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <SummaryCard
            total="$1,245.50"
            stats={[
              { label: 'Órdenes', value: '14' },
              { label: 'Efectivo', value: '$850.00' },
              { label: 'Tarjetas', value: '$395.50' },
            ]}
          />
        }
        ListHeaderComponentStyle={styles.listHeader}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseCashier}
            activeOpacity={0.8}
          >
            <Text style={styles.closeButtonText}>Cerrar Caja Diaria</Text>
          </TouchableOpacity>
        }
        ListFooterComponentStyle={styles.listFooter}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.canvas,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  listHeader: {
    marginBottom: 16,
  },
  listFooter: {
    marginTop: 24,
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  paymentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentInfo: {
    flex: 1,
    marginRight: 12,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  tableNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginRight: 8,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  paymentMethod: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  collectButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
  },
  collectButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  separator: {
    height: 12,
  },
  closeButton: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
});

// ─── Mock Data ───────────────────────────────────────────────────────────────

const mockPendingPayments: PendingPayment[] = [
  {
    id: '1',
    tableNumber: 'Mesa 08',
    customerName: 'Alejandro V.',
    amount: 342.5,
    paymentMethod: 'Efectivo',
  },
  {
    id: '2',
    tableNumber: 'Mesa 04',
    customerName: 'Lucía M.',
    amount: 55.0,
    paymentMethod: 'Tarjeta',
  },
  {
    id: '3',
    tableNumber: 'Mesa 22',
    customerName: 'Roberto L.',
    amount: 210.0,
    paymentMethod: 'Transferencia',
  },
  {
    id: '4',
    tableNumber: 'Mesa 12',
    customerName: 'María G.',
    amount: 128.0,
    paymentMethod: 'Efectivo',
  },
];
