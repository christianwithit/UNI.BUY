import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import Icon from '../components/Icon';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    // TODO: Implement actual login logic
    navigation.navigate('HomeFeed' as never);
  };

  const handleSignUp = () => {
    navigation.navigate('OnboardingPhone' as never);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Brand */}
        <View style={styles.header}>
          <Text style={styles.brandText}>UNI.BUY</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Icon Container */}
          <View style={styles.iconContainer}>
            <Icon name="shopping-bag" size={36} color={colors.primaryContainer} />
          </View>

          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>Enter your details to access your account</Text>

          {/* Form */}
          <View style={styles.form}>
            {/* Phone Number Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.phoneInputContainer}>
                <View style={styles.countryCode}>
                  <Text style={styles.countryCodeText}>+256</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="770 000 000"
                  placeholderTextColor={colors.outline}
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  maxLength={11}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.outline}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity 
                  style={styles.visibilityButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={20} 
                    color={colors.outline} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password Link */}
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Login</Text>
              <Icon name="arrow-right" size={20} color={colors.onPrimary} />
            </TouchableOpacity>
          </View>

          {/* Social Login Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="logo-google" size={20} color={colors.onSurface} />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="logo-apple" size={20} color={colors.onSurface} />
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Decorative Background Elements */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  header: {
    paddingTop: 48,
    paddingBottom: 24,
    alignItems: 'center',
  },
  brandText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primaryContainer,
    letterSpacing: -0.64,
    fontFamily: 'System',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    maxWidth: 448,
    width: '100%',
    alignSelf: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${colors.primary}0D`,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 32,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}4D`,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 14,
    color: colors.outline,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'System',
  },
  form: {
    width: '100%',
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    marginBottom: 4,
    marginLeft: 4,
    letterSpacing: 0.12,
    fontFamily: 'System',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
  },
  countryCode: {
    paddingLeft: 16,
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: colors.outlineVariant,
    height: 24,
    justifyContent: 'center',
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.onSurface,
    fontFamily: 'System',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 14,
    color: colors.onSurface,
    fontFamily: 'System',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 14,
    color: colors.onSurface,
    fontFamily: 'System',
  },
  visibilityButton: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 4,
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryContainer,
    fontFamily: 'System',
  },
  loginButton: {
    height: 48,
    backgroundColor: colors.primaryContainer,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onPrimary,
    letterSpacing: 0.1,
    fontFamily: 'System',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: `${colors.outlineVariant}80`,
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.outline,
    letterSpacing: 0.12,
    fontFamily: 'System',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 48,
  },
  socialButton: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    fontFamily: 'System',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: colors.outline,
    fontFamily: 'System',
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryContainer,
    fontFamily: 'System',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: `${colors.primary}0D`,
    zIndex: -1,
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: `${colors.secondaryContainer}1A`,
    zIndex: -1,
  },
});
