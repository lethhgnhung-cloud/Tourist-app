import React, { useState, useEffect } from 'react';
import Button from './Button';
import { TranslationStructure } from '../../types';

interface PinModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (pin: string) => void;
    title?: string;
    attempts: number;
    isLocked: boolean;
    lockoutEnd?: number | null; // Added prop for countdown
    t: TranslationStructure;
    isDark: boolean;
}

const PinModal: React.FC<PinModalProps> = ({ isOpen, onClose, onSubmit, title, attempts, isLocked, lockoutEnd, t, isDark }) => {
    const [pin, setPin] = useState('');
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        let interval: any;
        if (isLocked && lockoutEnd) {
            // Initial calc
            const updateTimer = () => {
                const diff = Math.ceil((lockoutEnd - Date.now()) / 1000);
                if (diff <= 0) {
                    setTimeLeft(0);
                    // Optionally trigger a callback to unlock, but for now UI just shows 0
                } else {
                    setTimeLeft(diff);
                }
            };
            
            updateTimer();
            interval = setInterval(updateTimer, 1000);
        } else {
            setTimeLeft(0);
        }
        return () => clearInterval(interval);
    }, [isLocked, lockoutEnd]);

    if (!isOpen) return null;

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div className="absolute inset-0 z-[100] bg-black/50 flex items-center justify-center p-6 animate-in fade-in">
            <div className={`w-full max-w-sm p-6 rounded-2xl shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <h4 className="text-lg font-bold text-center mb-4 text-[#1A1F36] dark:text-white">{title || t.enterPin}</h4>
                
                {isLocked ? (
                    <div className="text-center mb-6">
                        <p className="text-red-500 font-bold text-sm bg-red-100 p-3 rounded mb-2 border border-red-200">
                            {t.validation.pinLocked}
                        </p>
                        <p className="text-3xl font-mono font-bold text-red-600">
                            {formatTime(timeLeft)}
                        </p>
                    </div>
                ) : (
                    <>
                        {attempts > 0 && <p className="text-red-500 text-xs text-center mb-2 font-bold">Incorrect: {attempts}/5</p>}
                        <input 
                            type="password" 
                            maxLength={4}
                            value={pin}
                            onChange={e => setPin(e.target.value)}
                            className={`w-full p-4 text-center text-2xl tracking-widest border rounded-xl outline-none mb-6 font-bold ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-[#1A1F36]'}`}
                            placeholder="****"
                            autoFocus
                        />
                    </>
                )}
                
                <div className="flex gap-3">
                    <Button onClick={() => { setPin(''); onClose(); }} variant="secondary" fullWidth className="flex-1">{t.step3.cancel}</Button>
                    <Button onClick={() => { onSubmit(pin); setPin(''); }} fullWidth className="flex-1" disabled={isLocked || pin.length !== 4}>OK</Button>
                </div>
            </div>
        </div>
    );
};

export default PinModal;