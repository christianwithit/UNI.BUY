import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import Icon from '../components/Icon';
import { MOCK_MESSAGES } from '../utils/mockData';

export default function Messages() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.list}>
        <View style={styles.whatsappBanner}>
          <Icon name="whatsapp" size={32} color="#25D366" />
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
  whatsappBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryContainer,
    padding: 16,
    margin: 16,
    borderRadius: 16,
    gap: 12,
  },
  whatsappIcon: {
    fontSize: 32,
  },
  whatsappContent: {
    flex: 1,
  },
  whatsappTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
    fontFamily: 'System',
  },
  whatsappText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontFamily: 'System',
  },
  list: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    fontFamily: 'System',
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
    color: colors.text.primary,
    fontFamily: 'System',
  },
  conversationTime: {
    fontSize: 12,
    color: colors.text.light,
    fontFamily: 'System',
  },
  lastMessage: {
    fontSize: 14,
    color: colors.text.secondary,
    fontFamily: 'System',
  },
  unreadMessage: {
    fontWeight: '600',
    color: colors.text.primary,
  },
  unreadBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.secondary,
    marginLeft: 8,
  },
});
