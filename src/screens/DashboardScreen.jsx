import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import { useExercises } from '../context/ExercisesContext';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
    const { user } = useUser();
    const { state: exercisesState } = useExercises();

    const StatCard = ({ icon, label, value, unit, color }) => (
        <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: `${color}15` }]}>
                <MaterialCommunityIcons name={icon} size={24} color={color} />
            </View>
            <View>
                <Text style={styles.statLabel}>{label}</Text>
                <View style={styles.statValueContainer}>
                    <Text style={styles.statValue}>{value}</Text>
                    <Text style={styles.statUnit}>{unit}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Header Section */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Welcome back,</Text>
                        <Text style={styles.userName}>{user.name} 👋</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.profileButton}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <MaterialCommunityIcons name="account-circle" size={40} color="#9B59B6" />
                    </TouchableOpacity>
                </View>

                {/* Main Stats Grid */}
                <View style={styles.statsGrid}>
                    <StatCard
                        icon="fire"
                        label="Calories"
                        value={user.stats.calories}
                        unit="kcal"
                        color="#FF6B6B"
                    />
                    <StatCard
                        icon="timer-outline"
                        label="Active"
                        value={user.stats.activeMinutes}
                        unit="min"
                        color="#4ECDC4"
                    />
                    <StatCard
                        icon="walk"
                        label="Steps"
                        value={user.stats.steps}
                        unit="steps"
                        color="#45B7D1"
                    />
                    <StatCard
                        icon="arm-flex"
                        label="Workouts"
                        value={user.stats.workouts}
                        unit="total"
                        color="#9B59B6"
                    />
                </View>

                {/* Progress Card */}
                <View style={styles.progressSection}>
                    <Text style={styles.sectionTitle}>Level Progress</Text>
                    <View style={styles.progressCard}>
                        <View style={styles.progressHeader}>
                            <Text style={styles.levelText}>Level {user.level}</Text>
                            <Text style={styles.xpText}>{user.xp} / {user.nextLevelXp} XP</Text>
                        </View>
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: `${(user.xp / user.nextLevelXp) * 100}%` }]} />
                        </View>
                    </View>
                </View>

                {/* Featured Exercises */}
                <View style={styles.featuredSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Featured Exercises</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Exercises')}>
                            <Text style={styles.viewAll}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                        {exercisesState.exercises.slice(0, 5).map((ex) => (
                            <TouchableOpacity
                                key={ex.id}
                                style={styles.featuredCard}
                                onPress={() => navigation.navigate('Exercises')}
                            >
                                <View style={styles.featuredIconContainer}>
                                    <MaterialCommunityIcons name="dumbbell" size={24} color="#9B59B6" />
                                </View>
                                <Text style={styles.featuredName} numberOfLines={1}>{ex.name}</Text>
                                <Text style={styles.featuredCategory}>{ex.category}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FE',
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
    greeting: {
        fontSize: 16,
        color: '#7F8C8D',
        fontWeight: '500',
    },
    userName: {
        fontSize: 24,
        fontWeight: '800',
        color: '#2C3E50',
    },
    profileButton: {
        padding: 2,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    statCard: {
        width: (width - 60) / 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    statIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    statLabel: {
        fontSize: 12,
        color: '#95A5A6',
        fontWeight: '600',
        marginBottom: 2,
    },
    statValueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    statValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2C3E50',
    },
    statUnit: {
        fontSize: 10,
        color: '#95A5A6',
        marginLeft: 2,
    },
    progressSection: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 16,
    },
    progressCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    levelText: {
        fontWeight: '700',
        color: '#2C3E50',
    },
    xpText: {
        fontSize: 12,
        color: '#95A5A6',
    },
    progressBarBg: {
        height: 8,
        backgroundColor: '#F1F2F6',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#9B59B6',
        borderRadius: 4,
    },
    featuredSection: {
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    viewAll: {
        color: '#9B59B6',
        fontWeight: '600',
    },
    horizontalScroll: {
        marginLeft: -20,
        paddingLeft: 20,
    },
    featuredCard: {
        width: 140,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    featuredIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F4ECF7',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    featuredName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 4,
    },
    featuredCategory: {
        fontSize: 12,
        color: '#95A5A6',
    },
});

export default DashboardScreen;