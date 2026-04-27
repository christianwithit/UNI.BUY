import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';

export default function SuccessPosted() {
  const navigation = useNavigation();

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
          onPress={() => navigation.navigate('HomeFeed' as never)}
        >
          <Text style={styles.primaryButtonText}>Back to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('MyProfile' as never)}
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
    backgroundColor: colors.background,
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
    backgroundColor: colors.tertiaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: colors.tertiary,
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
    color: colors.text.primary,
    marginBottom: 12,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    fontFamily: 'System',
  },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardImage: {
    width: 120,
    height: 120,
    backgroundColor: colors.surfaceContainer,
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
    color: colors.text.primary,
    marginBottom: 4,
    fontFamily: 'System',
  },
  cardCondition: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
    fontFamily: 'System',
  },
  cardPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: 'System',
  },
  tipsCard: {
    width: '100%',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 12,
    fontFamily: 'System',
  },
  tipText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 6,
    lineHeight: 20,
    fontFamily: 'System',
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
    color: colors.white,
    fontFamily: 'System',
  },
  secondaryButton: {
    width: '100%',
    height: 56,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: 'System',
  },
});
