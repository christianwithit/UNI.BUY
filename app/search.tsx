import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { MOCK_LISTINGS, CATEGORIES, RECENT_SEARCHES } from '../constants/mockData';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const mockResults = MOCK_LISTINGS.slice(0, 6);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search electronics..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>
        <TouchableOpacity onPress={() => router.push('/filters')} style={styles.filterButton}>
          <Ionicons name="options" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {!searchQuery ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              {RECENT_SEARCHES.map((search, index) => (
                <TouchableOpacity key={index} style={styles.recentItem} onPress={() => setSearchQuery(search)}>
                  <View style={styles.recentIconContainer}>
                    <Ionicons name="time-outline" size={18} color={colors.textSecondary} />
                  </View>
                  <Text style={styles.recentText}>{search}</Text>
                  <Ionicons name="arrow-forward" size={18} color={colors.textSecondary} style={{ transform: [{ rotate: '-45deg' }] }} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Categories</Text>
              <View style={styles.categoryGrid}>
                {CATEGORIES.map((cat, index) => (
                  <TouchableOpacity key={index} style={styles.categoryCard}>
                    <Text style={styles.categoryIcon}>{cat.icon}</Text>
                    <Text style={styles.categoryName}>{cat.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsCount}>{mockResults.length} results found</Text>
            <View style={styles.resultsGrid}>
              {mockResults.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.resultCard}
                  onPress={() => router.push(`/listing/${item.id}`)}
                >
                  <View style={styles.resultImage}>
                    <Text style={styles.resultImageIcon}>📷</Text>
                  </View>
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.resultCondition}>{item.condition}</Text>
                    <Text style={styles.resultPrice}>UGX {item.price.toLocaleString()}</Text>
                  </View>
                </TouchableOpacity>
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
  resultImage: {
    width: 80,
    height: 80,
    backgroundColor: '#F0EDED',
    borderRadius: 12,
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
});
