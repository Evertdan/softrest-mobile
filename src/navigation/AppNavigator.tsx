import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView, TouchableOpacity, Text, View } from 'react-native';

import { LoginScreen } from '../screens/LoginScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { OrdersScreen } from '../screens/OrdersScreen';
import { KitchenScreen } from '../screens/KitchenScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { TablesScreen } from '../screens/TablesScreen';
import { CashierScreen } from '../screens/CashierScreen';
import { CustomersScreen } from '../screens/CustomersScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const COLORS = {
  primary: '#C05621',
  inactive: '#52525B',
  white: '#FFFFFF',
  canvas: '#FAFAF9',
  charcoal: '#18181B',
};

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

// Orders Stack (nested within Pedidos tab)
export type OrdersStackParamList = {
  OrdersList: undefined;
  Kitchen: undefined;
};

const OrdersStackNav = createStackNavigator<OrdersStackParamList>();

function OrdersStack() {
  return (
    <OrdersStackNav.Navigator screenOptions={{ headerShown: false }}>
      <OrdersStackNav.Screen name="OrdersList" component={OrdersScreen} />
      <OrdersStackNav.Screen name="Kitchen" component={KitchenScreen} />
    </OrdersStackNav.Navigator>
  );
}

// More Stack (nested within Más tab)
export type MoreStackParamList = {
  MoreMenu: undefined;
  Cashier: undefined;
  Products: undefined;
  Settings: undefined;
};

const MoreStackNav = createStackNavigator<MoreStackParamList>();

function MoreMenuScreen({ navigation }: any) {
  const menuItems = [
    { icon: 'point-of-sale', label: 'Caja', route: 'Cashier' },
    { icon: 'restaurant-menu', label: 'Menú', route: 'Products' },
    { icon: 'settings', label: 'Configuración', route: 'Settings' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.canvas }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: COLORS.charcoal, marginBottom: 24 }}>
          Más opciones
        </Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 4,
              elevation: 2,
            }}
            onPress={() => navigation.navigate(item.route)}
            activeOpacity={0.8}
          >
            <MaterialIcons name={item.icon as any} size={24} color={COLORS.primary} style={{ marginRight: 12 }} />
            <Text style={{ fontSize: 16, fontWeight: '500', color: COLORS.charcoal, flex: 1 }}>{item.label}</Text>
            <MaterialIcons name="chevron-right" size={24} color="#A1A1AA" />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

function MoreStack() {
  return (
    <MoreStackNav.Navigator screenOptions={{ headerShown: false }}>
      <MoreStackNav.Screen name="MoreMenu" component={MoreMenuScreen} />
      <MoreStackNav.Screen name="Cashier" component={CashierScreen} />
      <MoreStackNav.Screen name="Products" component={ProductsScreen} />
      <MoreStackNav.Screen name="Settings" component={SettingsScreen} />
    </MoreStackNav.Navigator>
  );
}

// Main Tabs
export type MainTabParamList = {
  Home: undefined;
  Tables: undefined;
  Orders: undefined;
  Customers: undefined;
  More: undefined;
};

const MainTab = createBottomTabNavigator<MainTabParamList>();

function TabBarIcon({ name, color }: { name: any; color: string }) {
  return <MaterialIcons name={name} size={24} color={color} />;
}

function MainTabs() {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 12,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      }}
    >
      <MainTab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => <TabBarIcon name="dashboard" color={color} />,
        }}
      />
      <MainTab.Screen
        name="Tables"
        component={TablesScreen}
        options={{
          tabBarLabel: 'Mesas',
          tabBarIcon: ({ color }) => <TabBarIcon name="table-restaurant" color={color} />,
        }}
      />
      <MainTab.Screen
        name="Orders"
        component={OrdersStack}
        options={{
          tabBarLabel: 'Pedidos',
          tabBarIcon: ({ color }) => <TabBarIcon name="receipt-long" color={color} />,
        }}
      />
      <MainTab.Screen
        name="Customers"
        component={CustomersScreen}
        options={{
          tabBarLabel: 'Clientes',
          tabBarIcon: ({ color }) => <TabBarIcon name="people" color={color} />,
        }}
      />
      <MainTab.Screen
        name="More"
        component={MoreStack}
        options={{
          tabBarLabel: 'Más',
          tabBarIcon: ({ color }) => <TabBarIcon name="menu" color={color} />,
        }}
      />
    </MainTab.Navigator>
  );
}

// Root Navigator
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const isAuthenticated = false;

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="Main" component={MainTabs} />
        ) : (
          <>
            <RootStack.Screen name="Auth" component={AuthNavigator} />
            <RootStack.Screen name="Main" component={MainTabs} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
