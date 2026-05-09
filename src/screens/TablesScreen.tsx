import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';

// ─── Types ───────────────────────────────────────────────────────────────────

type TableStatus = 'Libre' | 'Ocupada' | 'Reservada';

interface Table {
  id: string;
  number: string;
  status: TableStatus;
  chairs: number;
  currentBill?: number;
}

type FilterTab = 'Todas' | 'Libres' | 'Ocupadas' | 'Reservadas';

// ─── Design System Colors ────────────────────────────────────────────────────

const COLORS = {
  canvas: '#FAFAF9',
  primary: '#C05621',
  text: '#18181B',
  textSecondary: '#52525B',
  textMuted: '#A1A1AA',
  white: '#FFFFFF',
  border: '#E4E4E7',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#eab308',
} as const;

const STATUS_COLORS: Record<TableStatus, string> = {
  Libre: COLORS.success,
  Ocupada: COLORS.danger,
  Reservada: COLORS.warning,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

// ─── Components ──────────────────────────────────────────────────────────────

function TableCard({ table }: { table: Table }) {
  const statusColor = STATUS_COLORS[table.status];

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.tableNumber}>Mesa {table.number}</Text>
          <View
            style={[styles.statusDot, { backgroundColor: statusColor }]}
          />
        </View>

        <Text style={styles.chairsText}>
          {table.chairs} {table.chairs === 1 ? 'silla' : 'sillas'}
        </Text>

        {table.status === 'Ocupada' && table.currentBill !== undefined && (
          <Text style={styles.billText}>
            {formatCurrency(table.currentBill)}
          </Text>
        )}

        <View style={[styles.statusBadge, { backgroundColor: `${statusColor}15` }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {table.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function FilterPill({
  label,
  isActive,
  onPress,
}: {
  label: string;
  isActive: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.pill, isActive && styles.pillActive]}
      activeOpacity={0.8}
    >
      <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────

export function TablesScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('Todas');

  const filterTabs: FilterTab[] = ['Todas', 'Libres', 'Ocupadas', 'Reservadas'];

  const getFilteredTables = (): Table[] => {
    if (activeFilter === 'Todas') return tables;
    if (activeFilter === 'Libres') return tables.filter((t) => t.status === 'Libre');
    if (activeFilter === 'Ocupadas') return tables.filter((t) => t.status === 'Ocupada');
    if (activeFilter === 'Reservadas') return tables.filter((t) => t.status === 'Reservada');
    return tables;
  };

  const filteredTables = getFilteredTables();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.canvas} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mesas</Text>
        <Text style={styles.subtitle}>
          Turno: Almuerzo · 12:45 PM
        </Text>
      </View>

      {/* Filter Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterList}
      >
        {filterTabs.map((tab) => (
          <FilterPill
            key={tab}
            label={tab}
            isActive={activeFilter === tab}
            onPress={() => setActiveFilter(tab)}
          />
        ))}
      </ScrollView>

      {/* Table Grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.gridContainer}
        contentContainerStyle={styles.gridContent}
      >
        <View style={styles.gridRow}>
          {filteredTables.map((table, index) => (
            <View
              key={table.id}
              style={[
                styles.gridItem,
                (index % 3 !== 2) && styles.gridItemMargin,
              ]}
            >
              <TableCard table={table} />
            </View>
          ))}
        </View>

        {filteredTables.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay mesas en esta categoría</Text>
          </View>
        )}
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  filterContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  filterList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  pillText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  pillTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  gridContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  gridContent: {
    paddingTop: 8,
    paddingBottom: 32,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '32%',
    marginBottom: 12,
  },
  gridItemMargin: {
    marginRight: '2%',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tableNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  chairsText: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 10,
  },
  billText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.textMuted,
  },
});

// ─── Mock Data ───────────────────────────────────────────────────────────────

const tables: Table[] = [
  { id: '1', number: '01', status: 'Libre', chairs: 4 },
  { id: '2', number: '02', status: 'Ocupada', chairs: 2, currentBill: 245.0 },
  { id: '3', number: '03', status: 'Libre', chairs: 6 },
  { id: '4', number: '04', status: 'Reservada', chairs: 4 },
  { id: '5', number: '05', status: 'Ocupada', chairs: 4, currentBill: 189.5 },
  { id: '6', number: '06', status: 'Libre', chairs: 2 },
  { id: '7', number: '07', status: 'Libre', chairs: 8 },
  { id: '8', number: '08', status: 'Ocupada', chairs: 4, currentBill: 320.0 },
  { id: '9', number: '09', status: 'Reservada', chairs: 2 },
  { id: '10', number: '10', status: 'Libre', chairs: 4 },
  { id: '11', number: '11', status: 'Ocupada', chairs: 6, currentBill: 156.0 },
  { id: '12', number: '12', status: 'Libre', chairs: 2 },
];
