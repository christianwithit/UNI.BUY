import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import Icon from '../components/Icon';

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState('active');
  const navigation = useNavigation();

  const myListings = [
    { id: 1, title: 'iPhone 12', price: 1850000, status: 'Active' },
    { id: 2, title: 'Dell Monitor', price: 550000, status: 'Sold' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Icon name="settings" size={22} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.university}>Makerere University</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Listings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Sold</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>4.8⭐</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'active' && styles.tabActive]}
              onPress={() => setActiveTab('active')}
            >
              <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>Active</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'sold' && styles.tabActive]}
              onPress={() => setActiveTab('sold')}
            >
              <Text style={[styles.tabText, activeTab === 'sold' && styles.tabTextActive]}>Sold</Text>
            </TouchableOpacity>
          </View>

          {myListings
            .filter(item => activeTab === 'active' ? item.status === 'Active' : item.status === 'Sold')
            .map(item => (
              <TouchableOpacity key={item.id} style={styles.listingItem}>
                <View style={styles.listingImage}>
                  <Text style={styles.listingImagePlaceholder}>📷</Text>
                </View>
                <View style={styles.listingInfo}>
                  <Text style={styles.listingTitle}>{item.title}</Text>
                  <Text style={styles.listingPrice}>UGX {item.price.toLocaleString()}</Text>
                </View>
                <View style={[styles.statusBadge, item.status === 'Sold' && styles.soldBadge]}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="heart" size={22} color={colors.text.primary} />
            <Text style={styles.menuText}>Favorites</Text>
            <Icon name="chevron-right" size={20} color={colors.text.light} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="package" size={22} color={colors.text.primary} />
            <Text style={styles.menuText}>Purchase History</Text>
            <Icon name="chevron-right" size={20} color={colors.text.light} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="star" size={22} color={colors.text.primary} />
            <Text style={styles.menuText}>Reviews</Text>
            <Icon name="chevron-right" size={20} color={colors.text.light} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="bell" size={22} color={colors.text.primary} />
            <Text style={styles.menuText}>Notifications</Text>
            <Icon name="chevron-right" size={20} color={colors.text.light} />
          </TouchableOpacity>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  backIcon: {
    fontSize: 24,
    color: colors.text.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    fontFamily: 'System',
  },
  settingsIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 24,
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.white,
    fontFamily: 'System',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
    fontFamily: 'System',
  },
  university: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 16,
    fontFamily: 'System',
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: 'System',
  },
  statsSection: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
    fontFamily: 'System',
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: 'System',
  },
  section: {
    backgroundColor: colors.white,
    padding: 16,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
    fontFamily: 'System',
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  listingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  listingImage: {
    width: 64,
    height: 64,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  listingImagePlaceholder: {
    fontSize: 28,
  },
  listingInfo: {
    flex: 1,
  },
  listingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
    fontFamily: 'System',
  },
  listingPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: 'System',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: colors.tertiaryContainer,
  },
  soldBadge: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
    fontFamily: 'System',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    fontFamily: 'System',
  },
  menuArrow: {
    fontSize: 24,
    color: colors.text.light,
  },
});
