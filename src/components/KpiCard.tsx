import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface KpiCardProps {
  title: string;
  value: string;
  icon: string;
  iconColor?: string;
  iconBackgroundColor?: string;
  badge?: string;
  badgeColor?: string;
  warningIcon?: boolean;
}

export default function KpiCard({
  title,
  value,
  icon,
  iconColor = '#C05621',
  iconBackgroundColor = 'rgba(192, 86, 33, 0.1)',
  badge,
  badgeColor = '#57423A',
  warningIcon = false,
}: KpiCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
          <MaterialIcons name={icon as any} size={24} color={iconColor} />
        </View>
        {badge && (
          <View style={[styles.badge, { backgroundColor: 'rgba(192, 86, 33, 0.1)' }]}>
            <Text style={[styles.badgeText, { color: badgeColor }]}>{badge}</Text>
          </View>
        )}
        {warningIcon && (
          <MaterialIcons name="warning" size={20} color="#ba1a1a" />
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(222, 192, 181, 0.5)',
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14.4,
  },
  content: {
    marginTop: 4,
  },
  title: {
    fontSize: 14,
    lineHeight: 21,
    color: '#57423A',
    fontWeight: '400',
  },
  value: {
    fontSize: 32,
    lineHeight: 38.4,
    color: '#1A1B22',
    fontWeight: '600',
    marginTop: 4,
  },
});
