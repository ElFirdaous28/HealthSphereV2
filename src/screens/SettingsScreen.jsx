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
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import { Colors } from '../constants/Colors';

const SettingsScreen = ({ navigation }) => {
  const { user, loading } = useUser();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  if (loading || !user) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading Settings...</Text>
      </View>
    );
  }

  const SettingItem = ({ icon, label, value, onToggle, isToggle, onPress, color = Colors.primary }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={isToggle}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
          <MaterialCommunityIcons name={icon} size={22} color={color} />
        </View>
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      {isToggle ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: Colors.border, true: Colors.primary }}
          thumbColor={Colors.white}
        />
      ) : (
        <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.border} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Premium Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation?.goBack()}
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color={Colors.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Settings</Text>

        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card Summary */}
        <TouchableOpacity
          style={styles.profileCard}
          onPress={() => navigation?.navigate('Profile')}
        >
          <Image
            source={{ uri: user.avatar }}
            style={styles.avatar}
          />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileSub}> {user.email}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.textLight} />
        </TouchableOpacity>

        {/* Display & Sound Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>APPEARANCE & NOTIFICATIONS</Text>
          <SettingItem
            icon="weather-night"
            label="Dark Mode"
            isToggle
            value={isDarkMode}
            onToggle={setIsDarkMode}
          />
          <SettingItem
            icon="bell-outline"
            label="Push Notifications"
            isToggle
            value={pushNotifications}
            onToggle={setPushNotifications}
          />
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <SettingItem
            icon="account-outline"
            label="Profile Details"
            onPress={() => navigation?.navigate('Profile')}
          />
          <SettingItem
            icon="shield-check-outline"
            label="Privacy & Security"
            onPress={() => { }}
          />
          <SettingItem
            icon="help-circle-outline"
            label="Help & Support"
            onPress={() => { }}
          />
        </View>

        {/* Log Out */}
        <TouchableOpacity style={styles.logoutButton}>
          <MaterialCommunityIcons name="logout" size={20} color={Colors.accent} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* version */}
        <Text style={styles.versionText}>HealthSphere V2 • Version 1.2.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 80,
    backgroundColor: Colors.white,
  },
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  placeholder: {
    width: 44,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 24,
    marginBottom: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  profileTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  profileSub: {
    fontSize: 13,
    color: Colors.textLight,
    marginTop: 2,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textLight,
    letterSpacing: 1.5,
    marginBottom: 16,
    marginLeft: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.advancedBg,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.accent,
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 32,
    fontWeight: '500',
  },
});

export default SettingsScreen;
