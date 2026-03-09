import React, { useState, useEffect, useMemo } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    FlatList,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
    RefreshControl,
    ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useExercises } from '../context/ExercisesContext';
import ExerciseCard from '../components/ExerciseCard';
import { Colors } from '../constants/Colors';

const CATEGORIES = [
    { id: 'all', name: 'All' },
    { id: 'Strength', name: 'Strength' },
    { id: 'Core', name: 'Core' },
    { id: 'Cardio', name: 'Cardio' },
];

const ExercisesScreen = ({ navigation }) => {
    const { state, loadExercises, toggleFavorite } = useExercises();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadExercises();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadExercises();
        setRefreshing(false);
    };

    const filteredExercises = useMemo(() => {
        if (!state.exercises) return [];
        return state.exercises.filter(exercise => {
            const exerciseName = (exercise.name || '').toLowerCase();
            const searchTerms = searchQuery.toLowerCase().trim();
            const matchesSearch = exerciseName.includes(searchTerms);

            const exerciseCategory = exercise.category || '';
            const matchesCategory = selectedCategory === 'all' || exerciseCategory === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [state.exercises, searchQuery, selectedCategory]);

    const renderHeader = () => (
        <View style={styles.listHeader}>
            {/* Search Bar */}
            <View style={styles.searchSection}>
                <View style={styles.searchWrapper}>
                    <MaterialCommunityIcons name="magnify" size={22} color={Colors.textLight} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search exercises, muscles..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor={Colors.textLight}
                    />
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.filterBarButton}>
                        <MaterialCommunityIcons name="tune-variant" size={20} color={Colors.textLight} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Categories */}
            <View style={styles.categoryContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryScroll}
                >
                    {CATEGORIES.map(cat => (
                        <TouchableOpacity
                            key={cat.id}
                            onPress={() => setSelectedCategory(cat.id)}
                            style={styles.categoryTab}
                        >
                            <Text style={[
                                styles.categoryTabText,
                                selectedCategory === cat.id && styles.activeCategoryTabText
                            ]}>
                                {cat.name}
                            </Text>
                            {selectedCategory === cat.id && <View style={styles.activeIndicator} />}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );

    const renderEmpty = () => (
        <View style={styles.noResults}>
            <MaterialCommunityIcons name="alert-circle-outline" size={48} color={Colors.border} />
            <Text style={styles.noResultsText}>No exercises found</Text>
        </View>
    );

    if (state.loading && state.exercises.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Top Bar Navigation */}
            <View style={styles.topNav}>
                <TouchableOpacity
                    style={styles.circleButton}
                    onPress={() => navigation?.goBack()}
                >
                    <MaterialCommunityIcons name="chevron-left" size={28} color={Colors.text} />
                </TouchableOpacity>

                <Text style={styles.topNavTitle}>Exercise Library</Text>

                <TouchableOpacity style={styles.circleButton}>
                    <MaterialCommunityIcons name="dots-horizontal" size={24} color={Colors.text} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredExercises}
                renderItem={({ item }) => (
                    <ExerciseCard
                        exercise={item}
                        isFavorite={state.favorites.some(f => f.id === item.id)}
                        onToggleFavorite={toggleFavorite}
                    />
                )}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={renderEmpty}
                contentContainerStyle={styles.listContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[Colors.primary]}
                        tintColor={Colors.primary}
                    />
                }
                showsVerticalScrollIndicator={false}
            />
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
    },
    topNav: {
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
        // Shadow for premium look
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    topNavTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: Colors.text,
    },
    listHeader: {
        paddingTop: 10,
        backgroundColor: Colors.white,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        marginBottom: 20,
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    searchSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background,
        borderRadius: 18,
        paddingHorizontal: 16,
        height: 52,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: Colors.text,
        fontWeight: '500',
    },
    divider: {
        width: 1,
        height: 20,
        backgroundColor: Colors.border,
        marginHorizontal: 12,
    },
    filterBarButton: {
        padding: 4,
    },
    categoryContainer: {
        marginBottom: 10,
    },
    categoryScroll: {
        paddingHorizontal: 20,
    },
    categoryTab: {
        marginRight: 30,
        paddingVertical: 12,
        alignItems: 'center',
        minWidth: 40,
    },
    categoryTabText: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.textLight,
    },
    activeCategoryTabText: {
        color: Colors.text,
        fontWeight: '800',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 4,
        width: 20,
        height: 3,
        backgroundColor: Colors.primary,
        borderRadius: 2,
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    noResults: {
        alignItems: 'center',
        marginTop: 60,
    },
    noResultsText: {
        fontSize: 16,
        color: Colors.textLight,
        marginTop: 12,
        fontWeight: '600',
    },
});

export default ExercisesScreen;
