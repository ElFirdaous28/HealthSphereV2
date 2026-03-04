import { StyleSheet, Text, View, FlatList, Button, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useExercises } from '../context/ExercisesContext';

const ExercisesScreen = () => {
    const { state, loadExercises, toggleFavorite } = useExercises();
    const { exercises, loading } = state;

    useEffect(() => {
        loadExercises();
    }, []);

    if (loading && exercises.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    if (exercises.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <Text>No exercises available</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>ExercisesScreen</Text>
            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.exerciseItem}>
                        <Text style={styles.exerciseName}>{item.name}</Text>
                        <Button title="Toggle Favorite" onPress={() => toggleFavorite(item)} />
                    </View>
                )}
            />
        </View>
    )
}

export default ExercisesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 16,
    },
    exerciseItem: {
        backgroundColor: '#fff',
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    exerciseName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
})