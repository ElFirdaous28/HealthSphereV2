import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const HistoryCard = ({ item, viewMode = 'list', onPress, formatDate, formatTime }) => {
    const isCardMode = viewMode === 'card';

    return (
        <TouchableOpacity
            style={isCardMode ? styles.cardItem : styles.row}
            onPress={onPress}
        >
            <View style={isCardMode ? styles.cardTopRow : styles.leftIcon}>
                <MaterialCommunityIcons name="check-circle" size={22} color={Colors.secondary} />
                {isCardMode && (
                    <Text style={styles.cardDate}>{formatDate(item.day || item.endTime || item.completedAt)}</Text>
                )}
            </View>

            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={isCardMode ? 2 : 1}>{item.exerciseName}</Text>
                <Text style={styles.meta}>ID {item.exerciseId} • {item.category}</Text>
                <Text style={styles.timeMeta}>
                    {formatDate(item.day || item.endTime || item.completedAt)} • {formatTime(item.startTime)} - {formatTime(item.endTime || item.completedAt)}
                </Text>
                <Text style={styles.meta}>{item.duration} min • {item.calories} cal</Text>
            </View>

            {!isCardMode && <Text style={styles.date}>{formatDate(item.day || item.endTime || item.completedAt)}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    row: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    cardItem: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        width: '48%',
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    cardTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    cardDate: {
        fontSize: 10,
        fontWeight: '600',
        color: Colors.textLight,
    },
    leftIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: Colors.statusBg,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 2,
    },
    meta: {
        fontSize: 12,
        color: Colors.textLight,
        fontWeight: '600',
    },
    timeMeta: {
        fontSize: 11,
        color: Colors.textLight,
        fontWeight: '500',
        marginTop: 3,
    },
    date: {
        fontSize: 11,
        color: Colors.textLight,
        fontWeight: '600',
    },
});

export default HistoryCard;
