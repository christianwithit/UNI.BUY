import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constants/colors';
import { PhoneInput } from '../../../components/auth/PhoneInput';
import { ProgressBar } from '../../../components/shared/ProgressBar';

export default function PhoneScreen({ navigation, route }: any) {
  const { mode } = route.params || { mode: 'signup' };
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const isSignup = mode === 'signup';
  const isValid = phone.replace(/\s/g, '').length >= 9;

  const handleSendCode = async () => {
    if (!isValid) return;

    setLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Otp', { phone, mode });
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
            {isSignup && <Text style={styles.stepIndicator}>1 of 3</Text>}
          </View>

          {isSignup && (
            <ProgressBar steps={3} current={1} style={styles.progressBar} />
          )}

          <View style={styles.mainContent}>
            <Text style={styles.headline}>
              {isSignup ? "What's your number?" : 'Welcome back'}
            </Text>
            <Text style={styles.subtext}>
              {isSignup
                ? "We'll send a one-time code to verify it's you."
                : 'Enter your number to get back in.'}
            </Text>

            <PhoneInput value={phone} onChange={setPhone} />

            <Text style={styles.helperText}>
              We'll never share your number or use it for spam.
            </Text>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              isValid && !loading && styles.buttonActive,
            ]}
            onPress={handleSendCode}
            disabled={!isValid || loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.buttonText}>Send code →</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
  },
  stepIndicator: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  progressBar: {
    marginTop: 16,
  },
  mainContent: {
    marginTop: 32,
    gap: 32,
  },
  headline: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  subtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: -24,
  },
  helperText: {
    fontSize: 12,
    color: colors.textTertiary,
    marginTop: -24,
  },
  bottomContainer: {
    paddingHorizontal: 32,
    paddingBottom: 16,
  },
  button: {
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.textTertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
