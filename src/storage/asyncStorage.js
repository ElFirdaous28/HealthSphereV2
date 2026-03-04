import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
    EXERCISES: 'cached_exercises',
    FAVORITES: 'cached_favorites',
};

export const cacheExercises = async (data) => {
    await AsyncStorage.setItem(KEYS.EXERCISES, JSON.stringify(data));
};

export const getCachedExercises = async () => {
    const data = await AsyncStorage.getItem(KEYS.EXERCISES);
    return data ? JSON.parse(data) : [];
};

export const cacheFavorites = async (data) => {
    await AsyncStorage.setItem(KEYS.FAVORITES, JSON.stringify(data));
};

export const getCachedFavorites = async () => {
    const data = await AsyncStorage.getItem(KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
};