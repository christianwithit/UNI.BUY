import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

type NotificationType = 'message' | 'offer' | 'sold' | 'review' | 'system';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  // Mock notifications data
  const allNotifications = useMemo<Notification[]>(() => [
    {
      id: 1,
      type: 'message',
      title: 'New Message',
      message: 'Sarah M. sent you a message about iPhone 13 Pro',
      time: '5 min ago',
      read: false,
      actionUrl: '/chat/1'
    },
    {
      id: 2,
      type: 'offer',
      title: 'New Offer Received',
      message: 'John D. offered UGX 2,200,000 for your MacBook Pro',
      time: '1 hour ago',
      read: false,
      actionUrl: '/listing/21'
    },
    {
      id: 3,
      type: 'sold',
      title: 'Item Sold!',
      message: 'Your Dell Monitor has been sold to Mike K.',
      time: '3 hours ago',
      read: true,
      actionUrl: '/listing/2'
    },
    {
      id: 4,
      type: 'review',
      title: 'New Review',
      message: 'Emma W. left you a 5-star review',
      time: '1 day ago',
      read: true,
      actionUrl: '/reviews'
    },
    {
      id: 5,
      type: 'system',
      title: 'Price Drop Alert',
      message: 'iPhone 14 Pro Max in your area dropped to UGX 2,800,000',
      time: '2 days ago',
      read: true,
      actionUrl: '/listing/2'
    },
    {
      id: 6,
      type: 'message',
      title: 'New Message',
      message: 'Peter S. is interested in your AirPods Pro',
      time: '2 days ago',
      read: true,
      actionUrl: '/chat/2'
    },
    {
      id: 7,
      type: 'system',
      title: 'Listing Expiring Soon',
      message: 'Your listing "Samsung Galaxy S23" will expire in 3 days',
      time: '3 days ago',
      read: true,
      actionUrl: '/listing/3'
    },
  ], []);

  const notifications = useMemo(() => {
    if (filter === 'unread') {
      return allNotifications.filter(n => !n.read);
    }
    return allNotifications;
  }, [allNotifications, filter]);

  const unreadCount = useMemo(() => 
    allNotifications.filter(n => !n.read).length
  , [allNotifications]);

  const getNotificationIcon = useCallback((type: NotificationType) => {
    switch (type) {
      case 'message':
        return { name: 'chatbubble', color: colors.primary };
      case 'offer':
        return { name: 'pricetag', color: '#EF9F27' };
      case 'sold':
        return { name: 'checkmark-circle', color: colors.primary };
      case 'review':
        return { name: 'star', color: '#EF9F27' };
      case 'system':
        return { name: 'information-circle', color: '#6F7A74' };
      default:
        return { name: 'notifications', color: colors.primary };
    }
  }, []);

  const handleNotificationPress = useCallback((notification: Notification) => {
    if (notification.actionUrl) {
      router.push(notification.actionUrl as any);
    }
  }, [router]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1C1B1B" />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <Pressable
          style={[styles.filterTab, filter === 'all' && styles.filterTabActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            All ({allNotifications.length})
          </Text>
        </Pressable>
        <Pressable
          style={[styles.filterTab, filter === 'unread' && styles.filterTabActive]}
          onPress={() => setFilter('unread')}
        >
          <Text style={[styles.filterText, filter === 'unread' && styles.filterTextActive]}>
            Unread ({unreadCount})
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-outline" size={64} color="#BEC9C3" />
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptyText}>
              {filter === 'unread' 
                ? "You're all caught up!"
                : "You'll see notifications here when you have activity"}
            </Text>
          </View>
        ) : (
          <View style={styles.notificationsList}>
            {notifications.map(notification => {
              const icon = getNotificationIcon(notification.type);
              return (
                <Pressable
                  key={notification.id}
                  style={[
                    styles.notificationCard,
                    !notification.read && styles.notificationUnread
                  ]}
                  onPress={() => handleNotificationPress(notification)}
                >
                  <View style={[styles.iconContainer, { backgroundColor: `${icon.color}15` }]}>
                    <Ionicons name={icon.name as any} size={24} color={icon.color} />
                  </View>
                  <View style={styles.notificationContent}>
                    <View style={styles.notificationHeader}>
                      <Text style={styles.notificationTitle}>{notification.title}</Text>
                      {!notification.read && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.notificationMessage} numberOfLines={2}>
                      {notification.message}
                    </Text>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#BEC9C3" />
                </Pressable>
              );
            })}
          </View>
        )}
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
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F0EDED',
  },
  filterTabActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6F7A74',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1B1B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6F7A74',
    textAlign: 'center',
    lineHeight: 24,
  },
  notificationsList: {
    padding: 16,
    gap: 12,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationUnread: {
    backgroundColor: '#E8F5F1',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1B1B',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#3F4944',
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#6F7A74',
  },
});
