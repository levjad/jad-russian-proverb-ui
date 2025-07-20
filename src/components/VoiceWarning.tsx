import React from 'react';

interface VoiceWarningProps {
    message: string;
    modalId: string;
}

export const VoiceWarning: React.FC<VoiceWarningProps> = ({ message, modalId }) => {
    const handleHelpClick = () => {
        const modal = document.getElementById(modalId) as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };

    return (
        <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4">
            <div role="alert" className="alert alert-warning text-warning-content max-w-lg w-full shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>{message}</span>
                <div className="tooltip tooltip-bottom" data-tip="Click for help">
                    <button className="btn btn-ghost btn-sm" onClick={handleHelpClick}>
                        Help
                    </button>
                </div>
            </div>
        </div>
    );
};
