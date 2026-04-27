import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { MOCK_MESSAGES } from '../../constants/mockData';

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      <ScrollView style={styles.list}>
        <View style={styles.whatsappBanner}>
          <Ionicons name="logo-whatsapp" size={32} color="#25D366" />
          <View style={styles.whatsappContent}>
            <Text style={styles.whatsappTitle}>Continue on WhatsApp</Text>
            <Text style={styles.whatsappText}>Chat with sellers directly on WhatsApp for faster responses</Text>
          </View>
        </View>

        {MOCK_MESSAGES.map(conv => (
          <TouchableOpacity key={conv.id} style={styles.conversationItem}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{conv.user.initials}</Text>
            </View>
            <View style={styles.conversationContent}>
              <View style={styles.conversationHeader}>
                <Text style={styles.conversationName}>{conv.user.name}</Text>
                <Text style={styles.conversationTime}>{conv.time}</Text>
              </View>
              <Text style={[styles.lastMessage, conv.unread && styles.unreadMessage]}>
                {conv.lastMessage}
              </Text>
            </View>
            {conv.unread && <View style={styles.unreadBadge} />}
          </TouchableOpacity>
        ))}
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
    justifyContent: 'center',
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
  whatsappBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5F1',
    padding: 16,
    margin: 16,
    borderRadius: 16,
    gap: 12,
  },
  whatsappContent: {
    flex: 1,
  },
  whatsappTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1B1B',
    marginBottom: 4,
  },
  whatsappText: {
    fontSize: 14,
    color: '#6F7A74',
  },
  list: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E0D8',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1B1B',
  },
  conversationTime: {
    fontSize: 12,
    color: '#6F7A74',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6F7A74',
  },
  unreadMessage: {
    fontWeight: '600',
    color: '#1C1B1B',
  },
  unreadBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF9F27',
    marginLeft: 8,
  },
});
