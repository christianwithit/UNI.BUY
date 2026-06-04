import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export default function HelpCenterScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1C1B1B" />
        </Pressable>
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.heading}>How can we help you?</Text>
          <Text style={styles.paragraph}>
            Welcome to the UNI.BUY Help Center. Here you'll find answers to common questions
            and guidance on using the app effectively.
          </Text>
          <Text style={styles.paragraph}>
            For immediate assistance, please contact our support team at support@unibuy.ug
            or reach out through our social media channels.
          </Text>
        </View>
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
  section: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    marginTop: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1B1B',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    color: '#3F4944',
    lineHeight: 24,
    marginBottom: 16,
  },
});
