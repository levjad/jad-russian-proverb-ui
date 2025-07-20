import type {Proverb} from '../types/proverb';

const API_ENDPOINT = 'https://jad-russian-proverb-api.onrender.com/proverbs/random'; // Deine spezifische API-URL

export const fetchRandomProverb = async (): Promise<Proverb> => {
    try {
        const response = await fetch(API_ENDPOINT);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unbekannter Serverfehler' }));
            throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Fehler beim Abrufen des Sprichworts:", error);
        throw error;
    }
};
