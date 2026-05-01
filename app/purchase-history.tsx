import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { colors } from '../constants/colors';

export default function PurchaseHistoryScreen() {
  const router = useRouter();

  // Mock purchase history data
  const purchases = useMemo(() => [
    {
      id: 1,
      title: 'iPhone 13 Pro',
      price: 2450000,
      seller: 'John Doe',
      date: '2024-04-15',
      status: 'Delivered',
      imageUrl: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5',
      blurhash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH'
    },
    {
      id: 2,
      title: 'MacBook Pro M1',
      price: 3200000,
      seller: 'Sarah M.',
      date: '2024-03-28',
      status: 'Delivered',
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
      blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4'
    },
    {
      id: 3,
      title: 'AirPods Pro',
      price: 450000,
      seller: 'Mike K.',
      date: '2024-02-10',
      status: 'Delivered',
      imageUrl: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7',
      blurhash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH'
    },
  ], []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1C1B1B" />
        </Pressable>
        <Text style={styles.headerTitle}>Purchase History</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {purchases.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={64} color="#BEC9C3" />
            <Text style={styles.emptyTitle}>No Purchases Yet</Text>
            <Text style={styles.emptyText}>
              Items you buy will appear here
            </Text>
          </View>
        ) : (
          <View style={styles.purchasesList}>
            {purchases.map(purchase => (
              <Pressable 
                key={purchase.id}
                style={styles.purchaseCard}
                onPress={() => router.push(`/listing/${purchase.id}`)}
              >
                <Image
                  source={{ uri: `${purchase.imageUrl}?w=160&h=160&fit=crop` }}
                  placeholder={{ blurhash: purchase.blurhash }}
                  contentFit="cover"
                  style={styles.purchaseImage}
                  cachePolicy="memory-disk"
                  recyclingKey={String(purchase.id)}
                />
                <View style={styles.purchaseInfo}>
                  <Text style={styles.purchaseTitle} numberOfLines={2}>
                    {purchase.title}
                  </Text>
                  <Text style={styles.purchaseSeller}>Sold by {purchase.seller}</Text>
                  <Text style={styles.purchaseDate}>
                    {new Date(purchase.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Text>
                  <View style={styles.purchaseFooter}>
                    <Text style={styles.purchasePrice}>
                      UGX {purchase.price.toLocaleString()}
                    </Text>
                    <View style={styles.statusBadge}>
                      <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
                      <Text style={styles.statusText}>{purchase.status}</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1B1B',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1B1B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6F7A74',
    textAlign: 'center',
    lineHeight: 24,
  },
  purchasesList: {
    padding: 16,
    gap: 16,
  },
  purchaseCard: {
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
  purchaseImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  purchaseInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  purchaseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1B1B',
    marginBottom: 4,
  },
  purchaseSeller: {
    fontSize: 14,
    color: '#6F7A74',
    marginBottom: 4,
  },
  purchaseDate: {
    fontSize: 12,
    color: '#BEC9C3',
    marginBottom: 8,
  },
  purchaseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  purchasePrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#E8F5F1',
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
});
