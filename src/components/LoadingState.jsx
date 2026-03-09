import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { Colors } from '../constants/Colors';

const LoadingState = ({ message = 'Loading...' }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    text: {
        marginTop: 12,
        fontSize: 16,
        color: Colors.textLight,
        fontWeight: '600',
    },
});

export default LoadingState;
