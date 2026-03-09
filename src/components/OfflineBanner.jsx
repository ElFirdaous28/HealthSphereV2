import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const OfflineBanner = () => {
    return (
        <View style={styles.banner}>
            <MaterialCommunityIcons name="wifi-off" size={18} color={Colors.white} />
            <Text style={styles.text}>You're offline. Some features may be unavailable.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    banner: {
        flexDirection: 'row',
        backgroundColor: Colors.accent,
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    text: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 8,
    },
});

export default OfflineBanner;
