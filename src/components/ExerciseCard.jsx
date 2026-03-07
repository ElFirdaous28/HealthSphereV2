import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ExerciseCard = ({ exercise, isFavorite, onToggleFavorite }) => {
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Strength': return 'dumbbell';
            case 'Core': return 'shield-check';
            case 'Cardio': return 'heart-pulse';
            default: return 'run';
        }
    };

    const getDifficultyColor = (level) => {
        switch (level) {
            case 'Beginner': return '#4CAF50';
            case 'Intermediate': return '#FF9800';
            case 'Advanced': return '#F44336';
            default: return '#757575';
        }
    };

    return (
        <View style={styles.card}>
            <View style={[styles.cardIconContainer, { backgroundColor: '#F0F4FF' }]}>
                <MaterialCommunityIcons name={getCategoryIcon(exercise.category)} size={32} color="#4A90E2" />
            </View>

            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <TouchableOpacity onPress={() => onToggleFavorite(exercise)}>
                        <MaterialCommunityIcons
                            name={isFavorite ? "heart" : "heart-outline"}
                            size={24}
                            color={isFavorite ? "#E91E63" : "#BDBDBD"}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.badgeContainer}>
                    <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(exercise.difficulty) + '15' }]}>
                        <Text style={[styles.difficultyText, { color: getDifficultyColor(exercise.difficulty) }]}>
                            {exercise.difficulty.toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.durationContainer}>
                        <MaterialCommunityIcons name="clock-outline" size={14} color="#9E9E9E" />
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
        borderRadius: 20,
        padding: 12,
        marginBottom: 16,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        // Elevation for Android
        elevation: 4,
    },
    cardIconContainer: {
        width: 100,
        height: 100,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1A1A1A',
        flex: 1,
        marginRight: 8,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    difficultyBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginRight: 12,
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
        color: '#9E9E9E',
        fontWeight: '600',
        marginLeft: 4,
    },
});

export default ExerciseCard;
