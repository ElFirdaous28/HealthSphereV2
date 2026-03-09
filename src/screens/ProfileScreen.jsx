import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import { Colors } from '../constants/Colors';

const ProfileScreen = ({ navigation }) => {
    const { user, loading, updateUserProfile } = useUser();
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setEditName(user.name);
            setEditEmail(user.email);
        }
    }, [user]);

    const handleUpdate = async () => {
        if (!editName.trim() || !editEmail.trim()) {
            Alert.alert('Error', 'Name and Email are required.');
            return;
        }

        setIsSaving(true);
        try {
            await updateUserProfile({ name: editName, email: editEmail });
            setEditModalVisible(false);
            Alert.alert('Success', 'Profile updated successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile. Please check your connection.');
        } finally {
            setIsSaving(false);
        }
    };

    if (loading || !user) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => navigation?.goBack()}
                >
                    <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.text} />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Profile</Text>

                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => navigation?.navigate('Settings')}
                >
                    <MaterialCommunityIcons name="cog" size={24} color={Colors.text} />
                </TouchableOpacity>
            </View>

            {/* Profile Info */}
            <View style={styles.profileContainer}>
                <View style={styles.avatarWrapper}>
                    <View style={styles.avatarGradientBorder}>
                        <Image
                            source={{ uri: user.avatar }}
                            style={styles.avatar}
                        />
                    </View>
                </View>

                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>

                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setEditModalVisible(true)}
                >
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            {/* Edit Profile Modal */}
            <Modal
                visible={isEditModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setEditModalVisible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalOverlay}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Edit Profile</Text>
                            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                                <MaterialCommunityIcons name="close" size={24} color={Colors.text} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Full Name</Text>
                            <TextInput
                                style={styles.input}
                                value={editName}
                                onChangeText={setEditName}
                                placeholder="Enter your name"
                                placeholderTextColor={Colors.textLight}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email Address</Text>
                            <TextInput
                                style={styles.input}
                                value={editEmail}
                                onChangeText={setEditEmail}
                                placeholder="Enter your email"
                                placeholderTextColor={Colors.textLight}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
                            onPress={handleUpdate}
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <ActivityIndicator color={Colors.white} />
                            ) : (
                                <Text style={styles.saveButtonText}>Save Changes</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 60,
        marginTop: 10,
    },
    headerButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: Colors.text,
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 40,
        paddingHorizontal: 20,
    },
    avatarWrapper: {
        marginBottom: 24,
    },
    avatarGradientBorder: {
        padding: 4,
        borderRadius: 75,
        backgroundColor: Colors.primary, // Using primary for the border
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 4,
        borderColor: Colors.white,
    },
    userName: {
        fontSize: 26,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: 8,
    },
    userEmail: {
        fontSize: 14,
        color: Colors.textLight,
        marginBottom: 32,
    },
    editButton: {
        backgroundColor: Colors.iconBgPrimary,
        paddingVertical: 16,
        paddingHorizontal: 60,
        borderRadius: 16,
        width: '80%',
        alignItems: 'center',
    },
    editButtonText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: '700',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.text,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 8,
    },
    input: {
        backgroundColor: Colors.background,
        height: 56,
        borderRadius: 16,
        paddingHorizontal: 16,
        fontSize: 16,
        color: Colors.text,
        fontWeight: '500',
    },
    saveButton: {
        backgroundColor: Colors.primary,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    saveButtonDisabled: {
        opacity: 0.7,
    },
    saveButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '700',
    },
});

export default ProfileScreen;