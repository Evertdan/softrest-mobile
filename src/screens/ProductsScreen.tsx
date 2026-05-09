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
import { MoreStackParamList } from '../navigation/AppNavigator';

type Props = StackScreenProps<MoreStackParamList, 'Products'>;

type Category = 'Todos' | 'Entradas' | 'Platos fuertes' | 'Bebidas' | 'Postres';

interface Product {
  id: string;
  name: string;
  price: string;
  emoji: string;
  stock: 'Disponible' | 'Agotado';
  category: Category;
}

const CATEGORIES: Category[] = ['Todos', 'Entradas', 'Platos fuertes', 'Bebidas', 'Postres'];

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Tacos al Pastor', price: '$45.00', emoji: '🌮', stock: 'Disponible', category: 'Platos fuertes' },
  { id: '2', name: 'Hamburguesa Clásica', price: '$89.00', emoji: '🍔', stock: 'Disponible', category: 'Platos fuertes' },
  { id: '3', name: 'Limonada Natural', price: '$35.00', emoji: '🍹', stock: 'Disponible', category: 'Bebidas' },
  { id: '4', name: 'Pastel de Chocolate', price: '$65.00', emoji: '🍰', stock: 'Agotado', category: 'Postres' },
  { id: '5', name: 'Nachos Supremos', price: '$75.00', emoji: '🥘', stock: 'Disponible', category: 'Entradas' },
  { id: '6', name: 'Ensalada César', price: '$85.00', emoji: '🥗', stock: 'Disponible', category: 'Entradas' },
  { id: '7', name: 'Cerveza Artesanal', price: '$55.00', emoji: '🍺', stock: 'Disponible', category: 'Bebidas' },
  { id: '8', name: 'Flan Napolitano', price: '$45.00', emoji: '🍮', stock: 'Agotado', category: 'Postres' },
  { id: '9', name: 'Pizza Pepperoni', price: '$120.00', emoji: '🍕', stock: 'Disponible', category: 'Platos fuertes' },
  { id: '10', name: 'Agua de Horchata', price: '$30.00', emoji: '🥤', stock: 'Disponible', category: 'Bebidas' },
];

export function ProductsScreen({ navigation }: Props) {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Productos</Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar producto..."
          placeholderTextColor={COLORS.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              activeCategory === category && styles.categoryChipActive,
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.productsList}
      >
        <View style={styles.productsGrid}>
          {filteredProducts.map((product, index) => (
            <View key={index} style={styles.productCard}>
              <View style={styles.productEmojiContainer}>
                <Text style={styles.productEmoji}>{product.emoji}</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
              
              <View style={styles.stockContainer}>
                <View style={[
                  styles.stockDot,
                  { backgroundColor: product.stock === 'Disponible' ? '#10B981' : '#EF4444' }
                ]} />
                <Text style={[
                  styles.stockText,
                  { color: product.stock === 'Disponible' ? '#065F46' : '#991B1B' }
                ]}>
                  {product.stock}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
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
  categoriesContainer: {
    marginTop: 12,
    marginBottom: 8,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  categoryTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  productsList: {
    flex: 1,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
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
  productEmojiContainer: {
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  productEmoji: {
    fontSize: 48,
  },
  addButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  stockText: {
    fontSize: 12,
    fontWeight: '500',
  },
  bottomPadding: {
    height: 100,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  fabText: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 32,
  },
});
