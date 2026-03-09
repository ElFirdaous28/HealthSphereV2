import React, { useMemo } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
    Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import { useExercises } from '../context/ExercisesContext';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
    const { user, loading: userLoading } = useUser();
    const { state: exercisesState } = useExercises();

    const stats = useMemo(() => {
        const total = exercisesState.exercises?.length || 0;
        const favorites = exercisesState.favorites?.length || 0;
        return { total, favorites };
    }, [exercisesState.exercises, exercisesState.favorites]);

    const recommendedExercises = useMemo(() => {
        if (!exercisesState.exercises) return [];
        return exercisesState.exercises.slice(0, 4);
    }, [exercisesState.exercises]);

    if (userLoading || !user) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.loadingText}>Loading Dashboard...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Header Section */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greetingHeader}>Content de vous revoir,</Text>
                        <Text style={styles.userNameText}>{user.name} ✨</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Profile')}
                        style={styles.avatarBorder}
                    >
                        <Image
                            source={{ uri: user.avatar }}
                            style={styles.avatarImg}
                        />
                    </TouchableOpacity>
                </View>

                {/* Main Stats Card */}
                <View style={styles.mainStatsCard}>
                    <View style={styles.statsInfo}>
                        <Text style={styles.statsLabel}>Votre Progression</Text>
                        <Text style={styles.statsTitle}>Niveau {user.level || 1}</Text>

                        <View style={styles.xpBarContainer}>
                            <View style={[styles.xpBarFill, { width: `${(user.xp / user.nextLevelXp) * 100}%` }]} />
                        </View>
                        <Text style={styles.xpText}>{user.xp} / {user.nextLevelXp} XP</Text>
                    </View>
                    <View style={styles.xpBadge}>
                        <MaterialCommunityIcons name="trophy" size={32} color={Colors.white} />
                    </View>
                </View>

                {/* Exercise Summary Grid */}
                <View style={styles.summaryGrid}>
                    <View style={[styles.summaryCard, { backgroundColor: Colors.intermediateBg }]}>
                        <View style={[styles.summaryIconBox, { backgroundColor: Colors.intermediate }]}>
                            <MaterialCommunityIcons name="dumbbell" size={24} color={Colors.white} />
                        </View>
                        <Text style={styles.summaryValue}>{stats.total}</Text>
                        <Text style={styles.summaryLabel}>Exercices</Text>
                    </View>

                    <View style={[styles.summaryCard, { backgroundColor: Colors.advancedBg }]}>
                        <View style={[styles.summaryIconBox, { backgroundColor: Colors.advanced }]}>
                            <MaterialCommunityIcons name="heart" size={24} color={Colors.white} />
                        </View>
                        <Text style={styles.summaryValue}>{stats.favorites}</Text>
                        <Text style={styles.summaryLabel}>Favoris</Text>
                    </View>
                </View>

                {/* Recommended Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recommandés pour vous</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Exercises')}>
                        <Text style={styles.seeAllBtn}>Voir tout</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.recommendedList}>
                    {recommendedExercises.map((exercise) => (
                        <TouchableOpacity
                            key={exercise.id}
                            style={styles.exerciseRow}
                            onPress={() => navigation.navigate('ExerciseDetail', { id: exercise.id, name: exercise.name })}
                        >
                            <View style={[styles.exerciseIcon, { backgroundColor: Colors.statusBg }]}>
                                <MaterialCommunityIcons name="lightning-bolt" size={20} color={Colors.secondary} />
                            </View>
                            <View style={styles.exerciseInfo}>
                                <Text style={styles.exerciseName}>{exercise.name}</Text>
                                <Text style={styles.exerciseCategory}>{exercise.category} • {exercise.difficulty}</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.border} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Daily Activity Quote or Extra Info */}
                <View style={styles.quoteCard}>
                    <MaterialCommunityIcons name="format-quote-open" size={24} color={Colors.primary} />
                    <Text style={styles.quoteText}>
                        "La seule mauvaise séance d'entraînement est celle que vous n'avez pas faite."
                    </Text>
                </View>

                <View style={{ height: 30 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgLight || '#F8F9FE',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: Colors.textLight,
        fontWeight: '600',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    greetingHeader: {
        fontSize: 14,
        color: Colors.textLight,
        fontWeight: '600',
    },
    userNameText: {
        fontSize: 24,
        fontWeight: '900',
        color: Colors.text,
    },
    avatarBorder: {
        padding: 2,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    avatarImg: {
        width: 46,
        height: 46,
        borderRadius: 23,
    },
    mainStatsCard: {
        backgroundColor: Colors.primary,
        borderRadius: 24,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        elevation: 8,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
    },
    statsInfo: {
        flex: 1,
    },
    statsLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    statsTitle: {
        color: Colors.white,
        fontSize: 24,
        fontWeight: '900',
        marginVertical: 4,
    },
    xpBarContainer: {
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 4,
        marginVertical: 10,
        overflow: 'hidden',
    },
    xpBarFill: {
        height: '100%',
        backgroundColor: Colors.white,
    },
    xpText: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 12,
        fontWeight: '600',
    },
    xpBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
    summaryGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    summaryCard: {
        width: (width - 60) / 2,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    summaryIconBox: {
        width: 44,
        height: 44,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    summaryValue: {
        fontSize: 22,
        fontWeight: '900',
        color: Colors.text,
    },
    summaryLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: Colors.textLight,
        marginTop: 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: Colors.text,
    },
    seeAllBtn: {
        fontSize: 13,
        fontWeight: '800',
        color: Colors.primary,
    },
    recommendedList: {
        marginBottom: 25,
    },
    exerciseRow: {
        backgroundColor: Colors.white,
        borderRadius: 18,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    exerciseIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    exerciseInfo: {
        flex: 1,
    },
    exerciseName: {
        fontSize: 15,
        fontWeight: '800',
        color: Colors.text,
    },
    exerciseCategory: {
        fontSize: 12,
        color: Colors.textLight,
        fontWeight: '600',
        marginTop: 2,
    },
    quoteCard: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 20,
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
        marginBottom: 10,
    },
    quoteText: {
        fontSize: 14,
        fontStyle: 'italic',
        color: Colors.text,
        lineHeight: 20,
        marginTop: 5,
        fontWeight: '500',
    },
});

export default DashboardScreen;