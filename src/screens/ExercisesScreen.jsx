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

const CATEGORIES = [
    { id: 'all', name: 'All', icon: 'apps' },
    { id: 'Strength', name: 'Strength', icon: 'dumbbell' },
    { id: 'Core', name: 'Core', icon: 'shield-check' },
    { id: 'Cardio', name: 'Cardio', icon: 'heart-pulse' },
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
        return state.exercises.filter(exercise => {
            const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [state.exercises, searchQuery, selectedCategory]);

    if (state.loading && state.exercises.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#4A90E2" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation?.goBack()}>
                    <MaterialCommunityIcons name="chevron-left" size={32} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Exercise Library</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <MaterialCommunityIcons name="dots-horizontal" size={24} color="#1A1A1A" />
                </TouchableOpacity>
            </View>

            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.refreshIndicator}>
                    <MaterialCommunityIcons name="chevron-double-down" size={20} color="#4A90E2" />
                    <Text style={styles.refreshText}>PULL TO REFRESH</Text>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchWrapper}>
                        <MaterialCommunityIcons name="magnify" size={24} color="#BDBDBD" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search 500+ exercises..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholderTextColor="#BDBDBD"
                        />
                        <TouchableOpacity style={styles.filterButton}>
                            <MaterialCommunityIcons name="tune-variant" size={22} color="#BDBDBD" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Categories */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryScroll}
                    style={styles.categoryContainer}
                >
                    {CATEGORIES.map(cat => (
                        <TouchableOpacity
                            key={cat.id}
                            onPress={() => setSelectedCategory(cat.id)}
                            style={[
                                styles.categoryChip,
                                selectedCategory === cat.id && styles.activeCategoryChip
                            ]}
                        >
                            <MaterialCommunityIcons
                                name={cat.icon}
                                size={20}
                                color={selectedCategory === cat.id ? '#FFFFFF' : '#757575'}
                            />
                            <Text style={[
                                styles.categoryChipText,
                                selectedCategory === cat.id && styles.activeCategoryChipText
                            ]}>
                                {cat.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Exercise List */}
                <View style={styles.listContainer}>
                    {filteredExercises.length > 0 ? (
                        filteredExercises.map(item => (
                            <ExerciseCard
                                key={item.id}
                                exercise={item}
                                isFavorite={state.favorites.some(f => f.id === item.id)}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))
                    ) : (
                        <View style={styles.noResults}>
                            <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#BDBDBD" />
                            <Text style={styles.noResultsText}>No exercises found</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
        paddingHorizontal: 16,
        height: 60,
    },
    headerButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    refreshIndicator: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    refreshText: {
        fontSize: 10,
        color: '#BDBDBD',
        fontWeight: '600',
        letterSpacing: 1.2,
        marginTop: 4,
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F9FF',
        borderRadius: 16,
        paddingHorizontal: 12,
        height: 56,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1A1A1A',
        fontWeight: '500',
    },
    filterButton: {
        padding: 4,
    },
    categoryContainer: {
        maxHeight: 60,
        marginTop: 20,
    },
    categoryScroll: {
        paddingHorizontal: 20,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F9FF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 25,
        marginRight: 10,
    },
    activeCategoryChip: {
        backgroundColor: '#2ECC71',
    },
    categoryChipText: {
        marginLeft: 8,
        fontSize: 15,
        fontWeight: '600',
        color: '#757575',
    },
    activeCategoryChipText: {
        color: '#FFFFFF',
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    noResults: {
        alignItems: 'center',
        marginTop: 60,
    },
    noResultsText: {
        fontSize: 16,
        color: '#BDBDBD',
        marginTop: 12,
        fontWeight: '600',
    },
});

export default ExercisesScreen;