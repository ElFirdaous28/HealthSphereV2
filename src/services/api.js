import axios from 'axios';
import { Platform } from 'react-native';

// Override with EXPO_PUBLIC_API_URL (or API_URL), otherwise use emulator-safe defaults.
const fallbackBaseUrl = Platform.select({
    web: 'http://127.0.0.1:3001',
    android: 'http://10.0.2.2:3001',
    ios: 'http://localhost:3001',
    default: 'http://127.0.0.1:3001',
});

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || fallbackBaseUrl;

const api = axios.create({
    baseURL: BASE_URL,
});

export const fetchExercises = async () => {
    try {
        const response = await api.get('/exercises');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch exercises');
    }
};

export const fetchExerciseById = async (id) => {
    try {
        const response = await api.get(`/exercises/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Exercise not found');
    }
};

export const addFavorite = async (exercise) => {
    try {
        const response = await api.post('/favorites', exercise);
        return response.data;
    } catch (error) {
        throw new Error('Failed to add favorite');
    }
};

export const getFavorites = async () => {
    try {
        const response = await api.get('/favorites');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch favorites');
    }
};

export const removeFavorite = async (id) => {
    try {
        await api.delete(`/favorites/${id}`);
    } catch (error) {
        throw new Error('Failed to remove favorite');
    }
};

export const getHistory = async () => {
    try {
        const response = await api.get('/history');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch history');
    }
};

export const addHistoryEntry = async (entry) => {
    try {
        const response = await api.post('/history', entry);
        return response.data;
    } catch (error) {
        throw new Error('Failed to add history entry');
    }
};

// User Endpoints
export const getUser = async () => {
    try {
        const response = await api.get('/user');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user');
    }
};

export const updateUser = async (userData) => {
    try {
        const response = await api.put('/user', userData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update user');
    }
};
