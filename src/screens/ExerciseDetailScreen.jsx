import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fetchExerciseById } from '../services/api';
import { Colors } from '../constants/Colors';

const ExerciseDetailScreen = ({ route, navigation }) => {
    const { id, name } = route.params || {};
    const [exercise, setExercise] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const getDifficultyColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'beginner': return Colors.beginner;
            case 'intermediate': return Colors.intermediate;
            case 'advanced': return Colors.advanced;
            default: return Colors.white;
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Strength': return Colors.strength;
            case 'Core': return Colors.core;
            case 'Cardio': return Colors.cardio;
            default: return Colors.primary;
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
                <Text>Exercise not found</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Hero Header */}
                <View style={[styles.heroContainer, { backgroundColor: getCategoryColor(exercise.category) }]}>
                    <View style={styles.imageOverlay} />
                    <View style={styles.headerNav}>
                        <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons name="chevron-left" size={30} color={Colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navButton}>
                            <MaterialCommunityIcons name="heart-outline" size={26} color={Colors.white} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.heroContent}>
                        <View style={styles.badge}>
                            <Text style={[styles.badgeText, { color: getCategoryColor(exercise.category) }]}>
                                {exercise.category}
                            </Text>
                        </View>
                        <Text style={styles.title}>{exercise.name}</Text>
                        <View style={styles.metaRow}>
                            <View style={styles.metaItem}>
                                <MaterialCommunityIcons name="clock-outline" size={18} color={Colors.white} />
                                <Text style={styles.metaText}>{exercise.duration} mins</Text>
                            </View>
                            <View style={styles.metaDivider} />
                            <View style={styles.metaItem}>
                                <MaterialCommunityIcons name="trending-up" size={18} color={getDifficultyColor(exercise.difficulty)} />
                                <Text style={[styles.metaText, { color: getDifficultyColor(exercise.difficulty) }]}>
                                    {exercise.difficulty}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>{exercise.description}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Benefits</Text>
                        <View style={styles.benefitsRow}>
                            {['Muscle Growth', 'Fat Burn', 'Better Posture'].map((b, i) => (
                                <View key={i} style={styles.benefitTag}>
                                    <Text style={styles.benefitTagText}>{b}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <TouchableOpacity style={styles.startButton}>
                        <Text style={styles.startButtonText}>Start Workout</Text>
                        <MaterialCommunityIcons name="play-circle" size={24} color={Colors.white} />
                    </TouchableOpacity>
                </View>
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
    heroContainer: {
        height: 350,
        justifyContent: 'flex-end',
        padding: 20,
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    headerNav: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    navButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroContent: {
        zIndex: 5,
    },
    badge: {
        backgroundColor: Colors.white,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    badgeText: {
        fontWeight: '800',
        fontSize: 12,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: Colors.white,
        marginBottom: 12,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
    },
    metaDivider: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginHorizontal: 12,
    },
    content: {
        padding: 24,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: Colors.white,
        marginTop: -30,
        flex: 1,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: Colors.textLight,
        fontWeight: '500',
    },
    benefitsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    benefitTag: {
        backgroundColor: Colors.background,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 14,
        marginRight: 10,
        marginBottom: 10,
    },
    benefitTagText: {
        color: Colors.primary,
        fontWeight: '700',
        fontSize: 13,
    },
    startButton: {
        backgroundColor: Colors.primary,
        height: 64,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    startButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '800',
        marginRight: 10,
    },
});

export default ExerciseDetailScreen;
