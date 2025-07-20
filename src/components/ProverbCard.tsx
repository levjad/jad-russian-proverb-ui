import React from 'react';
import type {Proverb} from '../types/proverb';

interface ProverbCardProps {
    proverb: Proverb;
    onSpeakRussian: () => void;
    onSpeakEnglish: () => void;
}

export const ProverbCard: React.FC<ProverbCardProps> = ({ proverb, onSpeakRussian, onSpeakEnglish }) => {
    return (
        <div className="flex flex-col gap-6 items-center">

            <div className="group relative flex items-center justify-between pr-10">
                <h2 className="text-5xl font-bold text-base-content leading-tight">
                    {proverb.russian_proverb}
                </h2>

                <button
                    className="absolute -right-4 btn btn-ghost btn-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200"
                    onClick={onSpeakRussian}
                    aria-label="Read russian proverb"
                    title="Read russian proverb"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6C20.5 7.5 21 10 21 12C21 14 20.5 16.5 19 18M16 8.99998C16.5 9.49998 17 10.5 17 12C17 13.5 16.5 14.5 16 15M3 10.5V13.5C3 14.6046 3.5 15.5 5.5 16C7.5 16.5 9 21 12 21C14 21 14 3 12 3C9 3 7.5 7.5 5.5 8C3.5 8.5 3 9.39543 3 10.5Z" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

            <div className="group relative flex items-center justify-between pr-10 mt-2">
                <h3 className="text-xl text-base-content opacity-70 leading-tight">
                    {proverb.english_translation}
                </h3>

                <button
                    className="absolute -right-4 btn btn-ghost btn-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200"
                    onClick={onSpeakEnglish}
                    aria-label="Read english translation"
                    title="Read english translation"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6C20.5 7.5 21 10 21 12C21 14 20.5 16.5 19 18M16 8.99998C16.5 9.49998 17 10.5 17 12C17 13.5 16.5 14.5 16 15M3 10.5V13.5C3 14.6046 3.5 15.5 5.5 16C7.5 16.5 9 21 12 21C14 21 14 3 12 3C9 3 7.5 7.5 5.5 8C3.5 8.5 3 9.39543 3 10.5Z" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

            <div className="card bg-base-100 shadow-xl w-full max-w-lg mx-auto">
                <div className="card-body">
                    <p className="flex gap-6 text-base-content">
                        <span className="font-semibold opacity-50">Meaning</span> {proverb.meaning_explanation}
                    </p>

                    {proverb.category && (
                        <p className="flex gap-6 text-base-content text-sm mt-2">
                            <span className="accent-primary font-semibold opacity-50">Category</span>
                            {proverb.category}
                        </p>
                    )}
                </div>
            </div>
        </div>

    );
};
