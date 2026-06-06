import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { colors } from '../../constants/colors';
import { useFavorites } from '../../contexts/FavoritesContext';
import { CategorySelector } from '../../components/shared/CategorySelector';
import { supabase } from '../../lib/supabase';
import { ListingWithDetails } from '../../types/database';

// Helper function to calculate time ago
function getTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  return `${Math.floor(weeks / 4)}mo ago`;
}

// Memoized list item component for better performance
const ListingCard = React.memo(({ item, onPress }: { item: ListingWithDetails; onPress: (id: number) => void }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(item.id);

  const handlePress = useCallback(() => {
    onPress(item.id);
  }, [item.id, onPress]);

  const handleFavoritePress = useCallback((e: any) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  }, [item.id, toggleFavorite]);

  // Get first image or use placeholder
  const imageUrl = item.images && item.images.length > 0 ? item.images[0] : null;

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.cardImageContainer}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            contentFit="cover"
            transition={200}
            style={styles.cardImage}
            cachePolicy="memory-disk"
            recyclingKey={String(item.id)}
            priority="normal"
          />
        ) : (
          <View style={styles.cardImagePlaceholder}>
            <Text style={styles.imagePlaceholder}>📷</Text>
          </View>
        )}
        
        <Pressable 
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
        >
          <Ionicons 
            name={favorited ? "heart" : "heart-outline"} 
            size={20} 
            color={favorited ? "#EF9F27" : colors.textPrimary}
          />
        </Pressable>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.cardPrice}>UGX {item.price.toLocaleString()}</Text>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.cardFooter}>
          <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.timeText}>{getTimeAgo(item.created_at)}</Text>
        </View>
      </View>
    </Pressable>
  );
});

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [listings, setListings] = useState<ListingWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  // Fetch listings from Supabase
  const fetchListings = useCallback(async () => {
    try {
      let query = supabase
        .from('listings')
        .select(`
          *,
          seller:profiles(*),
          category:categories(*)
        `)
        .eq('status', 'Active')
        .order('created_at', { ascending: false })
        .limit(50);

      // Filter by category if not "All"
      if (selectedCategory !== 'All') {
        query = query.eq('category.slug', selectedCategory.toLowerCase());
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching listings:', error);
        return;
      }

      setListings(data as ListingWithDetails[]);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedCategory]);

  // Load listings on mount and when category changes
  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchListings();
  }, [fetchListings]);

  const handleListingPress = useCallback((id: number) => {
    router.push(`/listing/${id}`);
  }, [router]);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <View style={styles.headerButton} />
        <Text style={styles.headerTitle}>Marketplace</Text>
        <Pressable style={styles.headerButton} onPress={() => router.push('/search')}>
          <Ionicons name="search" size={22} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Context Section */}
        <View style={styles.contextSection}>
          <View>
            <Text style={styles.contextLabel}>UNI.BUY CAMPUS</Text>
            <View style={styles.universityRow}>
              <Ionicons name="location" size={18} color={colors.primary} />
              <Text style={styles.universityName}>Makerere University</Text>
            </View>
          </View>
          <Pressable style={styles.filterButton} onPress={() => router.push('/filters')}>
            <Ionicons name="options" size={20} color={colors.textPrimary} />
          </Pressable>
        </View>

        {/* Category Pills */}
        <CategorySelector
          selected={selectedCategory}
          onSelect={handleCategorySelect}
          variant="pills"
          includeAll={true}
        />

        {/* Loading State */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading listings...</Text>
          </View>
        ) : listings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No listings found</Text>
            <Text style={styles.emptySubtext}>Try a different category</Text>
          </View>
        ) : (
          /* Listings Grid */
          <View style={styles.grid}>
            {listings.map(item => (
              <ListingCard 
                key={item.id} 
                item={item} 
                onPress={handleListingPress} 
              />
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
    height: 56,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E0D8',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textSecondary,
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  contextSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  contextLabel: {
    fontSize: 12,
    letterSpacing: 1,
    color: '#6F7A74',
    marginBottom: 4,
    fontWeight: '500',
  },
  universityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  universityName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1C1B1B',
    letterSpacing: -0.5,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0EDED',
    borderWidth: 1,
    borderColor: '#BEC9C3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: '1%',
    borderWidth: 1,
    borderColor: '#E2E0D8',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  cardImageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardImagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F0EDED',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    fontSize: 48,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    padding: 8,
  },
  cardPrice: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1B1B',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  cardTitle: {
    fontSize: 14,
    color: '#3F4944',
    marginBottom: 8,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#6F7A74',
    letterSpacing: 0.12,
  },
});
