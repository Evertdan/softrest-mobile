import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';

// --- Types ---

interface Customer {
  id: string;
  name: string;
  phone: string;
  visits: number;
  totalSpent: string;
  lastVisit: string;
}

type FilterTab = 'Todos' | 'Frecuentes' | 'Nuevos';

// --- Colors (SoftRest Design System) ---

const colors = {
  canvasSand: '#FAFAF9',
  terracotta: '#C05621',
  charcoal: '#18181B',
  white: '#FFFFFF',
  grayText: '#6B7280',
  lightGray: '#E5E7EB',
  borderGray: '#F3F4F6',
};

// --- Component ---

export function CustomersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('Todos');

  const filterTabs: FilterTab[] = ['Todos', 'Frecuentes', 'Nuevos'];

  const getFilteredCustomers = (): Customer[] => {
    let filtered = customers;

    if (activeFilter === 'Frecuentes') {
      filtered = filtered.filter((c) => c.visits >= 10);
    } else if (activeFilter === 'Nuevos') {
      filtered = filtered.filter((c) => c.visits <= 5);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.phone.includes(query)
      );
    }

    return filtered;
  };

  const renderFilterTab = (tab: FilterTab) => {
    const isActive = activeFilter === tab;
    return (
      <TouchableOpacity
        key={tab}
        onPress={() => setActiveFilter(tab)}
        activeOpacity={0.8}
        style={[styles.filterTab, isActive && styles.filterTabActive]}
      >
        <Text
          style={[
            styles.filterTabText,
            isActive && styles.filterTabTextActive,
          ]}
        >
          {tab}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCustomerCard = ({ item }: { item: Customer }) => {
    const initial = item.name.charAt(0).toUpperCase();

    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.totalSpent}>{item.totalSpent}</Text>
            </View>

            <Text style={styles.phone}>{item.phone}</Text>

            <View style={styles.statsRow}>
              <Text style={styles.visitStats}>
                Visitas: {item.visits}
              </Text>
              <Text style={styles.lastVisit}>
                Última: {item.lastVisit}
              </Text>
            </View>
          </View>

          <View style={styles.chevronContainer}>
            <Text style={styles.chevron}>&gt;</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredCustomers = getFilteredCustomers();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.canvasSand} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Clientes</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchIcon}>
          <Text style={styles.searchIconText}>🔍</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar cliente..."
          placeholderTextColor={colors.grayText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {filterTabs.map(renderFilterTab)}
      </View>

      {/* Customer List */}
      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) => item.id}
        renderItem={renderCustomerCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No se encontraron clientes</Text>
          </View>
        }
      />

      {/* FAB */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.fab}
        onPress={() => {
          // TODO: Navigate to add customer screen
        }}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.canvasSand,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.charcoal,
    letterSpacing: -0.5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchIconText: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.charcoal,
    paddingVertical: 2,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.borderGray,
  },
  filterTabActive: {
    backgroundColor: colors.terracotta,
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.grayText,
  },
  filterTabTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    gap: 12,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.terracotta,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  infoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.charcoal,
    flex: 1,
    marginRight: 8,
  },
  totalSpent: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.terracotta,
  },
  phone: {
    fontSize: 13,
    color: colors.grayText,
    marginBottom: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  visitStats: {
    fontSize: 13,
    color: colors.grayText,
    fontWeight: '500',
  },
  lastVisit: {
    fontSize: 12,
    color: colors.lightGray,
    fontWeight: '400',
  },
  chevronContainer: {
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevron: {
    fontSize: 18,
    color: colors.grayText,
    fontWeight: '400',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 15,
    color: colors.grayText,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.terracotta,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 28,
    fontWeight: '300',
    color: colors.white,
    lineHeight: 32,
  },
});

// --- Mock Data ---

const customers: Customer[] = [
  {
    id: '1',
    name: 'Carlos Rodríguez',
    phone: '+52 55 1234 5678',
    visits: 15,
    totalSpent: '$2,450.00',
    lastVisit: '22 Oct',
  },
  {
    id: '2',
    name: 'María González',
    phone: '+52 55 8765 4321',
    visits: 8,
    totalSpent: '$1,120.00',
    lastVisit: '20 Oct',
  },
  {
    id: '3',
    name: 'Alejandro Vargas',
    phone: '+52 55 2468 1357',
    visits: 22,
    totalSpent: '$3,890.00',
    lastVisit: '24 Oct',
  },
  {
    id: '4',
    name: 'Lucía Martínez',
    phone: '+52 55 9876 5432',
    visits: 5,
    totalSpent: '$780.00',
    lastVisit: '18 Oct',
  },
  {
    id: '5',
    name: 'Roberto López',
    phone: '+52 55 1357 2468',
    visits: 12,
    totalSpent: '$1,980.00',
    lastVisit: '23 Oct',
  },
  {
    id: '6',
    name: 'Ana Hernández',
    phone: '+52 55 8642 9753',
    visits: 3,
    totalSpent: '$450.00',
    lastVisit: '15 Oct',
  },
  {
    id: '7',
    name: 'Jorge Sánchez',
    phone: '+52 55 5678 9012',
    visits: 18,
    totalSpent: '$2,890.00',
    lastVisit: '21 Oct',
  },
  {
    id: '8',
    name: 'Patricia Flores',
    phone: '+52 55 4321 8765',
    visits: 9,
    totalSpent: '$1,340.00',
    lastVisit: '19 Oct',
  },
];
