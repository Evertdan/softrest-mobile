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

interface SettingItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

const COLORS = {
  canvas: '#FAFAF9',
  primary: '#C05621',
  text: '#18181B',
  textSecondary: '#52525B',
  textMuted: '#A1A1AA',
  white: '#FFFFFF',
  border: '#E4E4E7',
} as const;

function ProfileCard() {
  return (
    <View style={styles.profileCard}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>A</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>Administrador</Text>
        <Text style={styles.profileRole}>Gerente</Text>
      </View>
      <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
        <Text style={styles.editButtonText}>Editar</Text>
      </TouchableOpacity>
    </View>
  );
}

function SettingRow({ item }: { item: SettingItem }) {
  return (
    <TouchableOpacity style={styles.settingRow} activeOpacity={0.8}>
      <View style={styles.settingIcon}>
        <Text style={styles.settingIconText}>{item.icon}</Text>
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

export function SettingsScreen(): React.JSX.Element {
  const handleLogout = () => {
    console.log('Cerrar sesión');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.canvas} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configuración</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileCard />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferencias</Text>
          <View style={styles.sectionCard}>
            {settingsData.preferences.map((item) => (
              <SettingRow key={item.id} item={item} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sistema</Text>
          <View style={styles.sectionCard}>
            {settingsData.system.map((item) => (
              <SettingRow key={item.id} item={item} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conexiones</Text>
          <View style={styles.sectionCard}>
            {settingsData.connections.map((item) => (
              <SettingRow key={item.id} item={item} />
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>SoftRest v2.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  scrollContent: {
    padding: 16,
    paddingTop: 8,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(192, 86, 33, 0.1)',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(228, 228, 231, 0.5)',
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(192, 86, 33, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingIconText: {
    fontSize: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  chevron: {
    fontSize: 20,
    fontWeight: '400',
    color: COLORS.textMuted,
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  versionText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.textMuted,
    textAlign: 'center',
    marginBottom: 24,
  },
});

const settingsData = {
  preferences: [
    { id: '1', title: 'General', subtitle: 'Información del local, moneda, impuestos', icon: '⚙️' },
    { id: '2', title: 'Personalización', subtitle: 'Temas, idioma, apariencia', icon: '🎨' },
    { id: '3', title: 'Notificaciones', subtitle: 'Push, email, sonidos', icon: '🔔' },
  ],
  system: [
    { id: '4', title: 'Seguridad', subtitle: 'Contraseña, biometría, PIN', icon: '🔒' },
    { id: '5', title: 'Impresoras', subtitle: 'Recibos, cocina, etiquetas', icon: '🖨️' },
  ],
  connections: [
    { id: '6', title: 'Integraciones', subtitle: 'Pasarelas de pago, apps de delivery', icon: '🔗' },
  ],
};
