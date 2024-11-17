import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@Wines4You:favorites';

export const saveFavorite = async (wine) => {
    try {
        const favorites = await getFavorites();
        const updatedFavorites = [...favorites, wine];
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
        return true;
    } catch (error) {
        console.error('Error saving favorite:', error);
        return false;
    }
};

export const removeFavorite = async (wineId) => {
    try {
        const favorites = await getFavorites();
        const updatedFavorites = favorites.filter(wine => wine.id !== wineId);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
        return true;
    } catch (error) {
        console.error('Error removing favorite:', error);
        return false;
    }
};

export const getFavorites = async () => {
    try {
        const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
        return favoritesJson ? JSON.parse(favoritesJson) : [];
    } catch (error) {
        console.error('Error getting favorites:', error);
        return [];
    }
};

export const isFavorite = async (wineId) => {
    try {
        const favorites = await getFavorites();
        return favorites.some(wine => wine.id === wineId);
    } catch (error) {
        console.error('Error checking favorite status:', error);
        return false;
    }
};