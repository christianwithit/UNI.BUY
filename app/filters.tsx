import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '../constants/colors';

export default function Filters() {
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const router = useRouter();

  const categories = ['Phones', 'Laptops', 'TVs', 'Tablets', 'Headphones', 'Accessories'];
  const conditions = ['New', 'Like New', 'Good', 'Fair'];

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleCondition = (cond: string) => {
    setSelectedConditions(prev => 
      prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
    );
  };

  const handleReset = () => {
    setPriceRange([0, 5000000]);
    setSelectedCategories([]);
    setSelectedConditions([]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.headerButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <TouchableOpacity onPress={handleReset}>
          <Text style={styles.headerButton}>Reset</Text>
        </TouchableOpacity>
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
              <TouchableOpacity
                key={cat}
                style={[styles.chip, selectedCategories.includes(cat) && styles.chipActive]}
                onPress={() => toggleCategory(cat)}
              >
                <Text style={[styles.chipText, selectedCategories.includes(cat) && styles.chipTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Condition</Text>
          <View style={styles.chipContainer}>
            {conditions.map(cond => (
              <TouchableOpacity
                key={cond}
                style={[styles.chip, selectedConditions.includes(cond) && styles.chipActive]}
                onPress={() => toggleCondition(cond)}
              >
                <Text style={[styles.chipText, selectedConditions.includes(cond) && styles.chipTextActive]}>
                  {cond}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <TouchableOpacity style={styles.locationOption}>
            <Text style={styles.locationText}>Within Campus</Text>
            <View style={styles.checkbox} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationOption}>
            <Text style={styles.locationText}>Nearby (5 miles)</Text>
            <View style={styles.checkbox} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={() => router.back()}
        >
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
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
