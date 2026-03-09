import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ExerciseCard = ({ exercise, isFavorite, onToggleFavorite }) => {
    const getDifficultyColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'beginner': return '#2ECC71';
            case 'intermediate': return '#3498DB';
            case 'advanced': return '#E74C3C';
            default: return '#95A5A6';
        }
    };

    const getDifficultyBg = (level) => {
        switch (level?.toLowerCase()) {
            case 'beginner': return '#E8F8F5';
            case 'intermediate': return '#EBF5FB';
            case 'advanced': return '#FDEDEC';
            default: return '#F2F4F4';
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
            case 'Strength': return '#F0F4FF';
            case 'Core': return '#FFF3E0';
            case 'Cardio': return '#FCE4EC';
            default: return '#F3F4F6';
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Strength': return '#4A90E2';
            case 'Core': return '#FF9800';
            case 'Cardio': return '#E91E63';
            default: return '#6B7280';
        }
    };

    return (
        <View style={styles.card}>
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
                            name={isFavorite ? "heart" : "heart"}
                            size={22}
                            color={isFavorite ? "#9B59B6" : "#D1D5DB"}
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
                        <MaterialCommunityIcons name="clock-outline" size={16} color="#9CA3AF" />
                        <Text style={styles.durationText}>{exercise.duration} mins</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
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
        color: '#111827',
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
        color: '#6B7280',
        fontWeight: '600',
        marginLeft: 4,
    },
});

export default ExerciseCard;
