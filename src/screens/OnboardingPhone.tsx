import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import Icon from '../components/Icon';

export default function OnboardingPhone() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const handleContinue = () => {
    if (phoneNumber.length >= 9) {
      navigation.navigate('OnboardingOTP' as never);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with progress */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="back" size={24} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.progressText}>1 of 3</Text>
        <View style={styles.spacer} />
      </View>

      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: '33%' }]} />
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.title}>What's your number?</Text>
        <Text style={styles.subtitle}>
          We'll text you a code to verify your account. Standard message rates apply.
        </Text>

        {/* Phone input */}
        <View style={styles.phoneInputContainer}>
          <TouchableOpacity style={styles.countrySelector}>
            <Text style={styles.flag}>🇺🇬</Text>
            <Text style={styles.countryCode}>+256</Text>
            <Icon name="chevron-down" size={14} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TextInput
            style={styles.input}
            placeholder="700 000 000"
            placeholderTextColor={colors.outline}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={11}
            autoFocus
          />
        </View>
      </View>

      {/* Bottom button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, phoneNumber.length < 9 && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={phoneNumber.length < 9}
        >
          <Text style={styles.buttonText}>Send code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  backIcon: {
    fontSize: 24,
    color: colors.onSurface,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.outline,
    letterSpacing: 1,
  },
  spacer: {
    width: 40,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: colors.surfaceContainerHigh,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginBottom: 32,
    lineHeight: 20,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerLowest,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 12,
  },
  flag: {
    fontSize: 20,
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.onSurface,
    marginRight: 4,
  },
  dropdownIcon: {
    fontSize: 10,
    color: colors.outline,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: colors.outlineVariant,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.onSurface,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceContainerHigh,
    backgroundColor: colors.surfaceContainerLowest,
  },
  button: {
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonDisabled: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onPrimary,
    letterSpacing: 0.1,
  },
});
