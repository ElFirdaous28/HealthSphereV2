import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';

const ProfileScreen = ({ navigation }) => {
    const { user } = useUser();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.screenTitle}>My Profile</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <MaterialCommunityIcons name="cog-outline" size={24} color="#2C3E50" />
                    </TouchableOpacity>
                </View>

                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150?u=alex' }}
                            style={styles.avatar}
                        />
                        <View style={styles.levelBadge}>
                            <Text style={styles.levelText}>{user.level ?? 0}</Text>
                        </View>
                    </View>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.memberStatus}>Pro Member</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{user.stats?.workouts ?? 0}</Text>
                        <Text style={styles.statLabel}>Workouts</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{user.stats?.activeMinutes ?? 0}</Text>
                        <Text style={styles.statLabel}>Hours</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{user.stats?.calories ?? 0}</Text>
                        <Text style={styles.statLabel}>Kcal</Text>
                    </View>
                </View>

                <View style={styles.menuSection}>
                    <TouchableOpacity style={styles.menuItem}>
                        <View style={[styles.menuIcon, { backgroundColor: '#EBF5FF' }]}>
                            <MaterialCommunityIcons name="history" size={22} color="#007AFF" />
                        </View>
                        <Text style={styles.menuLabel}>Activity History</Text>
                        <MaterialCommunityIcons name="chevron-right" size={24} color="#BDBDBD" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={[styles.menuIcon, { backgroundColor: '#F0FFF4' }]}>
                            <MaterialCommunityIcons name="medal" size={22} color="#38A169" />
                        </View>
                        <Text style={styles.menuLabel}>Achievements</Text>
                        <MaterialCommunityIcons name="chevron-right" size={24} color="#BDBDBD" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={[styles.menuIcon, { backgroundColor: '#FFF5F5' }]}>
                            <MaterialCommunityIcons name="heart-outline" size={22} color="#E53E3E" />
                        </View>
                        <Text style={styles.menuLabel}>My Favorites</Text>
                        <MaterialCommunityIcons name="chevron-right" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#2C3E50',
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#F8F9FE',
    },
    levelBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#9B59B6',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    levelText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 4,
    },
    memberStatus: {
        fontSize: 14,
        color: '#95A5A6',
        fontWeight: '500',
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#F8F9FE',
        borderRadius: 20,
        padding: 20,
        marginBottom: 30,
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: '800',
        color: '#2C3E50',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#95A5A6',
        fontWeight: '600',
    },
    statDivider: {
        width: 1,
        height: '100%',
        backgroundColor: '#E0E0E0',
    },
    menuSection: {
        backgroundColor: '#FFFFFF',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F8F9FE',
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuLabel: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#2C3E50',
    },
})