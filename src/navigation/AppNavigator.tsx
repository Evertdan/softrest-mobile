import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

// Auth Stack Screens
import { LoginScreen } from '../screens/LoginScreen';

// Main Tab Screens
import { DashboardScreen } from '../screens/DashboardScreen';
import { TablesScreen } from '../screens/TablesScreen';
import { OrdersScreen } from '../screens/OrdersScreen';
import { KitchenScreen } from '../screens/KitchenScreen';
import { CustomersScreen } from '../screens/CustomersScreen';
import { CashierScreen } from '../screens/CashierScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

// ─── Type Definitions ────────────────────────────────────────────────────────

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};

export type MainTabParamList = {
  Inicio: undefined;
  Mesas: undefined;
  Pedidos: undefined;
  Clientes: undefined;
  Más: undefined;
};

export type OrdersStackParamList = {
  OrdersList: undefined;
  Kitchen: undefined;
};

export type MoreStackParamList = {
  Cashier: undefined;
  Products: undefined;
  Settings: undefined;
};

// ─── Navigators ──────────────────────────────────────────────────────────────

const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const OrdersStackNav = createStackNavigator<OrdersStackParamList>();
const MoreStackNav = createStackNavigator<MoreStackParamList>();

// ─── Tab Bar Options ─────────────────────────────────────────────────────────

const TAB_BAR_OPTIONS = {
  tabBarActiveTintColor: '#C05621',
  tabBarInactiveTintColor: '#52525B',
  tabBarStyle: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E4E4E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
    paddingBottom: 8,
    paddingTop: 4,
    height: 64,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  headerShown: false,
};

// ─── Stack Screen Options ────────────────────────────────────────────────────

const STACK_SCREEN_OPTIONS = {
  headerShown: false,
};

// ─── Orders Stack (Nested inside Pedidos tab) ────────────────────────────────

function OrdersStack() {
  return (
    <OrdersStackNav.Navigator screenOptions={STACK_SCREEN_OPTIONS}>
      <OrdersStackNav.Screen name="OrdersList" component={OrdersScreen} />
      <OrdersStackNav.Screen name="Kitchen" component={KitchenScreen} />
    </OrdersStackNav.Navigator>
  );
}

// ─── More Stack (Nested inside Más tab) ──────────────────────────────────────

function MoreStack() {
  return (
    <MoreStackNav.Navigator screenOptions={STACK_SCREEN_OPTIONS}>
      <MoreStackNav.Screen name="Cashier" component={CashierScreen} />
      <MoreStackNav.Screen name="Products" component={ProductsScreen} />
      <MoreStackNav.Screen name="Settings" component={SettingsScreen} />
    </MoreStackNav.Navigator>
  );
}

// ─── Auth Stack ──────────────────────────────────────────────────────────────

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={STACK_SCREEN_OPTIONS}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

// ─── Main Tabs ───────────────────────────────────────────────────────────────

function MainNavigator() {
  return (
    <MainTab.Navigator screenOptions={TAB_BAR_OPTIONS}>
      <MainTab.Screen
        name="Inicio"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Mesas"
        component={TablesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="table-restaurant" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Pedidos"
        component={OrdersStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="receipt-long" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Clientes"
        component={CustomersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Más"
        component={MoreStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="menu" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
}

// ─── Root Navigator ──────────────────────────────────────────────────────────

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={STACK_SCREEN_OPTIONS} initialRouteName="Auth">
        <RootStack.Screen name="Auth" component={AuthNavigator} />
        <RootStack.Screen name="Main" component={MainNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
