import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import Icon from '../components/Icon';

export default function CreateProfile() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleContinue = () => {
    if (username && password && password === confirmPassword && password.length >= 8) {
      navigation.navigate('OnboardingSetup' as never);
    }
  };

  const isPasswordValid = password.length >= 8;
  const isFormValid = username && password && password === confirmPassword && isPasswordValid;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Icon name="back" size={24} color={colors.primaryContainer} />
        </TouchableOpacity>
        <Text style={styles.progressText}>Step 2.5 of 4</Text>
        <Text style={styles.brandText}>UNI.BUY</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: '62.5%' }]} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Content */}
        <View style={styles.heroSection}>
          <Text style={styles.title}>Create your profile</Text>
          <Text style={styles.subtitle}>
            Choose a username and password to secure your account.
          </Text>
        </View>

        {/* Profile Image Setup */}
        <View style={styles.profileImageSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Icon name="person" size={48} color={colors.primary} />
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Icon name="camera" size={18} color={colors.onPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          {/* Username */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputContainer}>
              <Icon 
                name="at" 
                size={20} 
                color={colors.outline} 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="e.g. johnkato"
                placeholderTextColor={colors.outlineVariant}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Icon 
                name="lock" 
                size={20} 
                color={colors.outline} 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={colors.outlineVariant}
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
            <View style={styles.helperTextContainer}>
              <Icon 
                name="info" 
                size={14} 
                color={isPasswordValid ? colors.tertiary : colors.outline} 
              />
              <Text style={[
                styles.helperText,
                isPasswordValid && styles.helperTextValid
              ]}>
                Minimum 8 characters
              </Text>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputContainer}>
              <Icon 
                name="shield" 
                size={20} 
                color={colors.outline} 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={colors.outlineVariant}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
            {confirmPassword && password !== confirmPassword && (
              <View style={styles.helperTextContainer}>
                <Icon name="alert" size={14} color={colors.error} />
                <Text style={styles.errorText}>Passwords don't match</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom CTA */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.continueButton, !isFormValid && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!isFormValid}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <Icon name="arrow-right" size={20} color={colors.onPrimary} />
        </TouchableOpacity>
        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E0D8',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    fontFamily: 'System',
  },
  brandText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryContainer,
    fontFamily: 'System',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: colors.surfaceContainer,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primaryContainer,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  heroSection: {
    marginTop: 24,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.onBackground,
    marginBottom: 8,
    letterSpacing: -0.64,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
    lineHeight: 24,
    fontFamily: 'System',
  },
  profileImageSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    marginLeft: 4,
    letterSpacing: 0.12,
    fontFamily: 'System',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E2E0D8',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.onSurface,
    fontFamily: 'System',
  },
  visibilityButton: {
    padding: 4,
  },
  helperTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    marginLeft: 4,
  },
  helperText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    letterSpacing: 0.12,
    fontFamily: 'System',
  },
  helperTextValid: {
    color: colors.tertiary,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.error,
    letterSpacing: 0.12,
    fontFamily: 'System',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: `${colors.background}E6`,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
  },
  continueButton: {
    height: 56,
    backgroundColor: colors.primaryContainer,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  continueButtonDisabled: {
    backgroundColor: colors.surfaceContainerHigh,
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onPrimary,
    letterSpacing: 0.1,
    fontFamily: 'System',
  },
  termsText: {
    fontSize: 12,
    color: colors.outline,
    textAlign: 'center',
    fontFamily: 'System',
  },
  termsLink: {
    fontWeight: '700',
    color: colors.primaryContainer,
  },
});
