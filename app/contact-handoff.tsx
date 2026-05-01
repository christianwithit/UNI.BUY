import React, { useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { MOCK_CONVERSATIONS, MOCK_LISTINGS } from '../constants/mockData';

export default function ContactHandoff() {
  const router = useRouter();
  const { listingId } = useLocalSearchParams<{ listingId?: string }>();

  // Find or create conversation for this listing
  const handleMessageSeller = useCallback(() => {
    // Find existing conversation for this listing
    const existingConversation = MOCK_CONVERSATIONS.find(
      conv => conv.listing.id === Number(listingId)
    );

    if (existingConversation) {
      // Navigate to existing conversation
      router.push(`/chat/${existingConversation.id}`);
    } else {
      // In a real app, create a new conversation
      // For now, navigate to the first conversation as a demo
      router.push(`/chat/1`);
    }
  }, [listingId, router]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1C1B1B" />
        </Pressable>
        <Text style={styles.headerTitle}>Contact Seller</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.sellerCard}>
          <View style={styles.sellerAvatar}>
            <Text style={styles.sellerAvatarText}>JD</Text>
          </View>
          <Text style={styles.sellerName}>John Doe</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
            <Text style={styles.ratingText}>4.8 (24 reviews)</Text>
          </View>
          <Text style={styles.sellerUniversity}>Makerere University</Text>
        </View>

        <View style={styles.safetyCard}>
          <View style={styles.safetyHeader}>
            <Ionicons name="alert-circle" size={24} color="#EF9F27" />
            <Text style={styles.safetyTitle}>Safety Tips</Text>
          </View>
          <Text style={styles.safetyTip}>• Meet in a public place on campus</Text>
          <Text style={styles.safetyTip}>• Inspect the item before paying</Text>
          <Text style={styles.safetyTip}>• Never share personal financial info</Text>
          <Text style={styles.safetyTip}>• Report suspicious activity</Text>
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Contact Seller</Text>

          <Pressable style={styles.contactOption} onPress={handleMessageSeller}>
            <View style={styles.contactIconContainer}>
              <Ionicons name="chatbubbles" size={24} color={colors.primary} />
            </View>
            <View style={styles.contactContent}>
              <Text style={styles.contactOptionTitle}>Message on UNI.BUY</Text>
              <Text style={styles.contactOptionDescription}>Chat directly in the app - safe and secure</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6F7A74" />
          </Pressable>
        </View>
      </ScrollView>
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
  sellerCard: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 24,
    marginBottom: 16,
  },
  sellerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  sellerAvatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sellerName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1B1B',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  ratingStars: {
    fontSize: 14,
  },
  ratingText: {
    fontSize: 14,
    color: '#6F7A74',
  },
  sellerUniversity: {
    fontSize: 14,
    color: '#6F7A74',
  },
  safetyCard: {
    backgroundColor: '#FFF4E5',
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  safetyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1B1B',
  },
  safetyTip: {
    fontSize: 14,
    color: '#1C1B1B',
    marginBottom: 8,
    lineHeight: 20,
  },
  contactSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1B1B',
    marginBottom: 16,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F0EDED',
    borderRadius: 16,
    marginBottom: 12,
  },
  whatsappOption: {
    backgroundColor: '#E8F5F1',
  },
  contactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  whatsappIconContainer: {
    backgroundColor: '#FFFFFF',
  },
  contactContent: {
    flex: 1,
  },
  contactOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1B1B',
    marginBottom: 2,
  },
  contactOptionDescription: {
    fontSize: 14,
    color: '#6F7A74',
  },
  arrow: {
    fontSize: 24,
    color: '#6F7A74',
  },
});
