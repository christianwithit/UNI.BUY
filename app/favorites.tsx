import React, { useMemo, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { colors } from '../constants/colors';
import { MOCK_LISTINGS } from '../constants/mockData';
import { useFavorites } from '../contexts/FavoritesContext';

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const router = useRouter();

  const favoriteListings = useMemo(() => 
    MOCK_LISTINGS.filter(item => favorites.has(item.id)),
    [favorites]
  );

  const handleListingPress = useCallback((id: string) => {
    router.push(`/listing/${id}`);
  }, [router]);

  if (favoriteListings.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1C1B1B" />
          </Pressable>
          <Text style={styles.headerTitle}>Favorites</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.emptyState}>
          <Ionicons name="heart-outline" size={64} color="#BEC9C3" />
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyText}>
            Tap the heart icon on listings to save them here
          </Text>
          <Pressable 
            style={styles.browseButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.browseButtonText}>Browse Listings</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1C1B1B" />
        </Pressable>
        <Text style={styles.headerTitle}>Favorites ({favoriteListings.length})</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.grid}>
          {favoriteListings.map(item => (
            <Pressable 
              key={item.id}
              style={styles.card}
              onPress={() => handleListingPress(item.id)}
            >
              <Image
                source={{ uri: `${item.imageUrl}?w=400&h=400&fit=crop` }}
                placeholder={{ blurhash: item.blurhash }}
                contentFit="cover"
                style={styles.cardImage}
                cachePolicy="memory-disk"
                recyclingKey={String(item.id)}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardPrice}>UGX {item.price.toLocaleString()}</Text>
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={styles.cardFooter}>
                  <Ionicons name="time-outline" size={14} color="#6F7A74" />
                  <Text style={styles.timeText}>{item.timeAgo}</Text>
                </View>
              </View>
            </Pressable>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
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
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
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
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
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
    marginBottom: 24,
  },
  browseButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    backgroundColor: colors.primary,
    borderRadius: 24,
  },
  browseButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
