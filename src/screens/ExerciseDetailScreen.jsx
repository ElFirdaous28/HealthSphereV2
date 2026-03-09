import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchExerciseById } from '../services/api';
import { Colors } from '../constants/Colors';
import { useExercises } from '../context/ExercisesContext';

const ExerciseDetailScreen = ({ route, navigation }) => {
    const { id } = route.params || {};
    const [exercise, setExercise] = useState(null);
    const [loading, setLoading] = useState(true);
    const { state, toggleFavorite } = useExercises();
    
    const isFavorite = state.favorites.some(f => f.id === id);

    useEffect(() => {
        const loadDetail = async () => {
            try {
                const data = await fetchExerciseById(id);
                setExercise(data);
            } catch (err) {
                console.error("Error loading exercise detail:", err);
            } finally {
                setLoading(false);
            }
        };
        loadDetail();
    }, [id]);

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Strength': return Colors.strength;
            case 'Core': return Colors.core;
            case 'Cardio': return Colors.cardio;
            default: return Colors.primary;
        }
    };

    const getCategoryBg = (category) => {
        switch (category) {
            case 'Strength': return Colors.strengthBg;
            case 'Core': return Colors.coreBg;
            case 'Cardio': return Colors.cardioBg;
            default: return Colors.background;
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Strength': return 'dumbbell';
            case 'Core': return 'shield-check';
            case 'Cardio': return 'heart-pulse';
            default: return 'run';
        }
    };

    const getDifficultyColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'beginner': return Colors.beginner;
            case 'intermediate': return Colors.intermediate;
            case 'advanced': return Colors.advanced;
            default: return Colors.textLight;
        }
    };

    const getDifficultyBg = (level) => {
        switch (level?.toLowerCase()) {
            case 'beginner': return Colors.beginnerBg;
            case 'intermediate': return Colors.intermediateBg;
            case 'advanced': return Colors.advancedBg;
            default: return Colors.background;
        }
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!exercise) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Exercise not found</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Hero Header */}
                <View style={[styles.hero, { backgroundColor: getCategoryBg(exercise.category) }]}>
                    <View style={styles.headerButtons}>
                        <TouchableOpacity 
                            style={styles.backButton} 
                            onPress={() => navigation.goBack()}
                        >
                            <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.text} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.favoriteButton}
                            onPress={() => toggleFavorite(exercise)}
                        >
                            <MaterialCommunityIcons 
                                name={isFavorite ? "heart" : "heart-outline"} 
                                size={24} 
                                color={isFavorite ? Colors.accent : Colors.textLight} 
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.heroContent}>
                        <View style={[styles.iconCircle, { backgroundColor: Colors.white }]}>
                            <MaterialCommunityIcons 
                                name={getCategoryIcon(exercise.category)} 
                                size={32} 
                                color={getCategoryColor(exercise.category)} 
                            />
                        </View>
                        <Text style={[styles.title, { color: Colors.text }]}>{exercise.name}</Text>
                        <Text style={[styles.category, { color: getCategoryColor(exercise.category) }]}>{exercise.category}</Text>
                    </View>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    {/* Stats Cards */}
                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <MaterialCommunityIcons name="clock-outline" size={20} color={Colors.primary} />
                            <Text style={styles.statValue}>{exercise.duration}</Text>
                            <Text style={styles.statLabel}>Minutes</Text>
                        </View>
                        <View style={styles.statCard}>
                            <MaterialCommunityIcons name="fire" size={20} color={Colors.accent} />
                            <Text style={styles.statValue}>{exercise.duration * 8}</Text>
                            <Text style={styles.statLabel}>Calories</Text>
                        </View>
                        <View style={[styles.statCard, { backgroundColor: getDifficultyBg(exercise.difficulty) }]}>
                            <MaterialCommunityIcons name="trending-up" size={20} color={getDifficultyColor(exercise.difficulty)} />
                            <Text style={[styles.statValue, { color: getDifficultyColor(exercise.difficulty) }]}>
                                {exercise.difficulty}
                            </Text>
                            <Text style={[styles.statLabel, { color: getDifficultyColor(exercise.difficulty) }]}>Level</Text>
                        </View>
                    </View>

                    {/* Description Card */}
                    <View style={styles.descriptionCard}>
                        <Text style={styles.sectionTitle}>About this exercise</Text>
                        <Text style={styles.description}>{exercise.description}</Text>
                    </View>

                    {/* Start Button */}
                    <TouchableOpacity style={styles.startButton}>
                        <Text style={styles.startButtonText}>Start Workout</Text>
                        <MaterialCommunityIcons name="arrow-right" size={20} color={Colors.white} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    errorText: {
        fontSize: 16,
        color: Colors.textLight,
    },
    hero: {
        paddingTop: 12,
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    favoriteButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    heroContent: {
        alignItems: 'center',
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center',
    },
    category: {
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    content: {
        padding: 20,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    statCard: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        shadowOpacity: 0.05,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
        marginTop: 8,
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: Colors.textLight,
    },
    descriptionCard: {
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: Colors.textLight,
    },
    startButton: {
        backgroundColor: Colors.primary,
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    startButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '700',
    },
});

export default ExerciseDetailScreen;
