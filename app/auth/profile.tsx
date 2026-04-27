import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { ProgressBar } from '../../components/shared/ProgressBar';

export default function ProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoSelected, setPhotoSelected] = useState(false);

  const isValid = name.trim().length >= 2;

  const handlePhotoPress = () => {
    setShowPhotoModal(true);
  };

  const handlePhotoOption = (option: string) => {
    setShowPhotoModal(false);
    // Placeholder - just mark as selected
    setPhotoSelected(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
            <Text style={styles.stepIndicator}>3 of 4</Text>
          </View>

          <ProgressBar steps={4} current={2} style={styles.progressBar} />

          <View style={styles.mainContent}>
            <Text style={styles.headline}>Create your profile</Text>
            <Text style={styles.subtext}>
              This is how other students will see you.
            </Text>

            <View style={styles.photoSection}>
              <TouchableOpacity
                style={styles.photoCircle}
                onPress={handlePhotoPress}
                activeOpacity={0.7}
              >
                <Ionicons name="person" size={36} color={colors.primary} />
                {photoSelected && (
                  <View style={styles.checkmarkOverlay}>
                    <Ionicons name="checkmark" size={16} color={colors.white} />
                  </View>
                )}
                <View style={styles.cameraButton}>
                  <Ionicons name="camera" size={14} color={colors.white} />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.label}>Your name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="e.g. John Kato"
                placeholderTextColor={colors.textTertiary}
                autoCapitalize="words"
                returnKeyType="done"
              />
              <Text style={styles.inputHelper}>
                This will be visible to buyers and sellers on your campus.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              isValid && styles.buttonActive,
            ]}
            onPress={() => router.push('/auth/setup')}
            disabled={!isValid}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Continue →</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal
        visible={showPhotoModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPhotoModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowPhotoModal(false)}
        >
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Add profile photo</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handlePhotoOption('camera')}
            >
              <Text style={styles.modalOptionText}>Take photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handlePhotoOption('library')}
            >
              <Text style={styles.modalOptionText}>Choose from library</Text>
            </TouchableOpacity>
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
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
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
  photoSection: {
    alignItems: 'center',
    marginTop: -4,
  },
  photoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkOverlay: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSection: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  input: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.textPrimary,
    backgroundColor: colors.white,
  },
  inputHelper: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  bottomContainer: {
    paddingHorizontal: 32,
    paddingBottom: 16,
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
    paddingBottom: 40,
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
  modalOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalOptionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
});
