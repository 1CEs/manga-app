import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = '@auth_token';
const PROVIDER_URL_KEY = '@provider_url';

export const db = {
    async saveAuthToken(token: string): Promise<void> {
        try {
            await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
        } catch (error) {
            console.error('Error saving auth token:', error);
            throw error;
        }
    },

    async getAuthToken(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        } catch (error) {
            console.error('Error getting auth token:', error);
            return null;
        }
    },

    async clearAll(): Promise<void> {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error('Error clearing storage:', error);
            throw error;
        }
    }
};
