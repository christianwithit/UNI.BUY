import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import Icon from '../components/Icon';
import { MOCK_LISTINGS, CATEGORIES } from '../utils/mockData';

export default function HomeFeed() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigation = useNavigation();

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
          <Icon name="menu" size={24} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Marketplace</Text>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.navigate('Search' as never)}
        >
          <Icon name="search" size={22} color={colors.onSurface} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Context Section */}
        <View style={styles.contextSection}>
          <View>
            <Text style={styles.contextLabel}>UNI.BUY CAMPUS</Text>
            <View style={styles.universityRow}>
              <Icon name="location" size={18} color={colors.primary} />
              <Text style={styles.universityName}>Makerere University</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => navigation.navigate('Filters' as never)}
          >
            <Icon name="filter" size={20} color={colors.onSurface} />
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
              onPress={() => navigation.navigate('ListingDetails' as never)}
              activeOpacity={0.7}
            >
              <View style={styles.cardImageContainer}>
                <View style={styles.cardImage}>
                  <Text style={styles.imagePlaceholder}>📷</Text>
                </View>
                <TouchableOpacity style={styles.favoriteButton}>
                  <Icon name="heart" size={20} color={colors.text.primary} />
                </TouchableOpacity>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardPrice}>UGX {item.price.toLocaleString()}</Text>
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={styles.cardFooter}>
                  <Icon name="clock" size={14} color={colors.text.light} />
                  <Text style={styles.timeText}>{item.timeAgo}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home-filled" size={24} color={colors.primary} />
          <Text style={styles.navLabelActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('PostListing' as never)}
        >
          <Icon name="sell" size={24} color={colors.text.light} />
          <Text style={styles.navLabel}>Sell</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Messages' as never)}
        >
          <Icon name="messages" size={24} color={colors.text.light} />
          <Text style={styles.navLabel}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('MyProfile' as never)}
        >
          <Icon name="profile" size={24} color={colors.text.light} />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 56,
    backgroundColor: colors.surfaceContainerLowest,
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
  menuIcon: {
    fontSize: 24,
    color: colors.primary,
  },
  searchIcon: {
    fontSize: 20,
    color: colors.primary,
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
    color: colors.onSurfaceVariant,
    marginBottom: 4,
    fontWeight: '500',
  },
  universityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  schoolIcon: {
    fontSize: 20,
    marginRight: 4,
  },
  universityName: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.onSurface,
    letterSpacing: -0.5,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    fontSize: 20,
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
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginRight: 8,
  },
  categoryPillActive: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primaryContainer,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurface,
    letterSpacing: 0.12,
  },
  categoryTextActive: {
    color: colors.onPrimaryContainer,
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
    backgroundColor: colors.surfaceContainerLowest,
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
    backgroundColor: colors.surfaceContainerLow,
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
  favoriteIcon: {
    fontSize: 18,
  },
  cardContent: {
    padding: 8,
  },
  cardPrice: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  cardTitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginBottom: 8,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  timeText: {
    fontSize: 12,
    color: colors.outline,
    letterSpacing: 0.12,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: '#E2E0D8',
    paddingBottom: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 8,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.6,
  },
  navIconActive: {
    fontSize: 24,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  navLabelActive: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
  },
});
