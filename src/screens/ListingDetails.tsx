import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import Icon from '../components/Icon';

export default function ListingDetails() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header - Absolute positioned over image, needs manual safe area */}
      <SafeAreaView style={styles.headerSafeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="back" size={24} color={colors.white} />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Icon name="share" size={22} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Icon name="heart" size={22} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageGallery}>
          <View style={styles.mainImage}>
            <Text style={styles.imagePlaceholder}>📷</Text>
          </View>
          <View style={styles.thumbnails}>
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={styles.thumbnail}>
                <Text style={styles.thumbnailPlaceholder}>📷</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Premium Ultra-Slim Laptop 14"</Text>
            <View style={styles.timeRow}>
              <Icon name="clock" size={14} color={colors.text.light} />
              <Text style={styles.timeText}>Posted 2 hours ago</Text>
            </View>
          </View>
          <Text style={styles.price}>UGX 3,200,000</Text>
          <View style={styles.conditionBadge}>
            <Text style={styles.conditionText}>Like New</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            MacBook Pro M1 2020 in excellent condition. Barely used, comes with original box and charger. 
            Perfect for students and professionals. Battery health at 95%.
          </Text>
        </View>

        {/* Seller Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seller</Text>
          <View style={styles.sellerCard}>
            <View style={styles.sellerAvatar}>
              <Text style={styles.sellerAvatarText}>JD</Text>
            </View>
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerName}>John Doe</Text>
              <View style={styles.ratingRow}>
                <Icon name="star-filled" size={14} color={colors.secondary} />
                <Text style={styles.ratingText}>4.8 (24 reviews)</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.viewProfileButton}>
              <Icon name="chevron-right" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.locationCard}>
            <Icon name="location" size={20} color={colors.primary} />
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>Makerere University</Text>
              <Text style={styles.locationDistance}>Campus Center • 0.5 km away</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => navigation.navigate('ContactHandoff' as never)}
        >
          <Icon name="messages" size={20} color={colors.white} />
          <Text style={styles.contactButtonText}>Contact Seller</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buyButton}
          onPress={() => navigation.navigate('Checkout' as never)}
        >
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  headerSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  imageGallery: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  mainImage: {
    width: '100%',
    height: 300,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    fontSize: 64,
  },
  thumbnails: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailPlaceholder: {
    fontSize: 24,
  },
  infoSection: {
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 8,
  },
  titleRow: {
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
    fontFamily: 'System',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 12,
    color: colors.text.light,
    fontFamily: 'System',
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 12,
    fontFamily: 'System',
  },
  conditionBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.tertiaryContainer,
    borderRadius: 12,
  },
  conditionText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
    fontFamily: 'System',
  },
  section: {
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 12,
    fontFamily: 'System',
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 22,
    fontFamily: 'System',
  },
  sellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
  },
  sellerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sellerAvatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    fontFamily: 'System',
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
    fontFamily: 'System',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: 'System',
  },
  viewProfileButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    gap: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
    fontFamily: 'System',
  },
  locationDistance: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: 'System',
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  contactButton: {
    flex: 1,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primaryContainer,
    borderRadius: 28,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    fontFamily: 'System',
  },
  buyButton: {
    flex: 1,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 28,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    fontFamily: 'System',
  },
});
