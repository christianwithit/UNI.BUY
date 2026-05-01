import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { colors } from '../../constants/colors';
import { MOCK_LISTINGS } from '../../constants/mockData';

export default function SellerProfile() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Mock seller data (in real app, fetch from API)
  const seller = useMemo(() => ({
    id: id as string,
    name: 'John Doe',
    university: 'Makerere University',
    joinedDate: 'January 2024',
    rating: 4.8,
    reviewCount: 24,
    responseTime: '< 1 hour',
    verifiedStudent: true,
  }), [id]);

  // Get seller's listings
  const sellerListings = useMemo(() => 
    MOCK_LISTINGS.filter(item => item.seller === seller.name).slice(0, 10),
    [seller.name]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1C1B1B" />
        </Pressable>
        <Text style={styles.headerTitle}>Seller Profile</Text>
        <Pressable>
          <Ionicons name="ellipsis-horizontal" size={24} color="#1C1B1B" />
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {seller.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          
          <Text style={styles.name}>{seller.name}</Text>
          
          {seller.verifiedStudent && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
              <Text style={styles.verifiedText}>Verified Student</Text>
            </View>
          )}
          
          <Text style={styles.university}>{seller.university}</Text>
          <Text style={styles.joinedDate}>Member since {seller.joinedDate}</Text>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{seller.rating}⭐</Text>
              <Text style={styles.statLabel}>{seller.reviewCount} reviews</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{seller.responseTime}</Text>
              <Text style={styles.statLabel}>Response time</Text>
            </View>
          </View>

          <Pressable 
            style={styles.messageButton}
            onPress={() => router.push(`/contact-handoff?listingId=${sellerListings[0]?.id}`)}
          >
            <Ionicons name="chatbubble-outline" size={20} color="#FFFFFF" />
            <Text style={styles.messageButtonText}>Message Seller</Text>
          </Pressable>
        </View>

        {/* Active Listings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Active Listings ({sellerListings.length})
          </Text>
          
          {sellerListings.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No active listings</Text>
            </View>
          ) : (
            <View style={styles.listingsGrid}>
              {sellerListings.map(item => (
                <Pressable 
                  key={item.id}
                  style={styles.listingCard}
                  onPress={() => router.push(`/listing/${item.id}`)}
                >
                  <Image
                    source={{ uri: `${item.imageUrl}?w=200&h=200&fit=crop` }}
                    placeholder={{ blurhash: item.blurhash }}
                    contentFit="cover"
                    style={styles.listingImage}
                    cachePolicy="memory-disk"
                    recyclingKey={String(item.id)}
                  />
                  <View style={styles.listingInfo}>
                    <Text style={styles.listingPrice}>
                      UGX {item.price.toLocaleString()}
                    </Text>
                    <Text style={styles.listingTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Reviews Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewerAvatar}>
                <Text style={styles.reviewerInitial}>S</Text>
              </View>
              <View style={styles.reviewerInfo}>
                <Text style={styles.reviewerName}>Sarah M.</Text>
                <View style={styles.ratingRow}>
                  <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
                  <Text style={styles.reviewDate}>2 weeks ago</Text>
                </View>
              </View>
            </View>
            <Text style={styles.reviewText}>
              Great seller! Item was exactly as described. Quick response and smooth transaction.
            </Text>
          </View>
        </View>

        {/* Report Button */}
        <Pressable style={styles.reportButton}>
          <Ionicons name="flag-outline" size={18} color="#EF4444" />
          <Text style={styles.reportText}>Report User</Text>
        </Pressable>
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
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 24,
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1B1B',
    marginBottom: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F5F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 8,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  university: {
    fontSize: 14,
    color: '#6F7A74',
    marginBottom: 4,
  },
  joinedDate: {
    fontSize: 12,
    color: '#BEC9C3',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6F7A74',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E2E0D8',
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 24,
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
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
  listingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  listingCard: {
    width: '48%',
    backgroundColor: '#F0EDED',
    borderRadius: 12,
    overflow: 'hidden',
  },
  listingImage: {
    width: '100%',
    aspectRatio: 1,
  },
  listingInfo: {
    padding: 8,
  },
  listingPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  listingTitle: {
    fontSize: 14,
    color: '#3F4944',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6F7A74',
  },
  reviewCard: {
    backgroundColor: '#F0EDED',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#BEC9C3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  reviewerInitial: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1B1B',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingStars: {
    fontSize: 12,
  },
  reviewDate: {
    fontSize: 12,
    color: '#6F7A74',
  },
  reviewText: {
    fontSize: 14,
    color: '#3F4944',
    lineHeight: 20,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    marginBottom: 32,
  },
  reportText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
});
