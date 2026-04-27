import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { ProgressBar } from '../../components/shared/ProgressBar';

const universities = [
  'Makerere University',
  'Kyambogo University',
  'Makerere University Business School (MUBS)',
  'Uganda Christian University (UCU)',
  'Nkumba University',
  'Ndejje University',
  'Kampala International University (KIU)',
  'Uganda Martyrs University (UMU)',
  'Cavendish University Uganda',
  'Victoria University Uganda',
  'Mountains of the Moon University',
  'Busitema University',
  'Gulu University',
];

export default function SetupScreen() {
  const router = useRouter();
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [showUniversityModal, setShowUniversityModal] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);

  const isValid = selectedUniversity !== '';

  const handleUniversitySelect = (university: string) => {
    setSelectedUniversity(university);
    setShowUniversityModal(false);
  };

  const handleLocationAccess = () => {
    setLocationGranted(true);
  };

  const handleStartBrowsing = () => {
    router.replace('/(tabs)/');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
            <Text style={styles.stepIndicator}>4 of 4</Text>
          </View>

          <ProgressBar steps={4} current={4} style={styles.progressBar} />

          <View style={styles.mainContent}>
            <Text style={styles.headline}>Almost done!</Text>
            <Text style={styles.subtext}>Tell us where you study.</Text>

            <View style={styles.inputSection}>
              <Text style={styles.label}>Your university</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowUniversityModal(true)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    !selectedUniversity && styles.dropdownPlaceholder,
                  ]}
                >
                  {selectedUniversity || 'Select a university…'}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
              <Text style={styles.inputHelper}>
                This helps us show you listings from your campus only.
              </Text>
            </View>

            <View
              style={[
                styles.locationCard,
                locationGranted && styles.locationCardSuccess,
              ]}
            >
              <View
                style={[
                  styles.locationIcon,
                  locationGranted && styles.locationIconSuccess,
                ]}
              >
                <Ionicons
                  name={locationGranted ? 'checkmark' : 'location'}
                  size={20}
                  color={locationGranted ? colors.success : colors.primary}
                />
              </View>
              <View style={styles.locationContent}>
                <Text
                  style={[
                    styles.locationTitle,
                    locationGranted && styles.locationTitleSuccess,
                  ]}
                >
                  {locationGranted ? 'Location enabled' : 'Enable location'}
                </Text>
                <Text style={styles.locationSubtext}>
                  {locationGranted
                    ? "We'll sort listings by distance from you."
                    : 'Helps you find sellers closest to you on campus.'}
                </Text>
                {!locationGranted && (
                  <TouchableOpacity
                    style={styles.locationButton}
                    onPress={handleLocationAccess}
                  >
                    <Text style={styles.locationButtonText}>
                      Allow location access →
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.button, isValid && styles.buttonActive]}
          onPress={handleStartBrowsing}
          disabled={!isValid}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Start browsing →</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showUniversityModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowUniversityModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowUniversityModal(false)}
        >
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Select your university</Text>
            <FlatList
              data={universities}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.universityItem}
                  onPress={() => handleUniversitySelect(item)}
                >
                  <Text
                    style={[
                      styles.universityText,
                      selectedUniversity === item && styles.universityTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                  {selectedUniversity === item && (
                    <Ionicons name="checkmark" size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 32,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
  },
  stepIndicator: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  progressBar: {
    marginTop: 16,
  },
  mainContent: {
    marginTop: 24,
    gap: 32,
  },
  headline: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  subtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: -24,
  },
  inputSection: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  dropdown: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  dropdownText: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  dropdownPlaceholder: {
    color: colors.textTertiary,
  },
  inputHelper: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  locationCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
  },
  locationCardSuccess: {
    borderColor: colors.successLight,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationIconSuccess: {
    backgroundColor: colors.successLight,
  },
  locationContent: {
    flex: 1,
    gap: 4,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  locationTitleSuccess: {
    color: colors.success,
  },
  locationSubtext: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  locationButton: {
    marginTop: 6,
  },
  locationButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.primary,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 32,
    paddingBottom: 16,
    backgroundColor: colors.background,
  },
  button: {
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.textTertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginTop: 12,
    borderRadius: 2,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  universityItem: {
    height: 52,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  universityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  universityTextSelected: {
    color: colors.primary,
  },
});
