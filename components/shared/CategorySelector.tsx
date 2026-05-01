import React, { useMemo, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../constants/colors';
import { CATEGORIES } from '../../constants/mockData';

type CategoryVariant = 'pills' | 'chips' | 'cards';

interface CategorySelectorProps {
  selected: string | null;
  onSelect: (category: string) => void;
  variant?: CategoryVariant;
  includeAll?: boolean;
  multiSelect?: boolean;
}

export const CategorySelector = React.memo<CategorySelectorProps>(({
  selected,
  onSelect,
  variant = 'pills',
  includeAll = false,
  multiSelect = false,
}) => {
  // Memoize category list
  const categoryList = useMemo(() => {
    const cats = CATEGORIES.map(cat => cat.name);
    return includeAll ? ['All', ...cats] : cats;
  }, [includeAll]);

  const handlePress = useCallback((category: string) => {
    onSelect(category);
  }, [onSelect]);

  const isSelected = useCallback((category: string) => {
    return selected === category;
  }, [selected]);

  // Pills variant (horizontal scroll)
  if (variant === 'pills') {
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.pillsContainer}
        contentContainerStyle={styles.pillsContent}
      >
        {categoryList.map(cat => (
          <Pressable
            key={cat}
            style={[
              styles.pill,
              isSelected(cat) && styles.pillActive
            ]}
            onPress={() => handlePress(cat)}
          >
            <Text style={[
              styles.pillText,
              isSelected(cat) && styles.pillTextActive
            ]}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    );
  }

  // Chips variant (wrapped grid)
  if (variant === 'chips') {
    return (
      <View style={styles.chipsContainer}>
        {categoryList.map(cat => (
          <Pressable
            key={cat}
            style={[
              styles.chip,
              isSelected(cat) && styles.chipActive
            ]}
            onPress={() => handlePress(cat)}
          >
            <Text style={[
              styles.chipText,
              isSelected(cat) && styles.chipTextActive
            ]}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  }

  // Cards variant (grid with icons)
  if (variant === 'cards') {
    return (
      <View style={styles.cardsContainer}>
        {CATEGORIES.map(cat => (
          <Pressable
            key={cat.id}
            style={[
              styles.card,
              isSelected(cat.name) && styles.cardActive
            ]}
            onPress={() => handlePress(cat.name)}
          >
            <Text style={styles.cardIcon}>{cat.icon}</Text>
            <Text style={[
              styles.cardText,
              isSelected(cat.name) && styles.cardTextActive
            ]}>
              {cat.name}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  }

  return null;
});

const styles = StyleSheet.create({
  // Pills variant styles
  pillsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  pillsContent: {
    paddingBottom: 4,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BEC9C3',
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1C1B1B',
    letterSpacing: 0.12,
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // Chips variant styles
  chipsContainer: {
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

  // Cards variant styles
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
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
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardActive: {
    backgroundColor: '#E8F5F1',
    borderColor: colors.primary,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1B1B',
  },
  cardTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});
