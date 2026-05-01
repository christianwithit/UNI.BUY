import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { colors } from '../../constants/colors';
import { MOCK_LISTINGS } from '../../constants/mockData';
import { filterListings } from '../../utils/searchListings';
import { useFavorites } from '../../contexts/FavoritesContext';
import { CategorySelector } from '../../components/shared/CategorySelector';

// Memoized list item component for better performance
const ListingCard = React.memo(({ item, onPress }: { item: any; onPress: (id: string) => void }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(item.id);

  const handlePress = useCallback(() => {
    onPress(item.id);
  }, [item.id, onPress]);

  const handleFavoritePress = useCallback((e: any) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  }, [item.id, toggleFavorite]);

  // Request appropriately-sized image (2x for retina screens)
  const thumbnailUrl = item.imageUrl 
    ? `${item.imageUrl}?w=400&h=400&fit=crop&auto=format`
    : null;

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.cardImageContainer}>
        {thumbnailUrl ? (
          <Image
            source={{ uri: thumbnailUrl }}
            placeholder={{ blurhash: item.blurhash || 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.' }}
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
          <Text style={styles.timeText}>{item.timeAgo}</Text>
        </View>
      </View>
    </Pressable>
  );
});

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();

  // Memoize filtered listings using the search utility
  const filteredListings = useMemo(() => {
    return filterListings(MOCK_LISTINGS, { 
      category: selectedCategory === 'All' ? undefined : selectedCategory 
    });
  }, [selectedCategory]);

  const handleListingPress = useCallback((id: string) => {
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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

        {/* Listings Grid */}
        <View style={styles.grid}>
          {filteredListings.map(item => (
            <ListingCard 
              key={item.id} 
              item={item} 
              onPress={handleListingPress} 
            />
          ))}
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
