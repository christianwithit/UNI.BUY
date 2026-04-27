import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import Icon from '../components/Icon';

export default function ContactHandoff() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Seller</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.sellerCard}>
          <View style={styles.sellerAvatar}>
            <Text style={styles.sellerAvatarText}>JD</Text>
          </View>
          <Text style={styles.sellerName}>John Doe</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
            <Text style={styles.ratingText}>4.8 (24 reviews)</Text>
          </View>
          <Text style={styles.sellerUniversity}>Makerere University</Text>
        </View>

        <View style={styles.safetyCard}>
          <View style={styles.safetyHeader}>
            <Icon name="alert" size={24} color={colors.secondary} />
            <Text style={styles.safetyTitle}>Safety Tips</Text>
          </View>
          <Text style={styles.safetyTip}>• Meet in a public place on campus</Text>
          <Text style={styles.safetyTip}>• Inspect the item before paying</Text>
          <Text style={styles.safetyTip}>• Never share personal financial info</Text>
          <Text style={styles.safetyTip}>• Report suspicious activity</Text>
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Choose Contact Method</Text>

          <TouchableOpacity style={styles.contactOption}>
            <View style={styles.contactIconContainer}>
              <Icon name="messages" size={24} color={colors.primary} />
            </View>
            <View style={styles.contactContent}>
              <Text style={styles.contactOptionTitle}>Message on UNI.BUY</Text>
              <Text style={styles.contactOptionDescription}>Chat directly in the app</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.contactOption, styles.whatsappOption]}>
            <View style={[styles.contactIconContainer, styles.whatsappIconContainer]}>
              <Icon name="whatsapp" size={24} color="#25D366" />
            </View>
            <View style={styles.contactContent}>
              <Text style={styles.contactOptionTitle}>WhatsApp</Text>
              <Text style={styles.contactOptionDescription}>Continue on WhatsApp</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactOption}>
            <View style={styles.contactIconContainer}>
              <Icon name="mail" size={24} color={colors.primary} />
            </View>
            <View style={styles.contactContent}>
              <Text style={styles.contactOptionTitle}>Email</Text>
              <Text style={styles.contactOptionDescription}>john.doe@mak.ac.ug</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactOption}>
            <View style={styles.contactIconContainer}>
              <Icon name="phone" size={24} color={colors.primary} />
            </View>
            <View style={styles.contactContent}>
              <Text style={styles.contactOptionTitle}>Phone</Text>
              <Text style={styles.contactOptionDescription}>+256 7XX XXX XXX</Text>
            </View>
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
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  sellerCard: {
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 24,
    marginBottom: 16,
  },
  sellerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  sellerAvatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.white,
    fontFamily: 'System',
  },
  sellerName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
    fontFamily: 'System',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  ratingStars: {
    fontSize: 14,
  },
  ratingText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontFamily: 'System',
  },
  sellerUniversity: {
    fontSize: 14,
    color: colors.text.secondary,
    fontFamily: 'System',
  },
  safetyCard: {
    backgroundColor: colors.secondaryContainer,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  safetyIcon: {
    fontSize: 24,
  },
  safetyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    fontFamily: 'System',
  },
  safetyTip: {
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 8,
    lineHeight: 20,
    fontFamily: 'System',
  },
  contactSection: {
    backgroundColor: colors.white,
    padding: 16,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 16,
    fontFamily: 'System',
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    marginBottom: 12,
  },
  whatsappOption: {
    backgroundColor: colors.tertiaryContainer,
  },
  contactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  whatsappIconContainer: {
    backgroundColor: colors.white,
  },
  contactIcon: {
    fontSize: 24,
  },
  contactContent: {
    flex: 1,
  },
  contactOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
    fontFamily: 'System',
  },
  contactOptionDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    fontFamily: 'System',
  },
  arrow: {
    fontSize: 24,
    color: colors.text.light,
  },
});
