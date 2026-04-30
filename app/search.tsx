import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../constants/colors';
import { MOCK_LISTINGS, CATEGORIES } from '../constants/mockData';
import { filterListings } from '../utils/searchListings';

const RECENT_SEARCHES_KEY = '@recent_searches';
const MAX_RECENT_SEARCHES = 8;

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const router = useRouter();
  const params = useLocalSearchParams();

  // Load recent searches on mount
  useEffect(() => {
    loadRecentSearches();
  }, []);

  // Apply filters from params if they exist
  const filterOptions = useMemo(() => ({
    query: searchQuery,
    category: params.category as string,
    condition: params.condition as string,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
  }), [searchQuery, params]);

  // Real-time filtering
  const results = useMemo(() => {
    return filterListings(MOCK_LISTINGS, filterOptions);
  }, [filterOptions]);

  // Load recent searches from AsyncStorage
  const loadRecentSearches = async () => {
    try {
      const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load recent searches:', error);
    }
  };

  // Save search to recent searches
  const saveRecentSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;

    try {
      const trimmed = query.trim();
      const updated = [
        trimmed,
        ...recentSearches.filter(s => s !== trimmed)
      ].slice(0, MAX_RECENT_SEARCHES);
      
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      setRecentSearches(updated);
    } catch (error) {
      console.error('Failed to save recent search:', error);
    }
  }, [recentSearches]);

  // Handle search query change
  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
    if (text.trim()) {
      saveRecentSearch(text);
    }
  }, [saveRecentSearch]);

  // Handle recent search tap
  const handleRecentSearchTap = useCallback((search: string) => {
    setSearchQuery(search);
  }, []);

  // Handle category tap
  const handleCategoryTap = useCallback((categoryName: string) => {
    router.push({
      pathname: '/search',
      params: { category: categoryName }
    });
  }, [router]);

  // Handle listing press
  const handleListingPress = useCallback((id: number) => {
    router.push(`/listing/${id}`);
  }, [router]);

  // Show empty state
  const showEmptyState = searchQuery.trim() && results.length === 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search electronics..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={handleSearchChange}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </Pressable>
          )}
        </View>
        <Pressable onPress={() => router.push('/filters')} style={styles.filterButton}>
          <Ionicons name="options" size={20} color={colors.textPrimary} />
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {!searchQuery ? (
          <>
            {recentSearches.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Searches</Text>
                {recentSearches.map((search, index) => (
                  <Pressable 
                    key={index} 
                    style={styles.recentItem} 
                    onPress={() => handleRecentSearchTap(search)}
                  >
                    <View style={styles.recentIconContainer}>
                      <Ionicons name="time-outline" size={18} color={colors.textSecondary} />
                    </View>
                    <Text style={styles.recentText}>{search}</Text>
                    <Ionicons 
                      name="arrow-forward" 
                      size={18} 
                      color={colors.textSecondary} 
                      style={{ transform: [{ rotate: '-45deg' }] }} 
                    />
                  </Pressable>
                ))}
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Categories</Text>
              <View style={styles.categoryGrid}>
                {CATEGORIES.map((cat) => (
                  <Pressable 
                    key={cat.id} 
                    style={styles.categoryCard}
                    onPress={() => handleCategoryTap(cat.name)}
                  >
                    <Text style={styles.categoryIcon}>{cat.icon}</Text>
                    <Text style={styles.categoryName}>{cat.name}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </>
        ) : showEmptyState ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyTitle}>No listings found</Text>
            <Text style={styles.emptyText}>
              Try a different keyword or adjust your filters
            </Text>
          </View>
        ) : (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsCount}>
              {results.length} result{results.length !== 1 ? 's' : ''} for "{searchQuery}"
            </Text>
            <View style={styles.resultsGrid}>
              {results.map((item) => (
                <Pressable 
                  key={item.id} 
                  style={styles.resultCard}
                  onPress={() => handleListingPress(item.id)}
                >
                  <View style={styles.resultImageContainer}>
                    {item.imageUrl ? (
                      <Image
                        source={{ uri: `${item.imageUrl}?w=160&h=160&fit=crop` }}
                        placeholder={{ blurhash: item.blurhash }}
                        contentFit="cover"
                        style={styles.resultImage}
                        transition={200}
                      />
                    ) : (
                      <View style={styles.resultImagePlaceholder}>
                        <Text style={styles.resultImageIcon}>📷</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.resultCondition}>{item.condition}</Text>
                    <Text style={styles.resultPrice}>UGX {item.price.toLocaleString()}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
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
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#F0EDED',
    borderRadius: 24,
    paddingHorizontal: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1B1B',
  },
  filterButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1B1B',
    marginBottom: 16,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E0D8',
  },
  recentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0EDED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recentText: {
    flex: 1,
    fontSize: 16,
    color: '#1C1B1B',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#F0EDED',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1B1B',
  },
  resultsSection: {
    padding: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: '#6F7A74',
    marginBottom: 16,
  },
  resultsGrid: {
    gap: 16,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  resultImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
  },
  resultImage: {
    width: '100%',
    height: '100%',
  },
  resultImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F0EDED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultImageIcon: {
    fontSize: 32,
  },
  resultInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1B1B',
  },
  resultCondition: {
    fontSize: 12,
    color: '#6F7A74',
  },
  resultPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1B1B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6F7A74',
    textAlign: 'center',
    lineHeight: 20,
  },
});
