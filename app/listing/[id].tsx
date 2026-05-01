import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { colors } from '../../constants/colors';
import { MOCK_LISTINGS } from '../../constants/mockData';
import { useFavorites } from '../../contexts/FavoritesContext';

export default function ListingDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const listing = MOCK_LISTINGS.find(item => item.id === id);
  const favorited = isFavorite(id as string);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this ${listing?.title} for UGX ${listing?.price.toLocaleString()} on UNI.BUY!\n\nCondition: ${listing?.condition}\nLocation: ${listing?.location}\n\nView listing: unibuy://listing/${id}`,
        title: listing?.title,
      });

      if (result.action === Share.sharedAction) {
        console.log('Listing shared');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share listing');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header - Absolute positioned over image */}
      <SafeAreaView style={styles.headerSafeArea} edges={['top']}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </Pressable>
          <View style={styles.headerActions}>
            <Pressable style={styles.headerButton} onPress={handleShare}>
              <Ionicons name="share-outline" size={22} color="#FFFFFF" />
            </Pressable>
            <Pressable 
              style={styles.headerButton}
              onPress={() => toggleFavorite(id as string)}
            >
              <Ionicons 
                name={favorited ? "heart" : "heart-outline"} 
                size={22} 
                color={favorited ? "#EF9F27" : "#FFFFFF"}
              />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageGallery}>
          <View style={styles.mainImage}>
            <Text style={styles.imagePlaceholder}>📷</Text>
          </View>
          <View style={styles.thumbnails}>
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={styles.thumbnail}>
                <Text style={styles.thumbnailPlaceholder}>📷</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Premium Ultra-Slim Laptop 14"</Text>
            <View style={styles.timeRow}>
              <Ionicons name="time-outline" size={14} color="#6F7A74" />
              <Text style={styles.timeText}>Posted 2 hours ago</Text>
            </View>
          </View>
          <Text style={styles.price}>UGX 3,200,000</Text>
          <View style={styles.conditionBadge}>
            <Text style={styles.conditionText}>Like New</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            MacBook Pro M1 2020 in excellent condition. Barely used, comes with original box and charger. 
            Perfect for students and professionals. Battery health at 95%.
          </Text>
        </View>

        {/* Seller Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seller</Text>
          <View style={styles.sellerCard}>
            <View style={styles.sellerAvatar}>
              <Text style={styles.sellerAvatarText}>JD</Text>
            </View>
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerName}>John Doe</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#EF9F27" />
                <Text style={styles.ratingText}>4.8 (24 reviews)</Text>
              </View>
            </View>
            <Pressable 
              style={styles.viewProfileButton}
              onPress={() => router.push(`/seller/john-doe`)}
            >
              <Ionicons name="chevron-forward" size={20} color={colors.primary} />
            </Pressable>
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.locationCard}>
            <Ionicons name="location" size={20} color={colors.primary} />
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>Makerere University</Text>
              <Text style={styles.locationDistance}>Campus Center • 0.5 km away</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <Pressable 
          style={styles.contactButton}
          onPress={() => router.push(`/contact-handoff?listingId=${id}`)}
        >
          <Ionicons name="chatbubble-outline" size={20} color="#FFFFFF" />
          <Text style={styles.contactButtonText}>Contact Seller</Text>
        </Pressable>
        <Pressable 
          style={styles.buyButton}
          onPress={() => router.push('/checkout')}
        >
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </Pressable>
      </View>
    </View>
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
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  headerSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  imageGallery: {
    backgroundColor: '#E5E2E1',
  },
  mainImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#F0EDED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    fontSize: 64,
  },
  thumbnails: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    backgroundColor: '#F0EDED',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailPlaceholder: {
    fontSize: 24,
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 8,
  },
  titleRow: {
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1B1B',
    marginBottom: 8,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 12,
    color: '#6F7A74',
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 12,
  },
  conditionBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#3B6D11',
    borderRadius: 12,
  },
  conditionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1B1B',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#3F4944',
    lineHeight: 22,
  },
  sellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F0EDED',
    borderRadius: 16,
  },
  sellerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sellerAvatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1B1B',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#3F4944',
  },
  viewProfileButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F0EDED',
    borderRadius: 16,
    gap: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1B1B',
    marginBottom: 4,
  },
  locationDistance: {
    fontSize: 12,
    color: '#3F4944',
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  contactButton: {
    flex: 1,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 28,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  buyButton: {
    flex: 1,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 28,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
