import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { OtpInput } from '../../components/auth/OtpInput';
import { ProgressBar } from '../../components/shared/ProgressBar';

const CORRECT_OTP = '123456';

export default function OtpScreen() {
  const router = useRouter();
  const { phone, mode } = useLocalSearchParams<{ phone: string; mode: string }>();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);

  const isSignup = mode === 'signup';

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerify = () => {
    if (otp === CORRECT_OTP) {
      // For signup, go to profile creation
      // For login, go directly to the app
      if (isSignup) {
        router.push('/auth/profile');
      } else {
        router.replace('/(tabs)/');
      }
    } else {
      setError(true);
      setTimeout(() => setError(false), 300);
    }
  };

  const handleResend = () => {
    setTimer(59);
    setCanResend(false);
    // Show toast or feedback
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
            {isSignup && <Text style={styles.stepIndicator}>2 of 3</Text>}
          </View>

          {isSignup && (
            <ProgressBar steps={3} current={2} style={styles.progressBar} />
          )}

          <View style={styles.mainContent}>
            <Text style={styles.headline}>Enter your code</Text>
            <Text style={styles.subtext}>
              We sent a 6-digit code to{' '}
              <Text style={styles.phoneNumber}>+256 {phone}</Text>
            </Text>

            <View style={styles.otpContainer}>
              <OtpInput value={otp} onChange={setOtp} error={error} />
              {error && (
                <Text style={styles.errorText}>Incorrect code. Try again.</Text>
              )}
            </View>

            <View style={styles.resendContainer}>
              {canResend ? (
                <TouchableOpacity onPress={handleResend}>
                  <Text style={styles.resendActive}>Resend code</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.resendInactive}>
                  Resend code in {formatTime(timer)}
                </Text>
              )}
            </View>

            <Text style={styles.helperText}>
              Didn't get a code? Check that your number is correct.
            </Text>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              otp.length === 6 && styles.buttonActive,
            ]}
            onPress={handleVerify}
            disabled={otp.length < 6}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Verify →</Text>
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
  phoneNumber: {
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  otpContainer: {
    alignItems: 'center',
    gap: 12,
  },
  errorText: {
    fontSize: 13,
    color: colors.danger,
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: -16,
  },
  resendActive: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  resendInactive: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  helperText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
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
