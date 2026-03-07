// change this to your machine's IP if testing on a real device
const BASE_URL = 'http://localhost:3001';

export const fetchExercises = async () => {
    const response = await fetch(`${BASE_URL}/exercises`);
    console.log("response data",response);
    if (!response.ok) throw new Error('Failed to fetch exercises');
    return response.json();
};

export const fetchExerciseById = async (id) => {
    const response = await fetch(`${BASE_URL}/exercises/${id}`);
    if (!response.ok) throw new Error('Exercise not found');
    return response.json();
};

export const addFavorite = async (exercise) => {
    const response = await fetch(`${BASE_URL}/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exercise),
    });
    if (!response.ok) throw new Error('Failed to add favorite');
    return response.json();
};

export const getFavorites = async () => {
    const response = await fetch(`${BASE_URL}/favorites`);
    if (!response.ok) throw new Error('Failed to fetch favorites');
    return response.json();
};

export const removeFavorite = async (id) => {
    const response = await fetch(`${BASE_URL}/favorites/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to remove favorite');
};