import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const SettingsScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  const SettingItem = ({ icon: Icon, label, value, onToggle, isToggle, onPress }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={isToggle}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{Icon}</Text>
        </View>
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      {isToggle ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#E0E0E0', true: '#9C27B0' }}
          thumbColor="#FFFFFF"
        />
      ) : (
        <Text style={styles.chevron}>›</Text>
      )}
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?u=alex' }}
              style={styles.avatar}
            />
            <View style={styles.statusDot} />
          </View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>Alex Johnson</Text>
            <Text style={styles.profileSub}>Pro Member • Level 24</Text>
          </View>
        </View>

        {/* Display & Sound Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DISPLAY & SOUND</Text>
          <SettingItem
            icon="🌙"
            label="Dark Mode"
            isToggle
            value={isDarkMode}
            onToggle={setIsDarkMode}
          />
          <SettingItem
            icon="🔔"
            label="Push Notifications"
            isToggle
            value={pushNotifications}
            onToggle={setPushNotifications}
          />
        </View>

        {/* Account & Data Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT & DATA</Text>
          <SettingItem
            icon="👤"
            label="Profile Details"
            onPress={() => { }}
          />
          <SettingItem
            icon="🏋️"
            label="Fitness Goals"
            onPress={() => { }}
          />
        </View>

        {/* Sync Button */}
        <TouchableOpacity style={styles.syncButton}>
          <Text style={styles.syncIcon}>🔄</Text>
          <Text style={styles.syncButtonText}>Synchronize Data</Text>
        </TouchableOpacity>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <View style={styles.versionBadge}>
            <Text style={styles.versionInfoIcon}>ℹ️</Text>
            <Text style={styles.versionText}>App Version 1.0.1</Text>
          </View>
        </View>

        {/* Log Out */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    height: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 32,
    color: '#9C27B0',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F9FF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#F7F9FF',
  },
  profileTextContainer: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  profileSub: {
    fontSize: 14,
    color: '#757575',
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9E9E9E',
    letterSpacing: 1.2,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3E5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  chevron: {
    fontSize: 24,
    color: '#BDBDBD',
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#9C27B0',
    marginBottom: 32,
    marginTop: 8,
  },
  syncIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#9C27B0',
  },
  syncButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#9C27B0',
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  versionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  versionInfoIcon: {
    fontSize: 12,
    marginRight: 6,
    color: '#90A4AE',
  },
  versionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#90A4AE',
  },
  logoutButton: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF5252',
  },
});

export default SettingsScreen;

