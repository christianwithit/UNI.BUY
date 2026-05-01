import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { CategorySelector } from '../components/shared/CategorySelector';

export default function Filters() {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [withinCampus, setWithinCampus] = useState(false);
  const [nearbyAreas, setNearbyAreas] = useState(false);
  const router = useRouter();

  const conditions = ['New', 'Like New', 'Good', 'Fair'];

  const handleCategorySelect = useCallback((cat: string) => {
    setSelectedCategory(cat);
  }, []);

  const toggleCondition = useCallback((cond: string) => {
    setSelectedCondition(prev => prev === cond ? '' : cond);
  }, []);

  const handleReset = useCallback(() => {
    setMinPrice('');
    setMaxPrice('');
    setSelectedCategory('');
    setSelectedCondition('');
    setWithinCampus(false);
    setNearbyAreas(false);
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
    
    if (minPrice) {
      params.minPrice = minPrice;
    }
    
    if (maxPrice) {
      params.maxPrice = maxPrice;
    }

    if (withinCampus) {
      params.location = 'campus';
    } else if (nearbyAreas) {
      params.location = 'nearby';
    }

    // Navigate back to search with params
    router.push({
      pathname: '/search',
      params
    });
  }, [selectedCategory, selectedCondition, minPrice, maxPrice, withinCampus, nearbyAreas, router]);

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
          <View style={styles.priceInputsContainer}>
            <View style={styles.priceInputWrapper}>
              <Text style={styles.priceLabel}>Min Price</Text>
              <View style={styles.priceInputBox}>
                <Text style={styles.currency}>UGX</Text>
                <TextInput
                  style={styles.priceInput}
                  placeholder="0"
                  placeholderTextColor="#BEC9C3"
                  keyboardType="numeric"
                  value={minPrice}
                  onChangeText={setMinPrice}
                />
              </View>
            </View>
            <View style={styles.priceInputWrapper}>
              <Text style={styles.priceLabel}>Max Price</Text>
              <View style={styles.priceInputBox}>
                <Text style={styles.currency}>UGX</Text>
                <TextInput
                  style={styles.priceInput}
                  placeholder="5,000,000"
                  placeholderTextColor="#BEC9C3"
                  keyboardType="numeric"
                  value={maxPrice}
                  onChangeText={setMaxPrice}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <CategorySelector
            selected={selectedCategory}
            onSelect={handleCategorySelect}
            variant="chips"
            includeAll={false}
          />
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
          <Pressable 
            style={styles.locationOption}
            onPress={() => {
              setWithinCampus(!withinCampus);
              if (!withinCampus) setNearbyAreas(false);
            }}
          >
            <Text style={styles.locationText}>Within Campus</Text>
            <View style={[styles.checkbox, withinCampus && styles.checkboxActive]}>
              {withinCampus && <Ionicons name="checkmark" size={16} color={colors.primary} />}
            </View>
          </Pressable>
          <Pressable 
            style={styles.locationOption}
            onPress={() => {
              setNearbyAreas(!nearbyAreas);
              if (!nearbyAreas) setWithinCampus(false);
            }}
          >
            <Text style={styles.locationText}>Nearby (5 miles)</Text>
            <View style={[styles.checkbox, nearbyAreas && styles.checkboxActive]}>
              {nearbyAreas && <Ionicons name="checkmark" size={16} color={colors.primary} />}
            </View>
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
  priceInputsContainer: {
    gap: 12,
  },
  priceInputWrapper: {
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6F7A74',
    marginBottom: 8,
    letterSpacing: 1,
  },
  priceInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#F0EDED',
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E0D8',
  },
  currency: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6F7A74',
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1B1B',
    fontWeight: '600',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: '#E8F5F1',
    borderColor: colors.primary,
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
