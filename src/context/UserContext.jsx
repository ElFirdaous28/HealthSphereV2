import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUser, updateUser as updateUserService } from '../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadUser = async () => {
        setLoading(true);
        try {
            const data = await getUser();
            setUser(data);
            setError(null);
        } catch (err) {
            console.error("[UserContext] Error loading user:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const updateUserProfile = async (newData) => {
        try {
            const updated = await updateUserService({ ...user, ...newData });
            setUser(updated);
            return updated;
        } catch (err) {
            console.error("[UserContext] Error updating user:", err.message);
            throw err;
        }
    };

    return (
        <UserContext.Provider value={{ user, loading, error, updateUserProfile, refreshUser: loadUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
