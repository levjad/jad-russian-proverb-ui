import React, { useEffect, useRef } from 'react';

interface VoiceHelpModalProps {
    id: string;
}

export const VoiceHelpModal: React.FC<VoiceHelpModalProps> = ({ id }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialogElement = dialogRef.current;

        if (dialogElement) {
            const handleBackdropClick = (event: MouseEvent) => {
                if (event.target === dialogElement) {
                    dialogElement.close();
                }
            };

            dialogElement.addEventListener('click', handleBackdropClick);

            return () => {
                dialogElement.removeEventListener('click', handleBackdropClick);
            };
        }
    }, []);

    return (
        <dialog id={id} className="modal modal-bottom sm:modal-middle" ref={dialogRef}>
            <div className="modal-box flex flex-col h-[90vh] sm:h-[90%] max-h-[90vh] sm:max-h-[90%]">

                <div className="flex-grow overflow-y-auto pr-4">
                    <h3 className="font-bold text-lg">Problems with speech output?</h3>
                    <p className="py-4">The quality of speech output depends on the voices installed on your operating system or browser.</p>
                    <p className="mb-2">Here's what you can do:</p>
                    <ul className="list-none list-inside space-y-1 flex flex-col gap-6">
                        <li><strong>For Windows:</strong> <p>Go to "Settings" &gt; "Time & Language" &gt; "Language & Region" (or "Language") and add language packs (e.g., Russian, English). Make sure the language packs include the Text-to-Speech component.</p></li>
                        <li><strong>For macOS:</strong> <p>Go to "System Settings" &gt; "Accessibility" &gt; "Spoken Content" and download voices if necessary.</p></li>
                        <li><strong>For Linux:</strong> <p>Depending on your distribution, install TTS engines like `espeak-ng` or `festival` and corresponding language packs.</p></li>
                        <li><strong>In the browser:</strong> <p>Some browsers (e.g., Chrome) can manage voices themselves. Check your browser's settings in the "Accessibility" or "Language" section. Restarting your browser can sometimes help.</p></li>
                        <li><strong>Switch browser:</strong> <p>Try another modern browser (e.g., Chrome, Edge, Firefox), as voice support and quality can vary.</p></li>
                    </ul>
                    <p className="mt-4">Ensure your system language and browser settings allow the installation of language packs for text-to-speech.</p>
                </div>

                <div className="modal-action mt-auto border-t border-base-300 pt-4">
                    <form method="dialog" className="w-full">
                        <button className="btn btn-primary w-full">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};
