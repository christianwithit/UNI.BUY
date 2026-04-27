import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { MOCK_LISTINGS, CATEGORIES } from '../../constants/mockData';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();

  // Filter listings based on selected category
  const filteredListings = selectedCategory === 'All' 
    ? MOCK_LISTINGS 
    : MOCK_LISTINGS.filter(listing => listing.category.toLowerCase() === selectedCategory.toLowerCase());

  const categoryList = ['All', ...CATEGORIES.map(cat => cat.name)];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="menu" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Marketplace</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/search')}>
          <Ionicons name="search" size={22} color={colors.primary} />
        </TouchableOpacity>
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
          <TouchableOpacity style={styles.filterButton} onPress={() => router.push('/filters')}>
            <Ionicons name="options" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Category Pills */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categoryList.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryPill,
                selectedCategory === cat && styles.categoryPillActive
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextActive
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Listings Grid */}
        <View style={styles.grid}>
          {filteredListings.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => router.push(`/listing/${item.id}`)}
            >
              <View style={styles.cardImageContainer}>
                <View style={styles.cardImage}>
                  <Text style={styles.imagePlaceholder}>📷</Text>
                </View>
                <TouchableOpacity style={styles.favoriteButton}>
                  <Ionicons name="heart-outline" size={20} color={colors.textPrimary} />
                </TouchableOpacity>
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
            </TouchableOpacity>
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
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoriesContent: {
    paddingBottom: 4,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BEC9C3',
    marginRight: 8,
  },
  categoryPillActive: {
    backgroundColor: '#0F6E56',
    borderColor: '#0F6E56',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1C1B1B',
    letterSpacing: 0.12,
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
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
  cardImageContainer: {
    position: 'relative',
  },
  cardImage: {
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
