import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('mtn');
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handlePayment = () => {
    router.push('/success-paid');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1C1B1B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.orderItem}>
            <View style={styles.itemImage}>
              <Text style={styles.itemImagePlaceholder}>📷</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>iPhone 13 Pro</Text>
              <Text style={styles.itemSeller}>Sold by John Doe</Text>
            </View>
            <Text style={styles.itemPrice}>UGX 2,450,000</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <Text style={styles.sectionSubtitle}>Mobile Money</Text>
          
          <TouchableOpacity 
            style={[styles.paymentOption, paymentMethod === 'mtn' && styles.paymentOptionActive]}
            onPress={() => setPaymentMethod('mtn')}
          >
            <View style={styles.paymentIconContainer}>
              <Ionicons name="phone-portrait" size={20} color={colors.primary} />
            </View>
            <Text style={styles.paymentText}>MTN Mobile Money</Text>
            <View style={[styles.radio, paymentMethod === 'mtn' && styles.radioActive]}>
              {paymentMethod === 'mtn' && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.paymentOption, paymentMethod === 'airtel' && styles.paymentOptionActive]}
            onPress={() => setPaymentMethod('airtel')}
          >
            <View style={styles.paymentIconContainer}>
              <Ionicons name="phone-portrait" size={20} color={colors.primary} />
            </View>
            <Text style={styles.paymentText}>Airtel Money</Text>
            <View style={[styles.radio, paymentMethod === 'airtel' && styles.radioActive]}>
              {paymentMethod === 'airtel' && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.paymentOption, paymentMethod === 'cash' && styles.paymentOptionActive]}
            onPress={() => setPaymentMethod('cash')}
          >
            <View style={styles.paymentIconContainer}>
              <Ionicons name="cash" size={20} color={colors.primary} />
            </View>
            <Text style={styles.paymentText}>Cash on Pickup</Text>
            <View style={[styles.radio, paymentMethod === 'cash' && styles.radioActive]}>
              {paymentMethod === 'cash' && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>
        </View>

        {(paymentMethod === 'mtn' || paymentMethod === 'airtel') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Phone Number</Text>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+256</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="7XX XXX XXX"
                placeholderTextColor="#6F7A74"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                maxLength={9}
              />
            </View>
            <Text style={styles.helperText}>Enter your {paymentMethod === 'mtn' ? 'MTN' : 'Airtel'} Mobile Money number</Text>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>UGX 2,450,000</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service Fee (1%)</Text>
            <Text style={styles.summaryValue}>UGX 24,500</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>UGX 2,474,500</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Complete Payment</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1B1B',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1B1B',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6F7A74',
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 64,
    height: 64,
    backgroundColor: '#F0EDED',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemImagePlaceholder: {
    fontSize: 28,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1B1B',
    marginBottom: 4,
  },
  itemSeller: {
    fontSize: 14,
    color: '#6F7A74',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#E2E0D8',
    borderRadius: 16,
    marginBottom: 12,
  },
  paymentOptionActive: {
    borderColor: colors.primary,
    backgroundColor: '#F0EDED',
  },
  paymentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0EDED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1B1B',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#BEC9C3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  countryCode: {
    width: 80,
    height: 56,
    backgroundColor: '#F0EDED',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1B1B',
  },
  phoneInput: {
    flex: 1,
    height: 56,
    backgroundColor: '#F0EDED',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1C1B1B',
  },
  helperText: {
    fontSize: 12,
    color: '#6F7A74',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#6F7A74',
  },
  summaryValue: {
    fontSize: 16,
    color: '#1C1B1B',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E2E0D8',
    marginTop: 8,
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1B1B',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  payButton: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
