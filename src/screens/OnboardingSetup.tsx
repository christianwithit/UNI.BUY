import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import Icon from '../components/Icon';

const UGANDAN_UNIVERSITIES = [
  'Makerere University',
  'Kyambogo University',
  'Mbarara University of Science and Technology',
  'Gulu University',
  'Busitema University',
  'Makerere University Business School',
  'Uganda Christian University',
  'Islamic University in Uganda',
  'Kampala International University',
  'Nkumba University',
  'Uganda Martyrs University',
  'Mountains of the Moon University',
  'Kabale University',
  'Lira University',
  'Soroti University',
  'Other',
];

export default function OnboardingSetup() {
  const [university, setUniversity] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation();

  const handleComplete = () => {
    if (university) {
      navigation.navigate('HomeFeed' as never);
    }
  };

  const selectUniversity = (uni: string) => {
    setUniversity(uni);
    setShowPicker(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="back" size={24} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.progressText}>Step 3 of 3</Text>
        <View style={styles.spacer} />
      </View>

      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: '100%' }]} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Almost done!</Text>
          <Text style={styles.subtitle}>
            Let's set up your university to find items near campus.
          </Text>
        </View>

        {/* Progress Dots */}
        <View style={styles.progressDots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>

        {/* University Selection */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Your University</Text>
          <TouchableOpacity style={styles.picker} onPress={() => setShowPicker(true)}>
            <Text style={university ? styles.pickerText : styles.pickerPlaceholder}>
              {university || 'Select a university...'}
            </Text>
            <Icon name="chevron-down" size={16} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
          <Text style={styles.helperText}>This helps us show you listings nearby.</Text>
        </View>

        {/* Location Permission Card */}
        <View style={styles.locationCard}>
          <View style={styles.locationGradient} />
          <View style={styles.locationContent}>
            <View style={styles.locationIconContainer}>
              <Icon name="location" size={28} color={colors.primary} />
            </View>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationTitle}>Local Listings</Text>
              <Text style={styles.locationDescription}>
                Enable location to discover items from students right around you instantly.
              </Text>
              <TouchableOpacity style={styles.enableButton}>
                <Icon name="location" size={18} color={colors.onSurface} />
                <Text style={styles.enableButtonText}>Enable location</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !university && styles.buttonDisabled]}
          onPress={handleComplete}
          disabled={!university}
        >
          <Text style={styles.buttonText}>Start browsing</Text>
          <Icon name="arrow-right" size={18} color={colors.onPrimary} />
        </TouchableOpacity>
      </View>

      {/* University Picker Modal */}
      <Modal
        visible={showPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Your University</Text>
              <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.closeButton}>
                <Icon name="close" size={24} color={colors.onSurfaceVariant} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.universityList}>
              {UGANDAN_UNIVERSITIES.map((uni, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.universityItem,
                    university === uni && styles.universityItemSelected
                  ]}
                  onPress={() => selectUniversity(uni)}
                >
                  <Text style={[
                    styles.universityText,
                    university === uni && styles.universityTextSelected
                  ]}>
                    {uni}
                  </Text>
                  {university === uni && <Icon name="check" size={20} color={colors.primary} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    borderBottomColor: colors.surfaceVariant,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: colors.onSurface,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    letterSpacing: 0.12,
  },
  spacer: {
    width: 40,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.surfaceContainerHigh,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerSection: {
    paddingTop: 32,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 8,
    letterSpacing: -0.64,
  },
  subtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
  },
  progressDots: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 32,
  },
  dot: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surfaceContainerHigh,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  formSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    marginBottom: 8,
    letterSpacing: 0.12,
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    marginBottom: 8,
  },
  pickerText: {
    fontSize: 16,
    color: colors.onSurface,
  },
  pickerPlaceholder: {
    fontSize: 16,
    color: colors.outline,
  },
  dropdownIcon: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  helperText: {
    fontSize: 12,
    color: colors.outline,
    letterSpacing: 0.12,
  },
  locationCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 100,
  },
  locationGradient: {
    position: 'absolute',
    right: -32,
    top: -32,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: colors.primaryFixed,
    opacity: 0.3,
  },
  locationContent: {
    flexDirection: 'row',
    gap: 16,
    zIndex: 10,
  },
  locationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.primaryContainer}1A`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationIcon: {
    fontSize: 28,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 4,
    letterSpacing: -0.4,
  },
  locationDescription: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
    marginBottom: 16,
  },
  enableButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 20,
    gap: 8,
  },
  locationPinIcon: {
    fontSize: 18,
  },
  enableButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
    letterSpacing: 0.1,
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: colors.surface,
  },
  button: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onPrimary,
    letterSpacing: 0.1,
  },
  arrowIcon: {
    fontSize: 18,
    color: colors.onPrimary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 24,
    color: colors.onSurfaceVariant,
  },
  universityList: {
    maxHeight: 500,
  },
  universityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  universityItemSelected: {
    backgroundColor: colors.surfaceContainer,
  },
  universityText: {
    fontSize: 16,
    color: colors.onSurface,
    flex: 1,
  },
  universityTextSelected: {
    fontWeight: '600',
    color: colors.primary,
  },
  checkIcon: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '700',
  },
});
