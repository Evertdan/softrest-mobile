import { Tabs, Redirect } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../_layout';

const tabs = [
  { name: 'index', title: 'Dashboard', icon: 'home-outline' as const },
  { name: 'orders/index', title: 'Órdenes', icon: 'receipt-outline' as const },
  { name: 'products/index', title: 'Productos', icon: 'restaurant-outline' as const },
  { name: 'kitchen', title: 'Cocina', icon: 'flame-outline' as const },
  { name: 'cash-register', title: 'Caja', icon: 'cash-outline' as const },
  { name: 'inventory', title: 'Inventario', icon: 'cube-outline' as const },
  { name: 'clients', title: 'Clientes', icon: 'people-outline' as const },
  { name: 'cfdi', title: 'CFDI', icon: 'document-text-outline' as const },
  { name: 'delivery', title: 'Delivery', icon: 'bicycle-outline' as const },
  { name: 'loyalty', title: 'Lealtad', icon: 'star-outline' as const },
  { name: 'reports', title: 'Reportes', icon: 'bar-chart-outline' as const },
  { name: 'settings', title: 'Config', icon: 'settings-outline' as const },
];

export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      })}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={tab.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    height: 60,
    paddingBottom: 8,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
});
