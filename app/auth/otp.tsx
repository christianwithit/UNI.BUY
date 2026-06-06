import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { OtpInput } from '../../components/auth/OtpInput';
import { ProgressBar } from '../../components/shared/ProgressBar';
import { supabase } from '../../lib/supabase';
import { formatPhoneForDisplay } from '../../utils/phone';

export default function OtpScreen() {
  const router = useRouter();
  const { phone, mode } = useLocalSearchParams<{ phone: string; mode: string }>();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const [verifying, setVerifying] = useState(false);

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

  // Auto-verify when OTP is complete
  useEffect(() => {
    if (otp.length === 6 && !verifying) {
      handleVerify();
    }
  }, [otp]);

  const handleVerify = async () => {
    if (otp.length < 6 || verifying) return;

    setVerifying(true);
    setError(false);

    try {
      // Verify OTP with Supabase
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        phone: phone,
        token: otp,
        type: 'sms',
      });

      if (verifyError) {
        setError(true);
        setVerifying(false);
        Alert.alert('Invalid Code', 'The code you entered is incorrect. Please try again.');
        return;
      }

      if (!data.user) {
        setError(true);
        setVerifying(false);
        Alert.alert('Error', 'Verification failed. Please try again.');
        return;
      }

      // Check if profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        // PGRST116 = not found, which is expected for new users
        console.error('Profile check error:', profileError);
      }

      // If no profile exists, go to setup
      if (!profile) {
        router.replace(`/auth/setup?phone=${encodeURIComponent(phone)}`);
      } else {
        // Profile exists, go to main app
        router.replace('/(tabs)/');
      }
    } catch (error) {
      setError(true);
      setVerifying(false);
      Alert.alert('Error', 'Verification failed. Please try again.');
      console.error('Verify OTP error:', error);
    }
  };

  const handleResend = async () => {
    setTimer(59);
    setCanResend(false);
    setOtp('');
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone,
      });

      if (error) {
        Alert.alert('Error', 'Failed to resend code. Please try again.');
      } else {
        Alert.alert('Success', 'A new code has been sent to your phone.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to resend code. Please try again.');
      console.error('Resend OTP error:', error);
    }
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
