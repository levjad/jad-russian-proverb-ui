import { useCallback, useState, useEffect } from 'react';

export const useSpeechSynthesis = () => {
    const [voiceWarning, setVoiceWarning] = useState<string | null>(null);

    const speak = useCallback((text: string, lang: string) => {
        if (!('speechSynthesis' in window)) {
            setVoiceWarning("Your browser does not support the Web Speech API.");
            return;
        }

        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.volume = 1;
        utterance.rate = 1;
        utterance.pitch = 1;

        const setVoice = () => {
            const voices = window.speechSynthesis.getVoices();

            const voice = voices.find(v => v.lang === lang) ||
                voices.find(v => v.lang.startsWith(lang.split('-')[0]));

            if (voice) {
                utterance.voice = voice;
                setVoiceWarning(null);
            } else {
                setVoiceWarning(`No suitable voice found for language '${lang}'. Playback quality might be affected.`);
                console.warn(`No suitable voice found for language '${lang}'. Using default voice.`);
            }
        };

        if (window.speechSynthesis.getVoices().length > 0) {
            setVoice();
        } else {
            window.speechSynthesis.onvoiceschanged = setVoice;
        }

        window.speechSynthesis.speak(utterance);
    }, []);

    useEffect(() => {
        const checkVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            const hasRussianVoice = voices.some(v => v.lang === 'ru-RU' || v.lang.startsWith('ru'));
            const hasEnglishVoice = voices.some(v => v.lang === 'en-US' || v.lang.startsWith('en'));

            if (!hasRussianVoice && !hasEnglishVoice) {
                setVoiceWarning("No voices for Russian or English were found in your browser. Please install the language packs in your system or browser settings.");
            } else if (!hasRussianVoice) {
                setVoiceWarning("No suitable voice found for Russian. Playback quality might be affected. Please install the Russian language pack.");
            } else if (!hasEnglishVoice) {
                setVoiceWarning("No suitable voice found for English. Playback quality might be affected. Please install the English language pack.");
            } else {
                setVoiceWarning(null);
            }
        };

        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.onvoiceschanged = checkVoices;
        } else {
            checkVoices();
        }

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    return { speak, voiceWarning };
};
