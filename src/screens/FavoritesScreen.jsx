import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useExercises } from '../context/ExercisesContext';
import ExerciseCard from '../components/ExerciseCard';
import { Colors } from '../constants/Colors';

const FavoritesScreen = ({ navigation }) => {
    const { state, toggleFavorite } = useExercises();

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="heart-outline" size={80} color={Colors.border} />
            <Text style={styles.emptyTitle}>Aucun favori</Text>
            <Text style={styles.emptyText}>
                Les exercices que vous aimez apparaîtront ici
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <FlatList
                data={state.favorites}
                renderItem={({ item }) => (
                    <ExerciseCard
                        exercise={item}
                        isFavorite={true}
                        onToggleFavorite={toggleFavorite}
                    />
                )}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={renderEmpty}
                contentContainerStyle={styles.listContainer}
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
    listContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
        flexGrow: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        marginTop: 100,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.text,
        marginTop: 20,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 15,
        color: Colors.textLight,
        textAlign: 'center',
        lineHeight: 22,
    },
});

export default FavoritesScreen;
