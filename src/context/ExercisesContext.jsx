import React, { createContext, useContext, useReducer, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { fetchExercises, addFavorite, removeFavorite, getFavorites, getHistory, addHistoryEntry } from '../services/api';
import {
    cacheExercises,
    getCachedExercises,
    cacheFavorites,
    getCachedFavorites,
    cacheHistory,
    getCachedHistory,
} from '../storage/asyncStorage';

const ExercisesContext = createContext();

const initialState = {
    exercises: [],
    favorites: [],
    history: [],
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
        case 'SET_HISTORY': return { ...state, history: action.payload };
        case 'SET_ONLINE': return { ...state, isOnline: action.payload };
        default: return state;
    }
}

export const ExercisesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Monitor network and load initial data
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(({ isConnected }) => {
            dispatch({ type: 'SET_ONLINE', payload: Boolean(isConnected) });
        });

        const initializeData = async () => {
            // Load from cache first for speed
            const [cachedExercises, cachedFavorites, cachedHistory] = await Promise.all([
                getCachedExercises(),
                getCachedFavorites(),
                getCachedHistory(),
            ]);

            if (cachedExercises?.length) dispatch({ type: 'SET_EXERCISES', payload: cachedExercises });
            if (cachedFavorites?.length) dispatch({ type: 'SET_FAVORITES', payload: cachedFavorites });
            if (cachedHistory?.length) dispatch({ type: 'SET_HISTORY', payload: cachedHistory });

            // Then refresh from API
            loadExercises();
            loadFavorites();
            loadHistory();
        };

        initializeData();

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
                dispatch({ type: 'SET_EXERCISES', payload: cached || [] });
            }
        } catch (err) {
            console.error("[ExercisesContext] Error loading exercises:", err.message);
            const cached = await getCachedExercises();
            dispatch({ type: 'SET_EXERCISES', payload: cached || [] });
            dispatch({ type: 'SET_ERROR', payload: err.message });
        }
    };

    const loadFavorites = async () => {
        try {
            if (state.isOnline) {
                const data = await getFavorites();
                dispatch({ type: 'SET_FAVORITES', payload: data });
                await cacheFavorites(data);
            } else {
                const cached = await getCachedFavorites();
                dispatch({ type: 'SET_FAVORITES', payload: cached || [] });
            }
        } catch (err) {
            console.error("[ExercisesContext] Error loading favorites:", err.message);
            const cached = await getCachedFavorites();
            dispatch({ type: 'SET_FAVORITES', payload: cached || [] });
        }
    };

    const loadHistory = async () => {
        try {
            if (state.isOnline) {
                const data = await getHistory();
                const sorted = [...data].sort(
                    (a, b) => new Date(b.endTime || b.completedAt).getTime() - new Date(a.endTime || a.completedAt).getTime()
                );
                dispatch({ type: 'SET_HISTORY', payload: sorted });
                await cacheHistory(sorted);
            } else {
                const cached = await getCachedHistory();
                dispatch({ type: 'SET_HISTORY', payload: cached || [] });
            }
        } catch (err) {
            console.error('[ExercisesContext] Error loading history:', err.message);
            const cached = await getCachedHistory();
            dispatch({ type: 'SET_HISTORY', payload: cached || [] });
        }
    };

    const completeExercise = async (exercise, startedAt) => {
        const endDate = new Date();
        const startDate = startedAt ? new Date(startedAt) : endDate;
        const todayIso = endDate.toISOString().slice(0, 10);
        const entryPayload = {
            exerciseId: String(exercise.id),
            exerciseName: exercise.name,
            category: exercise.category,
            difficulty: exercise.difficulty,
            duration: exercise.duration,
            calories: Number(exercise.duration || 0) * 8,
            startTime: startDate.toISOString(),
            endTime: endDate.toISOString(),
            day: todayIso,
            completedAt: endDate.toISOString(),
        };

        let savedEntry = entryPayload;
        if (state.isOnline) {
            try {
                savedEntry = await addHistoryEntry(entryPayload);
            } catch (err) {
                console.error('[ExercisesContext] Error saving history entry online:', err.message);
            }
        } else {
            savedEntry = { ...entryPayload, id: String(Date.now()) };
        }

        const updatedHistory = [savedEntry, ...state.history].sort(
            (a, b) => new Date(b.endTime || b.completedAt).getTime() - new Date(a.endTime || a.completedAt).getTime()
        );
        dispatch({ type: 'SET_HISTORY', payload: updatedHistory });
        await cacheHistory(updatedHistory);
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
        <ExercisesContext.Provider value={{ state, loadExercises, loadHistory, toggleFavorite, completeExercise }}>
            {children}
        </ExercisesContext.Provider>
    );
};

export const useExercises = () => useContext(ExercisesContext);