import React, { useState, useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export default function ReviewsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'received' | 'given'>('received');

  // Mock reviews data
  const reviewsReceived = useMemo(() => [
    {
      id: 1,
      reviewer: 'Sarah M.',
      rating: 5,
      comment: 'Great seller! Item was exactly as described. Quick response and smooth transaction.',
      date: '2024-04-20',
      item: 'iPhone 13 Pro'
    },
    {
      id: 2,
      reviewer: 'Mike K.',
      rating: 5,
      comment: 'Excellent condition. Very professional seller. Highly recommended!',
      date: '2024-04-15',
      item: 'MacBook Pro M1'
    },
    {
      id: 3,
      reviewer: 'John D.',
      rating: 4,
      comment: 'Good product, fast delivery. Minor scratches but overall satisfied.',
      date: '2024-04-10',
      item: 'AirPods Pro'
    },
  ], []);

  const reviewsGiven = useMemo(() => [
    {
      id: 1,
      seller: 'John Doe',
      rating: 5,
      comment: 'Perfect transaction! Item was as described and seller was very responsive.',
      date: '2024-04-18',
      item: 'Dell Monitor'
    },
    {
      id: 2,
      seller: 'Emma W.',
      rating: 4,
      comment: 'Good seller, item arrived on time. Would buy again.',
      date: '2024-04-05',
      item: 'Wireless Mouse'
    },
  ], []);

  const activeReviews = activeTab === 'received' ? reviewsReceived : reviewsGiven;

  const averageRating = useMemo(() => {
    if (reviewsReceived.length === 0) return 0;
    const sum = reviewsReceived.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviewsReceived.length).toFixed(1);
  }, [reviewsReceived]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={16}
        color="#EF9F27"
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1C1B1B" />
        </Pressable>
        <Text style={styles.headerTitle}>Reviews</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Rating Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.ratingDisplay}>
          <Text style={styles.ratingNumber}>{averageRating}</Text>
          <View style={styles.starsContainer}>
            {renderStars(Math.round(Number(averageRating)))}
          </View>
          <Text style={styles.reviewCount}>
            {reviewsReceived.length} review{reviewsReceived.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <Pressable
          style={[styles.tab, activeTab === 'received' && styles.tabActive]}
          onPress={() => setActiveTab('received')}
        >
          <Text style={[styles.tabText, activeTab === 'received' && styles.tabTextActive]}>
            Received ({reviewsReceived.length})
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'given' && styles.tabActive]}
          onPress={() => setActiveTab('given')}
        >
          <Text style={[styles.tabText, activeTab === 'given' && styles.tabTextActive]}>
            Given ({reviewsGiven.length})
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {activeReviews.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="star-outline" size={64} color="#BEC9C3" />
            <Text style={styles.emptyTitle}>No Reviews Yet</Text>
            <Text style={styles.emptyText}>
              {activeTab === 'received'
                ? 'Reviews from buyers will appear here'
                : 'Reviews you give to sellers will appear here'}
            </Text>
          </View>
        ) : (
          <View style={styles.reviewsList}>
            {activeReviews.map(review => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewerAvatar}>
                    <Text style={styles.reviewerInitial}>
                      {(activeTab === 'received' ? review.reviewer : review.seller)[0]}
                    </Text>
                  </View>
                  <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>
                      {activeTab === 'received' ? review.reviewer : review.seller}
                    </Text>
                    <View style={styles.starsRow}>
                      {renderStars(review.rating)}
                      <Text style={styles.reviewDate}>
                        {new Date(review.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.reviewItem}>Item: {review.item}</Text>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        )}
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
  summaryCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingDisplay: {
    alignItems: 'center',
  },
  ratingNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: '#6F7A74',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F0EDED',
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6F7A74',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1B1B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6F7A74',
    textAlign: 'center',
    lineHeight: 24,
  },
  reviewsList: {
    padding: 16,
    gap: 16,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  reviewerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  reviewerInitial: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1B1B',
    marginBottom: 4,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#6F7A74',
  },
  reviewItem: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6F7A74',
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 14,
    color: '#3F4944',
    lineHeight: 20,
  },
});
