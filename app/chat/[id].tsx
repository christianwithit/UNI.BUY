import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { colors } from '../../constants/colors';
import { MOCK_CONVERSATIONS } from '../../constants/mockData';

interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
  read: boolean;
}

// Memoized message bubble component
const MessageBubble = React.memo(({ message, isCurrentUser }: { message: Message; isCurrentUser: boolean }) => {
  const time = new Date(message.timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <View style={[styles.messageBubbleContainer, isCurrentUser && styles.messageBubbleContainerRight]}>
      <View style={[styles.messageBubble, isCurrentUser ? styles.messageBubbleSent : styles.messageBubbleReceived]}>
        <Text style={[styles.messageText, isCurrentUser && styles.messageTextSent]}>{message.text}</Text>
        <Text style={[styles.messageTime, isCurrentUser && styles.messageTimeSent]}>{time}</Text>
      </View>
    </View>
  );
});

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  // Find conversation by ID
  const conversation = useMemo(() => {
    return MOCK_CONVERSATIONS.find((conv) => conv.id === Number(id));
  }, [id]);

  const [messages, setMessages] = useState<Message[]>(conversation?.messages || []);
  const [inputText, setInputText] = useState('');

  // Scroll to bottom on mount
  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: false });
    }, 100);
  }, []);

  const handleSend = useCallback(() => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      senderId: 0, // Current user
      text: inputText.trim(),
      timestamp: new Date().toISOString(),
      read: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    // Scroll to bottom after sending
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [inputText, messages.length]);

  const renderMessage = useCallback(
    ({ item }: { item: Message }) => {
      const isCurrentUser = item.senderId === 0;
      return <MessageBubble message={item} isCurrentUser={isCurrentUser} />;
    },
    []
  );

  const keyExtractor = useCallback((item: Message) => String(item.id), []);

  if (!conversation) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Conversation not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </Pressable>

        <View style={styles.headerCenter}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{conversation.user.initials}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{conversation.user.name}</Text>
            <Text style={styles.headerSubtitle}>{conversation.listing.title}</Text>
          </View>
        </View>

        <Pressable style={styles.headerButton}>
          <Ionicons name="ellipsis-vertical" size={20} color={colors.primary} />
        </Pressable>
      </View>

      {/* Listing Preview */}
      <Pressable
        style={styles.listingPreview}
        onPress={() => router.push(`/listing/${conversation.listing.id}`)}
      >
        <Image
          source={{ uri: conversation.listing.imageUrl }}
          placeholder={{ blurhash: conversation.listing.blurhash }}
          contentFit="cover"
          style={styles.listingImage}
          cachePolicy="memory-disk"
        />
        <View style={styles.listingInfo}>
          <Text style={styles.listingTitle} numberOfLines={1}>
            {conversation.listing.title}
          </Text>
          <Text style={styles.listingPrice}>UGX {conversation.listing.price.toLocaleString()}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      </Pressable>

      {/* Messages List */}
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={colors.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <Pressable
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={20} color={inputText.trim() ? '#FFFFFF' : colors.textSecondary} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF9F8',
  },
  header: {
    height: 64,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E0D8',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  listingPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E0D8',
  },
  listingImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  listingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  listingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  listingPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 2,
  },
  keyboardAvoid: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  messageBubbleContainer: {
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  messageBubbleContainerRight: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
  },
  messageBubbleReceived: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E0D8',
    borderBottomLeftRadius: 4,
  },
  messageBubbleSent: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  messageTextSent: {
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
  messageTimeSent: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E0D8',
  },
  input: {
    flex: 1,
    backgroundColor: '#F0EDED',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.textPrimary,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#F0EDED',
  },
});
