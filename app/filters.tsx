import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '../constants/colors';

export default function Filters() {
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const router = useRouter();

  const categories = ['Phones', 'Laptops', 'TVs', 'Tablets', 'Headphones', 'Accessories', 'Cameras', 'Gaming'];
  const conditions = ['New', 'Like New', 'Good', 'Fair'];

  const toggleCategory = useCallback((cat: string) => {
    setSelectedCategory(prev => prev === cat ? '' : cat);
  }, []);

  const toggleCondition = useCallback((cond: string) => {
    setSelectedCondition(prev => prev === cond ? '' : cond);
  }, []);

  const handleReset = useCallback(() => {
    setPriceRange([0, 5000000]);
    setSelectedCategory('');
    setSelectedCondition('');
  }, []);

  const handleApply = useCallback(() => {
    // Build filter params
    const params: any = {};
    
    if (selectedCategory) {
      params.category = selectedCategory;
    }
    
    if (selectedCondition) {
      params.condition = selectedCondition;
    }
    
    if (priceRange[0] > 0) {
      params.minPrice = priceRange[0].toString();
    }
    
    if (priceRange[1] < 5000000) {
      params.maxPrice = priceRange[1].toString();
    }

    // Navigate back to search with params
    router.push({
      pathname: '/search',
      params
    });
  }, [selectedCategory, selectedCondition, priceRange, router]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.headerButton}>Cancel</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Filters</Text>
        <Pressable onPress={handleReset}>
          <Text style={styles.headerButton}>Reset</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Range</Text>
          <View style={styles.priceRange}>
            <View style={styles.priceInput}>
              <Text style={styles.priceLabel}>Min</Text>
              <Text style={styles.priceValue}>UGX {priceRange[0].toLocaleString()}</Text>
            </View>
            <Text style={styles.priceSeparator}>-</Text>
            <View style={styles.priceInput}>
              <Text style={styles.priceLabel}>Max</Text>
              <Text style={styles.priceValue}>UGX {priceRange[1].toLocaleString()}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.chipContainer}>
            {categories.map(cat => (
              <Pressable
                key={cat}
                style={[styles.chip, selectedCategory === cat && styles.chipActive]}
                onPress={() => toggleCategory(cat)}
              >
                <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>
                  {cat}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Condition</Text>
          <View style={styles.chipContainer}>
            {conditions.map(cond => (
              <Pressable
                key={cond}
                style={[styles.chip, selectedCondition === cond && styles.chipActive]}
                onPress={() => toggleCondition(cond)}
              >
                <Text style={[styles.chipText, selectedCondition === cond && styles.chipTextActive]}>
                  {cond}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Pressable style={styles.locationOption}>
            <Text style={styles.locationText}>Within Campus</Text>
            <View style={styles.checkbox} />
          </Pressable>
          <Pressable style={styles.locationOption}>
            <Text style={styles.locationText}>Nearby (5 miles)</Text>
            <View style={styles.checkbox} />
          </Pressable>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable 
          style={styles.applyButton}
          onPress={handleApply}
        >
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </Pressable>
      </View>
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
  headerButton: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1B1B',
  },
  content: {
    flex: 1,
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
  priceRange: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceInput: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0EDED',
    borderRadius: 16,
  },
  priceLabel: {
    fontSize: 12,
    color: '#6F7A74',
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1B1B',
  },
  priceSeparator: {
    fontSize: 20,
    color: '#6F7A74',
    marginHorizontal: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BEC9C3',
    backgroundColor: '#FFFFFF',
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1B1B',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  locationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E0D8',
  },
  locationText: {
    fontSize: 16,
    color: '#1C1B1B',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#BEC9C3',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  applyButton: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
