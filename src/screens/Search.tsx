import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import Icon from '../components/Icon';
import { MOCK_LISTINGS, CATEGORIES, RECENT_SEARCHES } from '../utils/mockData';

export default function Search() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigation = useNavigation();

  const popularCategories = CATEGORIES;

  const mockResults = MOCK_LISTINGS.slice(0, 6);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={colors.text.light} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search electronics..."
            placeholderTextColor={colors.text.light}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Filters' as never)} style={styles.filterButton}>
          <Icon name="filter" size={20} color={colors.text.primary} />
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
                    <Icon name="clock" size={18} color={colors.text.light} />
                  </View>
                  <Text style={styles.recentText}>{search}</Text>
                  <Icon name="arrow-right" size={18} color={colors.text.light} style={{ transform: [{ rotate: '-45deg' }] }} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Categories</Text>
              <View style={styles.categoryGrid}>
                {popularCategories.map((cat, index) => (
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
                <TouchableOpacity key={item.id} style={styles.resultCard}>
                  <View style={styles.resultImage}>
                    <Icon name="image" size={32} color={colors.text.light} />
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
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    gap: 12,
    shadowColor: colors.black,
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
  backIcon: {
    fontSize: 24,
    color: colors.text.primary,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 24,
    paddingHorizontal: 16,
    gap: 8,
  },
  searchIcon: {
    fontSize: 18,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    fontFamily: 'System',
  },
  filterButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    fontSize: 20,
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
    color: colors.text.primary,
    marginBottom: 16,
    fontFamily: 'System',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  recentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recentIcon: {
    fontSize: 20,
  },
  recentText: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    fontFamily: 'System',
  },
  arrowIcon: {
    fontSize: 20,
    color: colors.text.light,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
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
    color: colors.text.primary,
    fontFamily: 'System',
  },
  resultsSection: {
    padding: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 16,
    fontFamily: 'System',
  },
  resultsGrid: {
    gap: 16,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    gap: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  resultImage: {
    width: 80,
    height: 80,
    backgroundColor: colors.surfaceContainer,
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
    color: colors.text.primary,
    fontFamily: 'System',
  },
  resultCondition: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: 'System',
  },
  resultPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: 'System',
  },
});
