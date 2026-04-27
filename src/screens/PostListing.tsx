import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import Icon from '../components/Icon';

const CATEGORIES = ['Phones', 'Laptops', 'TVs', 'Tablets', 'Headphones', 'Accessories'];
const CONDITIONS = [
  { label: 'New', icon: 'star', desc: 'Unopened in box' },
  { label: 'Like New', icon: 'star-filled', desc: 'Barely used' },
  { label: 'Good', icon: 'check', desc: 'Minor wear' },
  { label: 'Fair', icon: 'info', desc: 'Visible defects' },
];

export default function PostListing() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('Like New');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<number[]>([1]); // Mock photo
  const navigation = useNavigation();

  const handlePost = () => {
    if (title && price && selectedCategory && description) {
      navigation.navigate('SuccessPosted' as never);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Modal Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Listing</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Photo Upload Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>PHOTOS (UP TO 5)</Text>
            <Text style={styles.photoCount}>{photos.length} added</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
            {/* Added Photo */}
            {photos.map((photo, index) => (
              <View key={index} style={styles.photoCard}>
                <Icon name="image" size={32} color={colors.text.light} />
                <TouchableOpacity style={styles.removePhoto}>
                  <Icon name="close" size={16} color={colors.white} />
                </TouchableOpacity>
              </View>
            ))}
            {/* Add Photo Button */}
            <TouchableOpacity style={styles.addPhotoCard}>
              <Icon name="camera" size={28} color={colors.primary} />
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </TouchableOpacity>
            {/* Empty slots */}
            <View style={styles.emptySlot} />
            <View style={styles.emptySlot} />
          </ScrollView>
        </View>

        {/* Title Input */}
        <View style={styles.section}>
          <Text style={styles.label}>ITEM NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Vintage Denim Jacket"
            placeholderTextColor={colors.outline}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Price Input */}
        <View style={styles.section}>
          <Text style={styles.label}>PRICE</Text>
          <View style={styles.priceInputContainer}>
            <Text style={styles.currency}>UGX</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="0"
              placeholderTextColor={colors.outline}
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>
        </View>

        {/* Category Pills */}
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

        {/* Condition Bento Grid */}
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
                  <Icon 
                    name={cond.icon} 
                    size={18} 
                    color={selectedCondition === cond.label ? colors.primary : colors.text.light} 
                  />
                </View>
                <Text style={styles.conditionLabel}>{cond.label}</Text>
                <Text style={styles.conditionDesc}>{cond.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.label}>DESCRIPTION</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Describe the item's features, brand, size, flaws, and reason for selling..."
            placeholderTextColor={colors.outline}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Location */}
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

      {/* Sticky Bottom Action Bar */}
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
    backgroundColor: colors.surface,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  closeIcon: {
    fontSize: 24,
    color: colors.onSurface,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.onSurface,
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
    color: colors.onSurfaceVariant,
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
    color: colors.onSurfaceVariant,
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
    backgroundColor: colors.surfaceContainer,
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
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeIcon: {
    fontSize: 16,
    color: colors.onError,
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
  addPhotoIcon: {
    fontSize: 24,
    marginBottom: 4,
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
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLow,
    marginRight: 8,
  },
  input: {
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    fontSize: 16,
    color: colors.onSurface,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  currency: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    marginRight: 8,
    letterSpacing: -0.5,
  },
  priceInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: '700',
    color: colors.onSurface,
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
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surface,
    gap: 4,
  },
  pillActive: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.primaryContainer,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  checkmark: {
    fontSize: 16,
    color: colors.onPrimaryContainer,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurface,
    letterSpacing: 0.12,
  },
  pillTextActive: {
    fontWeight: '700',
    color: colors.onPrimaryContainer,
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
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
    gap: 8,
  },
  conditionCardActive: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}0D`,
  },
  conditionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conditionIconActive: {
    backgroundColor: `${colors.primary}1A`,
  },
  conditionEmoji: {
    fontSize: 20,
  },
  conditionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
    letterSpacing: 0.1,
  },
  conditionDesc: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    letterSpacing: 0.12,
  },
  textArea: {
    minHeight: 120,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    fontSize: 14,
    color: colors.onSurface,
    lineHeight: 20,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLow,
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
    color: colors.onSurface,
  },
  locationHint: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    letterSpacing: 0.12,
  },
  chevron: {
    fontSize: 24,
    color: colors.outline,
    marginRight: 8,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
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
    borderColor: colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreIcon: {
    fontSize: 24,
    color: colors.onSurfaceVariant,
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
    backgroundColor: colors.surfaceContainerHigh,
  },
  postButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onPrimary,
    letterSpacing: 0.1,
  },
});
