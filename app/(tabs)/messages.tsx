import React, { useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { MOCK_CONVERSATIONS } from '../../constants/mockData';

// Memoized conversation item component
const ConversationItem = React.memo(({ conversation, onPress }: { conversation: any; onPress: (id: number) => void }) => {
  const handlePress = useCallback(() => {
    onPress(conversation.id);
  }, [conversation.id, onPress]);

  // Get last message from conversation
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  const lastMessageText = lastMessage.text;
  
  // Calculate time ago
  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffMs = now.getTime() - messageTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <Pressable style={styles.conversationItem} onPress={handlePress}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{conversation.user.initials}</Text>
      </View>
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationName}>{conversation.user.name}</Text>
          <Text style={styles.conversationTime}>{getTimeAgo(lastMessage.timestamp)}</Text>
        </View>
        <Text style={[styles.lastMessage, conversation.unread && styles.unreadMessage]} numberOfLines={1}>
          {lastMessageText}
        </Text>
      </View>
      {conversation.unread ? <View style={styles.unreadBadge} /> : null}
    </Pressable>
  );
});

export default function MessagesScreen() {
  const router = useRouter();

  const handleConversationPress = useCallback((id: number) => {
    router.push(`/chat/${id}`);
  }, [router]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        <Pressable 
          style={styles.whatsappBanner}
          onPress={() => Linking.openURL('https://wa.me/')}
        >
          <Ionicons name="logo-whatsapp" size={32} color="#25D366" />
          <View style={styles.whatsappContent}>
            <Text style={styles.whatsappTitle}>Continue on WhatsApp</Text>
            <Text style={styles.whatsappText}>Chat with sellers directly on WhatsApp for faster responses</Text>
          </View>
        </Pressable>

        {MOCK_CONVERSATIONS.map(conv => (
          <ConversationItem key={conv.id} conversation={conv} onPress={handleConversationPress} />
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
  list: {
    flex: 1,
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
