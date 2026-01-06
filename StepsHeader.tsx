import React from 'react';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import { TranslationStructure } from '../../types';

interface StepsHeaderProps {
    step: number;
    onBack: () => void;
    isDark: boolean;
    t: TranslationStructure;
}

const StepsHeader: React.FC<StepsHeaderProps> = ({ step, onBack, isDark, t }) => (
    <div className={`p-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="flex items-center gap-2 mb-6 mt-4">
            <button onClick={onBack} className={`p-2 rounded-full hover:bg-gray-100/10 ${isDark ? 'text-white' : 'text-[#1A1F36]'}`}><ChevronLeft size={28}/></button>
            <h3 className="font-bold text-2xl">{t.regTitle}</h3>
        </div>
        <div className="flex justify-between items-center px-1">
            {t.steps.map((label, idx) => {
                const stepNum = idx + 1;
                const isActive = step >= stepNum;
                return (
                    <div key={idx} className="flex flex-col items-center gap-1 w-1/4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isActive ? 'bg-[#0056D2] text-white' : (isDark ? 'bg-gray-800 text-gray-500' : 'bg-gray-200 text-gray-500')}`}>
                            {isActive ? <CheckCircle2 size={14}/> : stepNum}
                        </div>
                        <span className={`text-[8px] text-center leading-tight ${isActive ? 'text-[#0056D2] font-bold' : 'text-gray-400'}`}>{label}</span>
                    </div>
                );
            })}
        </div>
         <div className="relative h-1 bg-gray-200 mt-2 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-[#0056D2] transition-all duration-500" style={{width: `${(step/4)*100}%`}}></div>
        </div>
    </div>
);

export default StepsHeader;