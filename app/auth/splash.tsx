import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { colors } from '../../constants/colors';

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.topSection}>
          <View style={styles.brandContainer}>
            <Text style={styles.wordmark}>
              UNI<Text style={styles.dot}>.</Text>BUY
            </Text>
            <Text style={styles.tagline}>
              Buy and sell electronics with students near you.
            </Text>
          </View>
        </View>

        <View style={styles.bottomPanel}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/auth/phone?mode=signup')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Get started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/auth/phone?mode=login')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  brandContainer: {
    alignItems: 'center',
    gap: 32,
  },
  wordmark: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.white,
  },
  dot: {
    color: colors.amber,
    fontSize: 48,
  },
  tagline: {
    fontSize: 15,
    color: colors.white,
    textAlign: 'center',
    maxWidth: 260,
    lineHeight: 22,
  },
  bottomPanel: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 32,
    paddingTop: 28,
    paddingBottom: 48,
    gap: 12,
  },
  primaryButton: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    height: 56,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
