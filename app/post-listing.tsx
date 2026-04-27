import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const CATEGORIES = ['Phones', 'Laptops', 'TVs', 'Tablets', 'Headphones', 'Accessories'];
const CONDITIONS = [
  { label: 'New', icon: 'star', desc: 'Unopened in box' },
  { label: 'Like New', icon: 'star', desc: 'Barely used' },
  { label: 'Good', icon: 'checkmark', desc: 'Minor wear' },
  { label: 'Fair', icon: 'information-circle', desc: 'Visible defects' },
];

export default function PostListing() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('Like New');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<number[]>([1]);
  const router = useRouter();

  const handlePost = () => {
    if (title && price && selectedCategory && description) {
      router.push('/success-posted');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#1C1B1B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Listing</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>PHOTOS (UP TO 5)</Text>
            <Text style={styles.photoCount}>{photos.length} added</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
            {photos.map((photo, index) => (
              <View key={index} style={styles.photoCard}>
                <Text style={styles.photoPlaceholder}>📷</Text>
                <TouchableOpacity style={styles.removePhoto}>
                  <Ionicons name="close" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.addPhotoCard}>
              <Ionicons name="camera" size={28} color={colors.primary} />
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </TouchableOpacity>
            <View style={styles.emptySlot} />
            <View style={styles.emptySlot} />
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>ITEM NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Vintage Denim Jacket"
            placeholderTextColor="#BEC9C3"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>PRICE</Text>
          <View style={styles.priceInputContainer}>
            <Text style={styles.currency}>UGX</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="0"
              placeholderTextColor="#BEC9C3"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>CATEGORY</Text>
          <View style={styles.pillContainer}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.pill,
                  selectedCategory === cat && styles.pillActive
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                {selectedCategory === cat && <Text style={styles.checkmark}>✓</Text>}
                <Text style={[
                  styles.pillText,
                  selectedCategory === cat && styles.pillTextActive
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>CONDITION</Text>
          <View style={styles.conditionGrid}>
            {CONDITIONS.map(cond => (
              <TouchableOpacity
                key={cond.label}
                style={[
                  styles.conditionCard,
                  selectedCondition === cond.label && styles.conditionCardActive
                ]}
                onPress={() => setSelectedCondition(cond.label)}
              >
                <View style={[
                  styles.conditionIcon,
                  selectedCondition === cond.label && styles.conditionIconActive
                ]}>
                  <Ionicons 
                    name={cond.icon as any} 
                    size={18} 
                    color={selectedCondition === cond.label ? colors.primary : '#6F7A74'} 
                  />
                </View>
                <Text style={styles.conditionLabel}>{cond.label}</Text>
                <Text style={styles.conditionDesc}>{cond.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>DESCRIPTION</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Describe the item's features, brand, size, flaws, and reason for selling..."
            placeholderTextColor="#BEC9C3"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>MEETUP LOCATION</Text>
          <TouchableOpacity style={styles.locationSelector}>
            <Text style={styles.locationIcon}>📍</Text>
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>Kampala Central</Text>
              <Text style={styles.locationHint}>Tap to change</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreIcon}>⋯</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.postButton, (!title || !price) && styles.postButtonDisabled]}
          onPress={handlePost}
          disabled={!title || !price}
        >
          <Text style={styles.postButtonText}>Post listing</Text>
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
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E0D8',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1B1B',
    letterSpacing: -0.4,
  },
  spacer: {
    width: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6F7A74',
    letterSpacing: 1.5,
  },
  photoCount: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.12,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6F7A74',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  photoScroll: {
    marginBottom: 8,
  },
  photoCard: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#F0EDED',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  photoPlaceholder: {
    fontSize: 32,
  },
  removePhoto: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D32F2F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoCard: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}0D`,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.12,
  },
  emptySlot: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E2E0D8',
    backgroundColor: '#F0EDED',
    marginRight: 8,
  },
  input: {
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F0EDED',
    borderWidth: 1,
    borderColor: '#E2E0D8',
    fontSize: 16,
    color: '#1C1B1B',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F0EDED',
    borderWidth: 1,
    borderColor: '#E2E0D8',
  },
  currency: {
    fontSize: 22,
    fontWeight: '700',
    color: '#6F7A74',
    marginRight: 8,
    letterSpacing: -0.5,
  },
  priceInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: '700',
    color: '#1C1B1B',
    letterSpacing: -0.64,
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E0D8',
    backgroundColor: '#FFFFFF',
    gap: 4,
  },
  pillActive: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: '#E8F5F1',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  checkmark: {
    fontSize: 16,
    color: colors.primary,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1C1B1B',
    letterSpacing: 0.12,
  },
  pillTextActive: {
    fontWeight: '700',
    color: colors.primary,
  },
  conditionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  conditionCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E0D8',
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  conditionCardActive: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: '#E8F5F1',
  },
  conditionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0EDED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  conditionIconActive: {
    backgroundColor: `${colors.primary}1A`,
  },
  conditionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1B1B',
    letterSpacing: 0.1,
  },
  conditionDesc: {
    fontSize: 12,
    color: '#6F7A74',
    letterSpacing: 0.12,
  },
  textArea: {
    minHeight: 120,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F0EDED',
    borderWidth: 1,
    borderColor: '#E2E0D8',
    fontSize: 14,
    color: '#1C1B1B',
    lineHeight: 20,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E0D8',
    backgroundColor: '#F0EDED',
  },
  locationIcon: {
    fontSize: 20,
    marginHorizontal: 8,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1B1B',
  },
  locationHint: {
    fontSize: 12,
    color: '#6F7A74',
    letterSpacing: 0.12,
  },
  chevron: {
    fontSize: 24,
    color: '#BEC9C3',
    marginRight: 8,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#E2E0D8',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 8,
    gap: 16,
  },
  moreButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E0D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreIcon: {
    fontSize: 24,
    color: '#6F7A74',
  },
  postButton: {
    flex: 1,
    height: 56,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
  },
  postButtonDisabled: {
    backgroundColor: '#BEC9C3',
  },
  postButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.1,
  },
});
