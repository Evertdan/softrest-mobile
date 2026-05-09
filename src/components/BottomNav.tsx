import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface NavItem {
  icon: string;
  label: string;
  route: string;
  isActive?: boolean;
}

interface BottomNavProps {
  items: NavItem[];
  onNavigate: (route: string) => void;
}

export default function BottomNav({ items, onNavigate }: BottomNavProps) {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.navItem,
            item.isActive && styles.activeNavItem,
          ]}
          onPress={() => onNavigate(item.route)}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={item.icon as any}
            size={24}
            color={item.isActive ? '#C05621' : '#57423A'}
          />
          <Text
            style={[
              styles.navLabel,
              item.isActive && styles.activeNavLabel,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  activeNavItem: {
    backgroundColor: 'rgba(192, 86, 33, 0.1)',
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    color: '#57423A',
    marginTop: 2,
    lineHeight: 14.4,
  },
  activeNavLabel: {
    color: '#C05621',
  },
});
