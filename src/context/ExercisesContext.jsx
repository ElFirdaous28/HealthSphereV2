import React, { createContext, useContext, useReducer, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { fetchExercises, addFavorite, removeFavorite } from '../services/api';
import { cacheExercises, getCachedExercises, cacheFavorites, getCachedFavorites } from '../storage/asyncStorage';

const ExercisesContext = createContext();

const initialState = {
    exercises: [],
    favorites: [],
    loading: false,
    error: null,
    isOnline: true,
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_LOADING': return { ...state, loading: action.payload };
        case 'SET_ERROR': return { ...state, error: action.payload, loading: false };
        case 'SET_EXERCISES': return { ...state, exercises: action.payload, loading: false, error: null };
        case 'SET_FAVORITES': return { ...state, favorites: action.payload };
        case 'SET_ONLINE': return { ...state, isOnline: action.payload };
        default: return state;
    }
}

export const ExercisesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Monitor network
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(({ isConnected }) => {
            dispatch({ type: 'SET_ONLINE', payload: isConnected });
        });
        return unsubscribe;
    }, []);

    const loadExercises = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            if (state.isOnline) {
                const data = await fetchExercises();
                dispatch({ type: 'SET_EXERCISES', payload: data });
                await cacheExercises(data);
            } else {
                const cached = await getCachedExercises();
                dispatch({ type: 'SET_EXERCISES', payload: cached });
            }
        } catch (err) {
            // Fallback to cache on error
            const cached = await getCachedExercises();
            dispatch({ type: 'SET_EXERCISES', payload: cached });
            dispatch({ type: 'SET_ERROR', payload: err.message });
        }
    };

    const toggleFavorite = async (exercise) => {
        const isFav = state.favorites.find((f) => f.id === exercise.id);
        let updated;
        if (isFav) {
            updated = state.favorites.filter((f) => f.id !== exercise.id);
            if (state.isOnline) await removeFavorite(exercise.id);
        } else {
            updated = [...state.favorites, exercise];
            if (state.isOnline) await addFavorite(exercise);
        }
        dispatch({ type: 'SET_FAVORITES', payload: updated });
        await cacheFavorites(updated);
    };

    return (
        <ExercisesContext.Provider value={{ state, loadExercises, toggleFavorite }}>
            {children}
        </ExercisesContext.Provider>
    );
};

export const useExercises = () => useContext(ExercisesContext);