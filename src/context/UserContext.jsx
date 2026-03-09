import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: 'Alex Johnson',
        level: 24,
        xp: 1250,
        nextLevelXp: 2000,
        stats: {
            calories: 1240,
            activeMinutes: 45,
            steps: 8432,
            workouts: 12,
        }
    });

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user_profile');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Error loading user data:", error);
            }
        };
        loadUserData();
    }, []);

    const updateUser = async (newData) => {
        try {
            const updatedUser = { ...user, ...newData };
            setUser(updatedUser);
            await AsyncStorage.setItem('user_profile', JSON.stringify(updatedUser));
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
