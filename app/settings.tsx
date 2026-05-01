import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export default function SettingsScreen() {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [messageNotifications, setMessageNotifications] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            // In real app, clear auth tokens and navigate to login
            Alert.alert('Success', 'You have been logged out');
          }
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been deleted');
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1C1B1B" />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          
          <Pressable style={styles.menuItem}>
            <Ionicons name="person-outline" size={22} color="#1C1B1B" />
            <Text style={styles.menuText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="#6F7A74" />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Ionicons name="lock-closed-outline" size={22} color="#1C1B1B" />
            <Text style={styles.menuText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={20} color="#6F7A74" />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Ionicons name="shield-checkmark-outline" size={22} color="#1C1B1B" />
            <Text style={styles.menuText}>Privacy & Security</Text>
            <Ionicons name="chevron-forward" size={20} color="#6F7A74" />
          </Pressable>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
          
          <View style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={22} color="#1C1B1B" />
            <Text style={styles.menuText}>Push Notifications</Text>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: '#BEC9C3', true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.menuItem}>
            <Ionicons name="mail-outline" size={22} color="#1C1B1B" />
            <Text style={styles.menuText}>Email Notifications</Text>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: '#BEC9C3', true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.menuItem}>
            <Ionicons name="chatbubble-outline" size={22} color="#1C1B1B" />
            <Text style={styles.menuText}>Message Notifications</Text>
            <Switch
              value={messageNotifications}
              onValueChange={setMessageNotifications}
              trackColor={{ false: '#BEC9C3', true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PREFERENCES</Text>
          
          <Pressable style={styles.menuItem}>
            <Ionicons name="language-outline" size={22} color="#1C1B1B" />
            <Text style={styles.menuText}>Language</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>English</Text>
              <Ionicons name="chevron-forward" size={20} color="#6F7A74" />
            </View>
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Ionicons name="location-outline" size={22} color="#1C1B1B" />
            <Text style={styles.menuText}>Default Location</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>Makerere</Text>
              <Ionicons name="chevron-forward" size={20} color="#6F7A74" />
            </View>
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Ionicons name="moon-outline" size={22} color="#1C1B1B" />
            <Text style={styles.menuText}>Dark Mode</Text>
            <Text style={styles.comingSoonText}>Coming Soon</Text>
          </Pressable>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUPPORT</Text>
          
          <Pressable style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={22} color="#1C1B1B" />
            <Text style={styles.menuText}>Help Center</Text>
            <Ionicons name="chevron-forward" size={20} color="#6F7A74" />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Ionicons name="document-text-outline" size={22} color="#1C1B1B" />
            <Text style={styles.menuText}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={20} color="#6F7A74" />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Ionicons name="shield-outline" size={22} color="#1C1B1B" />
            <Text style={styles.menuText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color="#6F7A74" />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Ionicons name="information-circle-outline" size={22} color="#1C1B1B" />
            <Text style={styles.menuText}>About</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>v1.0.0</Text>
              <Ionicons name="chevron-forward" size={20} color="#6F7A74" />
            </View>
          </Pressable>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT ACTIONS</Text>
          
          <Pressable style={styles.menuItem} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color="#EF9F27" />
            <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
            <Ionicons name="chevron-forward" size={20} color="#6F7A74" />
          </Pressable>

          <Pressable style={styles.menuItem} onPress={handleDeleteAccount}>
            <Ionicons name="trash-outline" size={22} color="#EF4444" />
            <Text style={[styles.menuText, styles.deleteText]}>Delete Account</Text>
            <Ionicons name="chevron-forward" size={20} color="#6F7A74" />
          </Pressable>
        </View>

        <View style={{ height: 40 }} />
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
    marginTop: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6F7A74',
    letterSpacing: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E0D8',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#1C1B1B',
    marginLeft: 16,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  valueText: {
    fontSize: 14,
    color: '#6F7A74',
  },
  comingSoonText: {
    fontSize: 12,
    color: '#EF9F27',
    fontWeight: '600',
    backgroundColor: '#FFF4E5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  logoutText: {
    color: '#EF9F27',
    fontWeight: '600',
  },
  deleteText: {
    color: '#EF4444',
    fontWeight: '600',
  },
});
