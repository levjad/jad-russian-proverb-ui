// src/App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import './index.css';
import type {Proverb} from './types/proverb';
import { fetchRandomProverb } from './services/proverbService';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { ProverbCard } from './components/ProverbCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorAlert } from './components/ErrorAlert';
import {VoiceWarning} from "./components/VoiceWarning.tsx";
import {VoiceHelpModal} from "./components/VoiceHelpModal.tsx"; // ErrorAlert kann weiterhin für API-Fehler verwendet werden

const App: React.FC = () => {
    const [proverb, setProverb] = useState<Proverb | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { speak, voiceWarning } = useSpeechSynthesis();

    const getProverb = useCallback(async () => {
        setLoading(true);
        setError(null);
        setProverb(null);
        try {
            const data = await fetchRandomProverb();
            setProverb(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Ein unbekannter Fehler ist aufgetreten.");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getProverb();
    }, [getProverb]);

    return (
        <div className="min-h-screen bg-base-200 p-4 flex flex-col items-center justify-center">
            <div className="flex flex-col container mx-auto h-full gap-6">

                {loading && <LoadingSpinner />}

                {error && <ErrorAlert message={error} />} {/* Dies ist für API-Fehler */}

                {!loading && !error && !proverb && (
                    <p className="text-center text-base-content">
                        Konnte kein Sprichwort laden. Versuche es erneut!
                    </p>
                )}

                {!loading && !error && proverb && (
                    <div className="flex justify-center">
                        <ProverbCard
                            proverb={proverb}
                            onSpeakRussian={() => speak(proverb?.russian_proverb, 'ru-RU')}
                            onSpeakEnglish={() => speak(proverb?.english_translation, 'en-US')}
                        />
                    </div>
                )}

                <div className="flex justify-center mb-8">
                    {!loading && (
                        <button className="btn btn-primary" onClick={getProverb} disabled={loading}>
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M19.4697 4.46967C19.7626 4.17678 20.2374 4.17678 20.5303 4.46967L22.5303 6.46967C22.8232 6.76256 22.8232 7.23744 22.5303 7.53033L20.5303 9.53033C20.2374 9.82322 19.7626 9.82322 19.4697 9.53033C19.1768 9.23744 19.1768 8.76256 19.4697 8.46967L20.1893 7.75H18.3971C17.5531 7.75 16.9733 7.75082 16.517 7.79516C16.077 7.83793 15.8108 7.91703 15.59 8.04205C15.3692 8.16707 15.1644 8.35464 14.9013 8.70996C14.6286 9.07834 14.3295 9.57518 13.8953 10.2989L11.3722 14.5041C10.9613 15.189 10.6254 15.7488 10.3042 16.1826C9.96851 16.636 9.616 16.9989 9.14905 17.2632C8.6821 17.5276 8.18961 17.6432 7.62807 17.6978C7.09086 17.75 6.438 17.75 5.63936 17.75H2C1.58579 17.75 1.25 17.4142 1.25 17C1.25 16.5858 1.58579 16.25 2 16.25H5.60286C6.44685 16.25 7.02675 16.2492 7.48296 16.2048C7.92299 16.1621 8.18919 16.083 8.41 15.9579C8.63081 15.8329 8.8356 15.6454 9.09867 15.29C9.37141 14.9217 9.67046 14.4248 10.1047 13.7011L12.6278 9.49586C13.0387 8.81102 13.3746 8.25119 13.6958 7.8174C14.0315 7.36397 14.384 7.00113 14.851 6.73675C15.3179 6.47237 15.8104 6.35677 16.3719 6.30219C16.9091 6.24998 17.562 6.24999 18.3606 6.25L20.1893 6.25L19.4697 5.53033C19.1768 5.23744 19.1768 4.76256 19.4697 4.46967ZM7.73131 7.79145C7.53519 7.75328 7.31332 7.75 6.66762 7.75H2C1.58579 7.75 1.25 7.41421 1.25 7C1.25 6.58579 1.58579 6.25 2 6.25H6.66762C6.69223 6.25 6.7165 6.24999 6.74045 6.24999C7.28573 6.24986 7.6618 6.24977 8.01789 6.31908C8.81735 6.47469 9.54442 6.88635 10.0892 7.49182C10.3318 7.76151 10.5252 8.08403 10.8057 8.55169C10.818 8.57222 10.8305 8.59303 10.8431 8.61413C11.0562 8.96931 10.9411 9.43001 10.5859 9.64312C10.2307 9.85623 9.76999 9.74106 9.55688 9.38587C9.22467 8.83219 9.10771 8.64362 8.97408 8.49509C8.64722 8.13181 8.21098 7.88481 7.73131 7.79145ZM13.4141 14.3569C13.7693 14.1438 14.23 14.2589 14.4431 14.6141C14.7753 15.1678 14.8923 15.3564 15.0259 15.5049C15.3528 15.8682 15.789 16.1152 16.2687 16.2086C16.4648 16.2467 16.6867 16.25 17.3324 16.25H20.1893L19.4697 15.5303C19.1768 15.2374 19.1768 14.7626 19.4697 14.4697C19.7626 14.1768 20.2374 14.1768 20.5303 14.4697L22.5303 16.4697C22.8232 16.7626 22.8232 17.2374 22.5303 17.5303L20.5303 19.5303C20.2374 19.8232 19.7626 19.8232 19.4697 19.5303C19.1768 19.2374 19.1768 18.7626 19.4697 18.4697L20.1893 17.75H17.3324C17.3078 17.75 17.2835 17.75 17.2595 17.75C16.7143 17.7501 16.3382 17.7502 15.9821 17.6809C15.1826 17.5253 14.4556 17.1137 13.9108 16.5082C13.6682 16.2385 13.4748 15.916 13.1943 15.4483C13.182 15.4278 13.1695 15.407 13.1569 15.3859C12.9438 15.0307 13.0589 14.57 13.4141 14.3569Z" fill="#1C274C"/>
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            <VoiceHelpModal id="voice-help-modal" />

            {voiceWarning && (
                <VoiceWarning
                    message={voiceWarning}
                    modalId="voice-help-modal" // Die ID des Modals, das geöffnet werden soll
                />
            )}
        </div>
    );
};

export default App;
