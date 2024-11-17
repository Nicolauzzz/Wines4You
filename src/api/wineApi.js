import axios from 'axios';

const BASE_URL = 'https://api.sampleapis.com/wines';

export const WineCategories = {
    REDS: 'reds',
    WHITES: 'whites',
    SPARKLING: 'sparkling',
    ROSE: 'rose',
    DESSERT: 'dessert',
    PORT: 'port'
};

export const fetchWines = async (category) => {
    try {
        const response = await axios.get(`${BASE_URL}/${category}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching wines:', error);
        throw error;
    }
};

export const fetchWineById = async (category, id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${category}`);
        return response.data.find(wine => wine.id === id);
    } catch (error) {
        console.error('Error fetching wine details:', error);
        throw error;
    }
};