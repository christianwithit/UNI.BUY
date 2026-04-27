import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '../constants/colors';

export default function SuccessPosted() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>✅</Text>
        </View>
        
        <Text style={styles.title}>Listing Posted!</Text>
        <Text style={styles.subtitle}>
          Your item is now live on UNI.BUY. You'll be notified when someone shows interest.
        </Text>

        <View style={styles.card}>
          <View style={styles.cardImage}>
            <Text style={styles.cardImagePlaceholder}>📷</Text>
          </View>
          <Text style={styles.cardTitle}>iPhone 13 Pro</Text>
          <Text style={styles.cardCondition}>Like New</Text>
          <Text style={styles.cardPrice}>UGX 2,450,000</Text>
        </View>

        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Quick Tips</Text>
          <Text style={styles.tipText}>• Respond quickly to buyer messages</Text>
          <Text style={styles.tipText}>• Meet in safe, public locations</Text>
          <Text style={styles.tipText}>• Keep your listing updated</Text>
        </View>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={styles.primaryButtonText}>Back to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.push('/(tabs)/profile')}
        >
          <Text style={styles.secondaryButtonText}>View My Listings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF9F8',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E8F5F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  icon: {
    fontSize: 64,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1C1B1B',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6F7A74',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardImage: {
    width: 120,
    height: 120,
    backgroundColor: '#F0EDED',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardImagePlaceholder: {
    fontSize: 48,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1B1B',
    marginBottom: 4,
  },
  cardCondition: {
    fontSize: 14,
    color: '#6F7A74',
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  tipsCard: {
    width: '100%',
    backgroundColor: '#F0EDED',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1B1B',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#6F7A74',
    marginBottom: 6,
    lineHeight: 20,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryButton: {
    width: '100%',
    height: 56,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
});
