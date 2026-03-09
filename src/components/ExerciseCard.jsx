import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/Colors';

const ExerciseCard = ({ exercise, isFavorite, onToggleFavorite }) => {
    const navigation = useNavigation();

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

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Strength': return 'dumbbell';
            case 'Core': return 'shield-check';
            case 'Cardio': return 'heart-pulse';
            default: return 'run';
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

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Strength': return Colors.strength;
            case 'Core': return Colors.core;
            case 'Cardio': return Colors.cardio;
            default: return Colors.textLight;
        }
    };

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ExerciseDetail', { id: exercise.id, name: exercise.name })}
        >
            <View style={[styles.iconContainer, { backgroundColor: getCategoryBg(exercise.category) }]}>
                <MaterialCommunityIcons
                    name={getCategoryIcon(exercise.category)}
                    size={40}
                    color={getCategoryColor(exercise.category)}
                />
            </View>

            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.exerciseName} numberOfLines={2}>{exercise.name}</Text>
                    <TouchableOpacity onPress={() => onToggleFavorite(exercise)} style={styles.favoriteButton}>
                        <MaterialCommunityIcons
                            name={isFavorite ? "heart" : "heart-outline"}
                            size={22}
                            color={isFavorite ? Colors.primary : Colors.border}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyBg(exercise.difficulty) }]}>
                        <Text style={[styles.difficultyText, { color: getDifficultyColor(exercise.difficulty) }]}>
                            {exercise.difficulty?.toUpperCase()}
                        </Text>
                    </View>

                    <View style={styles.durationContainer}>
                        <MaterialCommunityIcons name="clock-outline" size={16} color={Colors.textLight} />
                        <Text style={styles.durationText}>{exercise.duration} mins</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 24,
        padding: 12,
        marginBottom: 16,
        alignItems: 'center',
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        flex: 1,
        marginLeft: 16,
        height: 100,
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    exerciseName: {
        fontSize: 17,
        fontWeight: '700',
        color: Colors.text,
        flex: 1,
        marginRight: 8,
        lineHeight: 22,
    },
    favoriteButton: {
        padding: 4,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    difficultyBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
    },
    difficultyText: {
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    durationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    durationText: {
        fontSize: 13,
        color: Colors.textLight,
        fontWeight: '600',
        marginLeft: 4,
    },
});

export default ExerciseCard;
