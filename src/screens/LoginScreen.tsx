import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AppNavigator';
import { useLogin } from '../hooks/useApi';

type Props = StackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useLogin();

  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }
    try {
      await login({ email, password });
      navigation.getParent()?.navigate('Main');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="restaurant" size={40} color="#C05621" />
              </View>
              <Text style={styles.title}>SoftRest</Text>
              <Text style={styles.subtitle}>Sistema de Gestión para Restaurantes</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Correo Electrónico</Text>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputIcon}>
                      <MaterialIcons
                        name="mail"
                        size={20}
                        color="rgba(87, 66, 58, 0.4)"
                      />
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="tu@email.com"
                      placeholderTextColor="rgba(87, 66, 58, 0.4)"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      autoComplete="email"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Contraseña</Text>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputIcon}>
                      <MaterialIcons
                        name="lock"
                        size={20}
                        color="rgba(87, 66, 58, 0.4)"
                      />
                    </View>
                    <TextInput
                      style={[styles.input, styles.inputWithRightIcon]}
                      placeholder="••••••"
                      placeholderTextColor="rgba(87, 66, 58, 0.4)"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoComplete="password"
                    />
                    <TouchableOpacity
                      style={styles.rightIcon}
                      onPress={() => setShowPassword(!showPassword)}
                      activeOpacity={0.7}
                    >
                      <MaterialIcons
                        name={showPassword ? 'visibility' : 'visibility-off'}
                        size={20}
                        color="rgba(87, 66, 58, 0.4)"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                  onPress={handleLogin}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  <Text style={styles.loginButtonText}>
                    {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={handleForgotPassword}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotPasswordText}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: 'center',
    gap: 32,
  },
  header: {
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    backgroundColor: 'rgba(192, 86, 33, 0.1)',
    padding: 16,
    borderRadius: 9999,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    lineHeight: 38.4,
    fontWeight: '600',
    color: '#1A1B22',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: '#57423A',
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(222, 192, 181, 0.3)',
    shadowColor: '#18181B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    gap: 16,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.7,
    color: '#1A1B22',
    lineHeight: 16.8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 44,
    paddingLeft: 44,
    paddingRight: 12,
    backgroundColor: '#FAFAF9',
    borderWidth: 1,
    borderColor: '#DEC0B5',
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 24,
    color: '#1A1B22',
  },
  inputWithRightIcon: {
    paddingRight: 44,
  },
  loginButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#C05621',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.7,
    color: '#FFFFFF',
    lineHeight: 16.8,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    paddingTop: 4,
  },
  forgotPasswordText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#57423A',
    fontWeight: '400',
  },
});
