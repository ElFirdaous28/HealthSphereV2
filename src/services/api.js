import axios from 'axios';
import { Platform } from 'react-native';

// Use localhost for web, and the network IP for real devices
// Note: json-server runs on port 3001, not the Expo port (8082)
const devIp = '192.168.1.99';
const BASE_URL = Platform.OS === 'web'
    ? 'http://127.0.0.1:3001'
    : (process.env.API_URL || `http://${devIp}:3001`);

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
