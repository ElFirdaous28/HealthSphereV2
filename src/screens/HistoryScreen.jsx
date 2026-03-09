import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useExercises } from '../context/ExercisesContext';
import HistoryCard from '../components/HistoryCard';

const HistoryScreen = ({ navigation }) => {
    const { state, loadHistory } = useExercises();
    const [viewMode, setViewMode] = useState('list');

    useEffect(() => {
        loadHistory();
    }, []);

    const formatDate = (value) => {
        if (!value) return '--/--/----';

        // If day is stored as YYYY-MM-DD, format directly without timezone shift.
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
            const [year, month, day] = value.split('-');
            return `${day}/${month}/${year}`;
        }

        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return String(value);
        return date.toLocaleDateString();
    };

    const formatTime = (value) => {
        if (!value) return '--:--';
        const date = new Date(value);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="history" size={68} color={Colors.border} />
            <Text style={styles.emptyTitle}>No history yet</Text>
            <Text style={styles.emptyText}>Start an exercise and it will appear here.</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.screenTitle}>History</Text>
                <View style={styles.modeSwitch}>
                    <TouchableOpacity
                        style={[styles.modeButton, viewMode === 'list' && styles.activeModeButton]}
                        onPress={() => setViewMode('list')}
                    >
                        <MaterialCommunityIcons
                            name="format-list-bulleted"
                            size={18}
                            color={viewMode === 'list' ? Colors.white : Colors.textLight}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.modeButton, viewMode === 'card' && styles.activeModeButton]}
                        onPress={() => setViewMode('card')}
                    >
                        <MaterialCommunityIcons
                            name="view-grid"
                            size={18}
                            color={viewMode === 'card' ? Colors.white : Colors.textLight}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                key={viewMode}
                data={state.history}
                keyExtractor={(item, index) => String(item.id || `${item.exerciseId}-${index}`)}
                contentContainerStyle={styles.listContainer}
                numColumns={viewMode === 'card' ? 2 : 1}
                columnWrapperStyle={viewMode === 'card' ? styles.cardColumns : undefined}
                ListEmptyComponent={renderEmpty}
                renderItem={({ item }) => (
                    <HistoryCard
                        item={item}
                        viewMode={viewMode}
                        onPress={() => navigation.navigate('ExerciseDetail', { id: item.exerciseId })}
                        formatDate={formatDate}
                        formatTime={formatTime}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default HistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    headerRow: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    screenTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: Colors.text,
    },
    modeSwitch: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: 3,
    },
    modeButton: {
        width: 34,
        height: 34,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeModeButton: {
        backgroundColor: Colors.primary,
    },
    listContainer: {
        padding: 20,
        flexGrow: 1,
    },
    cardColumns: {
        justifyContent: 'space-between',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    emptyTitle: {
        marginTop: 12,
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
    },
    emptyText: {
        marginTop: 6,
        fontSize: 14,
        color: Colors.textLight,
        textAlign: 'center',
    },
});